'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var winston = require('winston');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
var TreeModel = require('tree-model');
var topiary = require('topiary');
var _ = require('underscore');

var Hierarchy = function () {

  /**
   * create a new instance of Hierarchy
   * @param {Object} paramsObj containing a Hierarchy and a loggingConfig (optional) and a TreeModel config (optional):
   * {
   *   hierarchy: {"name":"teacher", "children": [ {"name":"student"} ]},
   *   treeModelConfig: { "childrenPropertyName": "children" },
   *   loggingConfig: { "level": "debug"}
   * }
   */
  function Hierarchy(paramsObj) {
    _classCallCheck(this, Hierarchy);

    // set up config defaults
    var loggingConfig = paramsObj.loggingConfig || {
      "level": "debug",
      "timestamp": true,
      "colorize": true
    };

    var treeModelConfig = paramsObj.treeModelConfig || { "childrenPropertyName": "children" };

    this.logger = new winston.Logger({
      transports: [new winston.transports.Console(loggingConfig)]
    });

    this.childrenPropertyName = treeModelConfig.childrenPropertyName;

    // actual constructor stuff here.

    // get treeModelConfig from config
    // we need a clone of the treeModelConfig (it doesn't work straight from node-config)
    treeModelConfig = JSON.parse(JSON.stringify(treeModelConfig));
    this.treeModel = new TreeModel(treeModelConfig);
    this.root = this.treeModel.parse(paramsObj.hierarchy);
    this.logger.debug(this.getTopiaryAsString());
  }

  /**
   * re-create the hierarchy with a new object structure.
   * @param {Object} hierarchy 
   */


  _createClass(Hierarchy, [{
    key: 'reparse',
    value: function reparse(hierarchy) {
      this.root = this.treeModel.parse(hierarchy);
    }
  }, {
    key: '_findNode',
    value: function _findNode(nodeName) {
      var startNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;

      return startNode.first({ strategy: 'breadth' }, function (node) {
        return node.model.name === nodeName;
      });
    }
  }, {
    key: '_getOrganizationsForUser',
    value: function _getOrganizationsForUser(myUserObj) {
      var myOrganizations = [];
      if (myUserObj) {
        // figure out which organizations we belong to.
        if (myUserObj.profile && (myUserObj.profile.organization || myUserObj.profile.organizations)) {
          // note the plural
          if (myUserObj.profile.organization) {
            // there can be only one.
            myOrganizations = [myUserObj.profile.organization];
          } else {
            // this guy is in multiple organizations.
            myOrganizations = JSON.parse(JSON.stringify(myUserObj.profile.organizations)); // clone organizations
          }
        } else {
          // default to the global group if there is no org info stored on the profile
          myOrganizations = [_GLOBAL_GROUP];
        }
      }
      return myOrganizations;
    }

    /**
     * Find the model for a node in the hierarchy, by name
     * @param {string} nodeName - the name of the node to find (i.e. 'name' property value)
     * @returns {object} - the model of the node in the tree that matches
     */

  }, {
    key: 'findNodeInHierarchy',
    value: function findNodeInHierarchy(nodeName, startNode) {
      var result = this._findNode(nodeName, startNode);
      if (result && result.model) {
        this.logger.debug('findNodeInHierarchy(' + nodeName + ') => returning ' + JSON.stringify(result.model, null, 2));
        return result.model;
      }
      this.logger.debug('findNodeInHierarchy(' + nodeName + ') => returning undefined');
    }

    /**
     * Find the node object for a node in the hierarchy, by name
     * @param {string} nodeName - the name of the node to find (i.e. 'name' property value)
     * @param {object} startNode - the node in the hierarchy to start from
     */

  }, {
    key: 'findNodeObj',
    value: function findNodeObj(nodeName, startNode) {
      return this._findNode(nodeName, startNode);
    }

    /**
     * Return the descendent node of the given nodeName if found.
     * @param {string} nodeName - the name of the node underneath which we should search
     * @param {string} descendantNodeName - the name of the descendant node to find
     * @returns {object} - the node of the descendant, or undefined or false if not found.
     */

  }, {
    key: 'findDescendantNodeByName',
    value: function findDescendantNodeByName(nodeName, descendantNodeName, startNode) {
      // get the node for the node name
      var senior = this._findNode(nodeName, startNode);
      if (!senior) {
        return false;
      }
      var junior = this._findNode(descendantNodeName, senior);
      if (junior) {
        this.logger.debug('findDescendantNodeByName(' + nodeName + ',' + descendantNodeName + ') => returning ' + JSON.stringify(junior.model, null, 2));
        return junior.model;
      } else {
        this.logger.debug('findDescendantNodeByName(' + nodeName + ') => returning undefined');
      }
    }

    /**
     * Get the names of subordinate nodes as an array
     * @param {string} nodeName - the name of the senior node i.e. 'name' property value
     * @returns {Array} - the subordinate node names if any, otherwise undefined.
     */

  }, {
    key: 'getAllDescendantNodesAsArray',
    value: function getAllDescendantNodesAsArray(nodeName, startNode) {
      // find the node for the given node name
      var seniorNode = this._findNode(nodeName, startNode);
      // get all the nodes under this one
      var result = seniorNode.all({ strategy: 'breadth' }, function (node) {
        return node.model.name !== nodeName;
      }).map(function (item) {
        // get the names of each node
        return item.model.name;
      });
      this.logger.debug('getAllDescendantNodesAsArray(' + nodeName + ') => returning ' + JSON.stringify(result, null, 2));
      return result;
    }

    /**
     * get a string suitable for printing, via the topiary library.
     * @param {object} hierarchy - a Hierarchy instance
     * @returns {string} a string representation of the hierarchy
     */

  }, {
    key: 'getTopiaryAsString',
    value: function getTopiaryAsString() {
      var hierarchy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;

      return topiary(hierarchy.model, this.childrenPropertyName);
    }

    /**
     * Process each node in the tree via a callback, halting when your callback returns false.
     * @param {function} callback a function that takes a single parameter, 'node', 
     * which is the value of the node currently being processed. Return false from the callback to halt the traversal.
     */

  }, {
    key: 'walkNodes',
    value: function walkNodes(callback) {
      this.root.walk(callback);
    }

    /**
     * Add a child to a parent.
     * @param {Object} parentNode the node in the hierarchy to which the child should be added
     * @param {Object} childNode a node or tree
     * @returns {Object} the child node.
     */

  }, {
    key: 'addNodeAsChildOfNode',
    value: function addNodeAsChildOfNode(parentNode, childNode) {
      var debug = this.logger.debug;
      debug('parentNode: ' + JSON.stringify(parentNode.model));
      debug('childNode: ' + JSON.stringify(childNode.model));
      return parentNode.addChild(childNode);
    }

    /**
     * Get the array of Nodes representing the path from the root to this Node (inclusive).
     * @param {Object} node 
     * @returns {Object} the array of Nodes representing the path from the root to this Node (inclusive).
     */

  }, {
    key: 'getPathOfNode',
    value: function getPathOfNode(node) {
      return node.getPath();
    }

    /**
     * Get the array of Node names representing the path from the root to this Node (inclusive).
     * @param {Object} node 
     * @returns {Array<String>} the array of Strings representing the path from the root to this Node (inclusive).
     */

  }, {
    key: 'getNamesOfNodePath',
    value: function getNamesOfNodePath(node) {
      return _.map(node.getPath(), function (thisNode) {
        return thisNode.model.name;
      });
    }

    /**
     * Drop the subtree starting at this node. Returns the node itself, which is now a root node.
     * @param {Object} node the node in the hierarchy to drop.
     * @returns {Object} node the node that just got dropped.
     */

  }, {
    key: 'deleteNodeFromHierarchy',
    value: function deleteNodeFromHierarchy(node) {
      return node.drop();
    }

    /**
     * get the underlying TreeModel instance
     * @returns {Object} the underlying TreeModel instance.
     */

  }, {
    key: 'getTreeModel',
    value: function getTreeModel() {
      return this.treeModel;
    }

    /**
     * Create Node (which is itself just a TreeModel)
     * @param {Object} an object which has a name and children
     */

  }, {
    key: 'getNewNode',
    value: function getNewNode(paramsObj) {
      return this.treeModel.parse(paramsObj);
    }
  }]);

  return Hierarchy;
}();

module.exports = Hierarchy;