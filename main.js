require('dotenv').config();
const ethers = require('ethers');


let abi = [{
	"inputs": [{
		"internalType": "bytes",
		"name": "signature",
		"type": "bytes"
	}],
	"name": "mint",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}];

let rpc = `https://developer-access-mainnet.base.org`;
let provider = new ethers.providers.JsonRpcProvider(rpc);
let nftAddress = `0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c`;
let pk = process.env.PK;

let mint = async(pk) => {
    let messages = `all your base are belong to you.`;
    let wallet = new ethers.Wallet(pk, provider);
    let nftContract = new ethers.Contract(nftAddress, abi, wallet);
    try {
        let signature = await wallet.signMessage(messages);
        let receipt = await nftContract.mint(signature);
        await receipt.wait();
        console.log(`Mint success: https://basescan.org/tx/${receipt.hash}`);
    } catch (err) {
        console.error(err);
    };
};

mint(pk);
