const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');
const port = 3000;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = ''; // Replace this with the actual Merkle root
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { p: Proof, n: Name } = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(Proof, Name, root);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
