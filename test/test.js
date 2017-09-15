
import assert from 'assert';
import config from 'config';
import Hierarchy from '../distribution/hierarchy';

let whichconfig = config || new function(){
  this.getDescendantProp = (obj, desc) => {
    var arr = desc.split(".");
    while(arr.length && (obj = obj[arr.shift()]));
    return obj;
  };

  this.confJSON = require('../test/config/test.json');

  this.get = (key) => {
    return this.getDescendantProp(this.confJSON, key);
  }
}();

let hierarchyOpts = {
  "hierarchy": whichconfig.get("hierarchyConfig.hierarchy"),
  "treeModelConfig": whichconfig.get("hierarchyConfig.treeModelConfig"),
  "loggerCallback": {debug: (msg)=>{console.log(`DEBUG: ${msg}`);}, info: (msg)=>{console.log(`INFO: ${msg}`);}, warn: (msg)=>{console.warn(msg);}, error: (msg, err)=>{console.error(msg, err);}}
};

describe('Hierarchy', function () {
  let hierarchy;

  it('get a new Hierarchy', function (done) {
    hierarchy = new Hierarchy(hierarchyOpts);
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

  it('getPathOfNode', function (done) {
    let humanNode = hierarchy.findNodeObj("Human");
    let arrayOfNodes = Hierarchy.getNamesOfNodePath(humanNode);
    console.log(arrayOfNodes);
    assert.deepEqual(arrayOfNodes, [ 'Animalia', 'Chordate', 'Mammal', 'Primate', 'Hominidae', 'Homo', 'Sapiens','Human' ],
      "Unexpected node path");
    done();
  });

  it('addNodeAsChildOfNode', function (done) {
    let human = hierarchy.findNodeObj("Human");
    let mutantsNode = hierarchy.getNewNode({name: "Mutants", children: [{name: "Alpha Mutants"},{name: "Omega Mutants"}]});
    hierarchy.addNodeAsChildOfNode(human,mutantsNode);
    let alphaMutantsNode = hierarchy.findNodeObj("Alpha Mutants");
    assert.ok(alphaMutantsNode);
    let arrayOfNodes = Hierarchy.getNamesOfNodePath(alphaMutantsNode);
    let indexOfAlpha = arrayOfNodes.indexOf("Alpha Mutants");
    console.log(`indexOfAlpha: ${indexOfAlpha}`);
    assert.equal(indexOfAlpha, 9, "Alpha Mutants wasn't where we expected.");
    done();
  });

  it('deleteNodeFromHierarchy', function (done) {
    let mutantsNode = hierarchy.findNodeObj("Mutants");
    Hierarchy.deleteNodeFromHierarchy(mutantsNode);
    let topiary = hierarchy.getTopiaryAsString();
    let indexOfMutants = topiary.indexOf("Mutants");
    console.log(topiary);
    assert.equal(indexOfMutants, -1, "Was expecting mutants to not be found.");
    done();
  });

});


