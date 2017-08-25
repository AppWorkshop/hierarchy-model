
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
});


