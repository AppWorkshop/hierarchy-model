Hierarchy Data Model
===

[![Build Status](https://travis-ci.org/AppWorkshop/hierarchy-model.svg?branch=master)](https://travis-ci.org/AppWorkshop/hierarchy-model)

This is a data model for a hierarchy or tree, used by roles-hierarchy and permissions-hierarchy.

Given a definition of a hierarchy :

```js
  let hierarchyObj = {
      "name": "Primate",
      "children": [
        {
          "name": "Hominidae",
          "children": [
            {
              "name": "Homo",
              "children": [
                {
                  "name": "Sapiens",
                  "children": [
                    {
                      "name": "Human"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "name": "Pongidae",
          "children": [
            {
              "name": "Pan",
              "children": [
                {
                  "name": "Troglodytes",
                  "children": [
                    {
                      "name": "Chimpanzee"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    let hierarchy = new Hierarchy(
      {
        "hierarchy": hierarchyObj),
        "loggingConfig": { level: "debug" },
        treeModelConfig: { "childrenPropertyName": "children" },
      }      
    );
```

You can find information about the node's descendants. 

```js
let subordinatesArr = hierarchy.getAllDescendantNodesAsArray('Primate'); // ["Hominidae", "Pongidae", "Homo", "Pan", "Sapiens", "Troglodytes", "Human", "Chimpanzee"]
```

You can retrieve a single node by name

```js
let primate = hierarchy.findNodeInHierarchy("Primate"); // {"name":"Primate","children":[{.....}]}
```

And check if one node is a descendant of another

```js
let subordinate = hierarchy.findDescendantNodeByName('Primate', 'Homo'); // {"name":"Homo","children":[....]}
```

## Tests

Look in the test/test.js file, it gives you a pretty good idea of how to use this library.

To run the tests, simply :

```npm test```

## API

Docs generated with jsdoc2md.

<a name="Hierarchy"></a>

## Hierarchy
**Kind**: global class

<a name="Hierarchy"></a>

## Hierarchy
**Kind**: global class

* [Hierarchy](#Hierarchy)
    * [new Hierarchy(paramsObj)](#new_Hierarchy_new)
    * [.reparse(hierarchy)](#Hierarchy+reparse)
    * [.findNodeInHierarchy(nodeName)](#Hierarchy+findNodeInHierarchy) ⇒ <code>object</code>
    * [.findNodeObj(nodeName, startNode)](#Hierarchy+findNodeObj)
    * [.findDescendantNodeByName(nodeName, descendantNodeName)](#Hierarchy+findDescendantNodeByName) ⇒ <code>object</code>
    * [.getAllDescendantNodesAsArray(nodeName)](#Hierarchy+getAllDescendantNodesAsArray) ⇒ <code>Array</code>
    * [.getTopiaryAsString(hierarchy)](#Hierarchy+getTopiaryAsString) ⇒ <code>string</code>
    * [.walkNodes(callback)](#Hierarchy+walkNodes)
    * [.addNodeAsChildOfNode(parentNode, childNode)](#Hierarchy+addNodeAsChildOfNode) ⇒ <code>Object</code>
    * [.getPathOfNode(node)](#Hierarchy+getPathOfNode) ⇒ <code>Object</code>
    * [.getNamesOfNodePath(node)](#Hierarchy+getNamesOfNodePath) ⇒ <code>Array.&lt;String&gt;</code>
    * [.deleteNodeFromHierarchy(node)](#Hierarchy+deleteNodeFromHierarchy) ⇒ <code>Object</code>
    * [.getTreeModel()](#Hierarchy+getTreeModel) ⇒ <code>Object</code>
    * [.getNewNode(an)](#Hierarchy+getNewNode)

<a name="new_Hierarchy_new"></a>

### new Hierarchy(paramsObj)
create a new instance of Hierarchy


| Param | Type | Description |
| --- | --- | --- |
| paramsObj | <code>Object</code> | containing a Hierarchy and a loggingConfig (optional) and a TreeModel config (optional): {   hierarchy: {"name":"teacher", "children": [ {"name":"student"} ]},   treeModelConfig: { "childrenPropertyName": "children" },   loggingConfig: { "level": "debug"} } |

<a name="Hierarchy+reparse"></a>

### hierarchy.reparse(hierarchy)
re-create the hierarchy with a new object structure.

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)

| Param | Type |
| --- | --- |
| hierarchy | <code>Object</code> |

<a name="Hierarchy+findNodeInHierarchy"></a>

### hierarchy.findNodeInHierarchy(nodeName) ⇒ <code>object</code>
Find the model for a node in the hierarchy, by name

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>object</code> - - the model of the node in the tree that matches

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the node to find (i.e. 'name' property value) |

<a name="Hierarchy+findNodeObj"></a>

### hierarchy.findNodeObj(nodeName, startNode)
Find the node object for a node in the hierarchy, by name

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the node to find (i.e. 'name' property value) |
| startNode | <code>object</code> | the node in the hierarchy to start from |

<a name="Hierarchy+findDescendantNodeByName"></a>

### hierarchy.findDescendantNodeByName(nodeName, descendantNodeName) ⇒ <code>object</code>
Return the descendent node of the given nodeName if found.

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>object</code> - - the node of the descendant, or undefined or false if not found.

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the node underneath which we should search |
| descendantNodeName | <code>string</code> | the name of the descendant node to find |

<a name="Hierarchy+getAllDescendantNodesAsArray"></a>

### hierarchy.getAllDescendantNodesAsArray(nodeName) ⇒ <code>Array</code>
Get the names of subordinate nodes as an array

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>Array</code> - - the subordinate node names if any, otherwise undefined.

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the senior node i.e. 'name' property value |

<a name="Hierarchy+getTopiaryAsString"></a>

### hierarchy.getTopiaryAsString(hierarchy) ⇒ <code>string</code>
get a string suitable for printing, via the topiary library.

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>string</code> - a string representation of the hierarchy

| Param | Type | Description |
| --- | --- | --- |
| hierarchy | <code>object</code> | a Hierarchy instance |

<a name="Hierarchy+walkNodes"></a>

### hierarchy.walkNodes(callback)
Process each node in the tree via a callback, halting when your callback returns false.

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | a function that takes a single parameter, 'node',  which is the value of the node currently being processed. Return false from the callback to halt the traversal. |

<a name="Hierarchy+addNodeAsChildOfNode"></a>

### hierarchy.addNodeAsChildOfNode(parentNode, childNode) ⇒ <code>Object</code>
Add a child to a parent.

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>Object</code> - the child node.

| Param | Type | Description |
| --- | --- | --- |
| parentNode | <code>Object</code> | the node in the hierarchy to which the child should be added |
| childNode | <code>Object</code> | a node or tree |

<a name="Hierarchy+getPathOfNode"></a>

### hierarchy.getPathOfNode(node) ⇒ <code>Object</code>
Get the array of Nodes representing the path from the root to this Node (inclusive).

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>Object</code> - the array of Nodes representing the path from the root to this Node (inclusive).

| Param | Type |
| --- | --- |
| node | <code>Object</code> |

<a name="Hierarchy+getNamesOfNodePath"></a>

### hierarchy.getNamesOfNodePath(node) ⇒ <code>Array.&lt;String&gt;</code>
Get the array of Node names representing the path from the root to this Node (inclusive).

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>Array.&lt;String&gt;</code> - the array of Strings representing the path from the root to this Node (inclusive).

| Param | Type |
| --- | --- |
| node | <code>Object</code> |

<a name="Hierarchy+deleteNodeFromHierarchy"></a>

### hierarchy.deleteNodeFromHierarchy(node) ⇒ <code>Object</code>
Drop the subtree starting at this node. Returns the node itself, which is now a root node.

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>Object</code> - node the node that just got dropped.

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | the node in the hierarchy to drop. |

<a name="Hierarchy+getTreeModel"></a>

### hierarchy.getTreeModel() ⇒ <code>Object</code>
get the underlying TreeModel instance

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>Object</code> - the underlying TreeModel instance.
<a name="Hierarchy+getNewNode"></a>

### hierarchy.getNewNode(an)
Create Node (which is itself just a TreeModel)

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)

| Param | Type | Description |
| --- | --- | --- |
| an | <code>Object</code> | object which has a name and children |
