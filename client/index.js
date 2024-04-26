const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:3000';

async function main() {
  const merkleTree = new MerkleTree(niceList);
  const Name = Math.random() > 0.5 ? niceList[Math.floor(Math.random() * niceList.length)] : 'Unknown Name';
  const index = niceList.findIndex(n => n === Name);
  const Proof = merkleTree.getProof(index);

  await axios.post(`${serverUrl}/gift`, { n: Name, p: Proof })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}

main();
