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

## Functions

<dl>
<dt><a href="#reparse">reparse(hierarchy)</a></dt>
<dd><p>re-create the hierarchy with a new object structure.</p>
</dd>
<dt><a href="#findNodeInHierarchy">findNodeInHierarchy(nodeName)</a> ⇒ <code>object</code></dt>
<dd><p>Find the model for a node in the hierarchy, by name</p>
</dd>
<dt><a href="#findNodeObj">findNodeObj(nodeName, [startNode])</a></dt>
<dd><p>Find the node object for a node in the hierarchy, by name</p>
</dd>
<dt><a href="#findDescendantNodeByName">findDescendantNodeByName(nodeName, descendantNodeName, [startNode])</a> ⇒ <code>object</code></dt>
<dd><p>Return the descendent node of the given nodeName if found.</p>
</dd>
<dt><a href="#getAllDescendantNodesAsArray">getAllDescendantNodesAsArray(nodeName, [startNode])</a> ⇒ <code>Array</code></dt>
<dd><p>Get the names of subordinate nodes as an array</p>
</dd>
<dt><a href="#getTopiaryAsString">getTopiaryAsString(hierarchy)</a> ⇒ <code>string</code></dt>
<dd><p>get a string suitable for printing, via the topiary library.</p>
</dd>
<dt><a href="#walkNodes">walkNodes(callback)</a></dt>
<dd><p>Process each node in the tree via a callback, halting when your callback returns false.</p>
</dd>
<dt><a href="#addNodeAsChildOfNode">addNodeAsChildOfNode(parentNode, childNode)</a> ⇒ <code>Object</code></dt>
<dd><p>Add a child to a parent.</p>
</dd>
<dt><a href="#getPathOfNode">getPathOfNode(node)</a> ⇒ <code>Object</code></dt>
<dd><p>Get the array of Nodes representing the path from the root to this Node (inclusive).</p>
</dd>
<dt><a href="#getNamesOfNodePath">getNamesOfNodePath(node)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Get the array of Node names representing the path from the root to this Node (inclusive).</p>
</dd>
<dt><a href="#deleteNodeFromHierarchy">deleteNodeFromHierarchy(node)</a> ⇒ <code>Object</code></dt>
<dd><p>Drop the subtree starting at this node. Returns the node itself, which is now a root node.</p>
</dd>
<dt><a href="#getTreeModel">getTreeModel()</a> ⇒ <code>Object</code></dt>
<dd><p>get the underlying TreeModel instance</p>
</dd>
<dt><a href="#getNewNode">getNewNode(paramsObj)</a></dt>
<dd><p>Create Node (which is itself just a TreeModel)</p>
</dd>
</dl>

<a name="reparse"></a>

## reparse(hierarchy)
re-create the hierarchy with a new object structure.

**Kind**: global function  

| Param | Type |
| --- | --- |
| hierarchy | <code>Object</code> | 

<a name="findNodeInHierarchy"></a>

## findNodeInHierarchy(nodeName) ⇒ <code>object</code>
Find the model for a node in the hierarchy, by name

**Kind**: global function  
**Returns**: <code>object</code> - - the model of the node in the tree that matches  

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the node to find (i.e. 'name' property value) |

<a name="findNodeObj"></a>

## findNodeObj(nodeName, [startNode])
Find the node object for a node in the hierarchy, by name

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the node to find (i.e. 'name' property value) |
| [startNode] | <code>object</code> | the node in the hierarchy to start from |

<a name="findDescendantNodeByName"></a>

## findDescendantNodeByName(nodeName, descendantNodeName, [startNode]) ⇒ <code>object</code>
Return the descendent node of the given nodeName if found.

**Kind**: global function  
**Returns**: <code>object</code> - - the node of the descendant, or undefined or false if not found.  

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the node underneath which we should search |
| descendantNodeName | <code>string</code> | the name of the descendant node to find |
| [startNode] | <code>object</code> | the node in the hierarchy to start from |

<a name="getAllDescendantNodesAsArray"></a>

## getAllDescendantNodesAsArray(nodeName, [startNode]) ⇒ <code>Array</code>
Get the names of subordinate nodes as an array

**Kind**: global function  
**Returns**: <code>Array</code> - - the subordinate node names if any, otherwise undefined.  

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the senior node i.e. 'name' property value |
| [startNode] | <code>object</code> | the node in the hierarchy to start from |

<a name="getTopiaryAsString"></a>

## getTopiaryAsString(hierarchy) ⇒ <code>string</code>
get a string suitable for printing, via the topiary library.

**Kind**: global function  
**Returns**: <code>string</code> - a string representation of the hierarchy  

| Param | Type | Description |
| --- | --- | --- |
| hierarchy | <code>object</code> | a Hierarchy instance |

<a name="walkNodes"></a>

## walkNodes(callback)
Process each node in the tree via a callback, halting when your callback returns false.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | a function that takes a single parameter, 'node',  which is the value of the node currently being processed. Return false from the callback to halt the traversal. |

<a name="addNodeAsChildOfNode"></a>

## addNodeAsChildOfNode(parentNode, childNode) ⇒ <code>Object</code>
Add a child to a parent.

**Kind**: global function  
**Returns**: <code>Object</code> - the child node.  

| Param | Type | Description |
| --- | --- | --- |
| parentNode | <code>Object</code> | the node in the hierarchy to which the child should be added |
| childNode | <code>Object</code> | a node or tree |

<a name="getPathOfNode"></a>

## getPathOfNode(node) ⇒ <code>Object</code>
Get the array of Nodes representing the path from the root to this Node (inclusive).

**Kind**: global function  
**Returns**: <code>Object</code> - the array of Nodes representing the path from the root to this Node (inclusive).  

| Param | Type |
| --- | --- |
| node | <code>Object</code> | 

<a name="getNamesOfNodePath"></a>

## getNamesOfNodePath(node) ⇒ <code>Array.&lt;String&gt;</code>
Get the array of Node names representing the path from the root to this Node (inclusive).

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - the array of Strings representing the path from the root to this Node (inclusive).  

| Param | Type |
| --- | --- |
| node | <code>Object</code> | 

<a name="deleteNodeFromHierarchy"></a>

## deleteNodeFromHierarchy(node) ⇒ <code>Object</code>
Drop the subtree starting at this node. Returns the node itself, which is now a root node.

**Kind**: global function  
**Returns**: <code>Object</code> - node the node that just got dropped.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | the node in the hierarchy to drop. |

<a name="getTreeModel"></a>

## getTreeModel() ⇒ <code>Object</code>
get the underlying TreeModel instance

**Kind**: global function  
**Returns**: <code>Object</code> - the underlying TreeModel instance.  
<a name="getNewNode"></a>

## getNewNode(paramsObj)
Create Node (which is itself just a TreeModel)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| paramsObj | <code>Object</code> | an object which has 'name' and 'children' properties |

