
const assert = require('assert');
const config = require('config');
import Hierarchy from '..';

describe('Hierarchy', function () {
  let hierarchy;

  it('get a new Hierarchy', function (done) {
    hierarchy = new Hierarchy(
      {
        "hierarchy": config.get("hierarchyConfig.hierarchy"),
        "loggingConfig": config.get("hierarchyConfig.loggingConfig"),
        "treeModelConfig": config.get("hierarchyConfig.treeModelConfig")
      }
    );
    assert.ok(hierarchy);
    done();
  });

  it('Find a node in the hierarchy', function (done) {
    let primate = hierarchy.findNodeInHierarchy("Primate");
    assert.equal(primate.name, "Primate", "Expected node name to be Primate");
    done();
  });

  it('findDescendantNodeByName', function (done) {
    let subordinate = hierarchy.findDescendantNodeByName('Primate', 'Homo');
    assert.ok(subordinate, 'Expected to get a subordinate from Primate');
    assert.equal(subordinate.name, 'Homo', 'Expected to get a Homo subordinate from Primate');
    done();
  });


  it('getAllDescendantNodesAsArray', function (done) {
    let subordinatesArray = hierarchy.getAllDescendantNodesAsArray('Primate');
    assert.ok(subordinatesArray, 'Expected to get a subordinatesArray from Primate');
    assert.deepEqual(subordinatesArray, ["Hominidae", "Pongidae", "Homo", "Pan", "Sapiens", "Troglodytes", "Human", "Chimpanzee"], "Expected an array of primates");
    done();
  });

  it('getTopiaryAsString', function (done) {
    let topiary = hierarchy.getTopiaryAsString();
    let indexOfCat = topiary.indexOf("Domestica");
    assert.equal(indexOfCat,288,"Domestica wasn't where we expected.");
    console.log(topiary);
    done();
  });  

  it('addNodeAsChildOfNode', function (done) {
    let human = hierarchy.findNodeObj("Human");
    let mutantsNode = hierarchy.getNewNode({name: "Mutants", children: [{name: "Alpha Mutants"},{name: "Omega Mutants"}]});
    hierarchy.addNodeAsChildOfNode(human,mutantsNode);
    let topiary = hierarchy.getTopiaryAsString();
    let indexOfAlpha = topiary.indexOf("Alpha Mutants");
    console.log(topiary);
    assert.equal(indexOfAlpha, 178, "Alpha Mutants wasn't where we expected.")
    done();
  });  

  it('deleteNodeFromHierarchy', function (done) {
    let mutantsNode = hierarchy.findNodeObj("Mutants");
    hierarchy.deleteNodeFromHierarchy(mutantsNode);
    let topiary = hierarchy.getTopiaryAsString();
    let indexOfMutants = topiary.indexOf("Mutants");
    console.log(topiary);
    assert.equal(indexOfMutants, -1, "Was expecting mutants to not be found.");
    done();
  });

  it('getPathOfNode', function (done) {
    let humanNode = hierarchy.findNodeObj("Human");
    let arrayOfNodes = hierarchy.getNamesOfNodePath(humanNode);
    console.log(arrayOfNodes);
    assert.deepEqual(arrayOfNodes, [ 'Animalia', 'Chordate', 'Mammal', 'Primate', 'Hominidae', 'Homo', 'Sapiens','Human' ], 
      "Unexpected node path");
    done();
  });  

});


