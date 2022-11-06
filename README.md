# Creddit: Decentralized, Credentialed Social Media 

This project begins with verification of the users' personhood, and then verification of the users' PolygonID.


## Installation 
- Install node (v16.0.0+)
- 
### To Run the Worldcoin / Polygon ID UI:

```cd ui/ 
npm install yarn
yarn build
yarn install
yarn start
```
In a NEW terminal window:

Click on "I'm a unique person". 
Then, copy the qr code and navigate to the Worldcoin browser simulator:
(https://simulator.worldcoin.org/). Create a temporary identitiy. Skip verification. Click "Enter or paste QR in the upper left portion of the screen, and paste our QR code in the bottom text field.

When the app asks you to "Verify with World ID", click it and your identity will be confirmed within our webapp.

You may need to sign out of the simulator and create a new temporary wallet to ensure the cache is cleared out for demo purposes!




```shell
npx hardhat compile
npx hardhat run --network goerli scripts/deploy.ts

###to Verify the Contract:
npx hardhat --network goerli verify --contract "contracts/<token>.sol:<token>" <deploy addr> "<TOKEN CONTRACT NAME>" "<TOKEN NAME>"
npx hardhat help
npx hardhat test


```
