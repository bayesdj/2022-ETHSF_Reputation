# Creddit: Decentralized, Credentialed Social Media 

This project begins with verification of the users' personhood, and then verification of the users' PolygonID.

There are then 2 contracts that are deployed into the system: 
1. The CRED ERC20 token contract, the native protocol token of Creddit
2. The ERC721 "Post" contract - which is what creators/publishers mint from when creating a post. Each Post NFT minted is unique, and contains unique IDs and metadata.

## Installation 
- Install node (v16.0.0+)
### To Run the Worldcoin / Polygon ID UI:
In the ui directory, start the frontend React server:
```
cd ui/ 
npm install yarn
yarn build
yarn install
yarn start
```
In a NEW terminal window, launch the PolygonID engine:
```
cd polyID
node Verifier.js
```
In a NEW terminal window, launch Express API server:
```
node app.js
```

Click on "I'm a unique person". 
Then, copy the qr code and navigate to the Worldcoin browser simulator:
(https://simulator.worldcoin.org/). Create a temporary identitiy. Skip verification. Click "Enter or paste QR in the upper left portion of the screen, and paste our QR code in the bottom text field.

When the app asks you to "Verify with World ID", click it and your identity will be confirmed within our webapp.

You may need to sign out of the simulator and create a new temporary wallet to ensure the cache is cleared out for demo purposes!

Contract Addresses:
Credential on Goerli, Optimism Goerli, Mumbai, SKALE: 
0x878a41D7205C61425C8781e226861ddD3d87D12A

Post on Goerli, Optimism Goerli, Mumbai, SKALE:


```shell
npx hardhat compile
npx hardhat run --network goerli scripts/deploy.ts

###to Verify the Contract:
npx hardhat --network goerli verify --contract "contracts/<token>.sol:<token>" <deploy addr> "<TOKEN CONTRACT NAME>" "<TOKEN NAME>"
npx hardhat help
npx hardhat test


```
