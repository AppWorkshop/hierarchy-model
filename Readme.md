Hierarchy Data Model
===

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

* [Hierarchy](#Hierarchy)
    * [new Hierarchy(paramsObj)](#new_Hierarchy_new)
    * [.reparse(hierarchy)](#Hierarchy+reparse)
    * [.findNodeInHierarchy(nodeName)](#Hierarchy+findNodeInHierarchy) ⇒ <code>\*</code>
    * [.findDescendantNodeByName(nodeName, descendantNodeName)](#Hierarchy+findDescendantNodeByName) ⇒ <code>object</code>
    * [.getAllDescendantNodesAsArray(nodeName)](#Hierarchy+getAllDescendantNodesAsArray) ⇒ <code>Array</code>

<a name="new_Hierarchy_new"></a>

### new Hierarchy(paramsObj)
create a new instance of Hierarchy


| Param | Type | Description |
| --- | --- | --- |
| paramsObj | <code>Object</code> | containing a Hierarchy and a loggingConfig (optional) and a TreeModel config (optional): {   hierarchy: {"name":"teacher", "subordinates": [ {"name":"student"} ]},   treeModelConfig: { "childrenPropertyName": "subordinates" },   loggingConfig: { "level": "debug"}} |

<a name="Hierarchy+reparse"></a>

### hierarchy.reparse(hierarchy)
re-create the hierarchy with a new object structure.

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)

| Param | Type |
| --- | --- |
| hierarchy | <code>Object</code> |

<a name="Hierarchy+findNodeInHierarchy"></a>

### hierarchy.findNodeInHierarchy(nodeName) ⇒ <code>\*</code>
Find a node in the hierarchy by name

**Kind**: instance method of [<code>Hierarchy</code>](#Hierarchy)
**Returns**: <code>\*</code> - - the node in the tree that matches

| Param | Type | Description |
| --- | --- | --- |
| nodeName | <code>string</code> | the name of the node to find (i.e. 'name' property value) |

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
