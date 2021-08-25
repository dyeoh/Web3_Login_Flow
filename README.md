# Web 3 Login Flow 🚀️ 

**Requirements**:

* Web3 wallet extension installed (metamask only)
* Node.js
* yarn

**Basic Idea**

FE -> req BE containing public address

FE <- res BE (nonce value + timestamp + something) (store in DB)

FE -> sign response and send back BE
FE <- verify that user is who they are by verifying signature and message to produce public address then check if address match