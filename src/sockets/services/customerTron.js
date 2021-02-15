const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "2e485b5e6621b4f60c081e7202fa2fcf9e1a2fedf8ee46ffa99a35e97cdf9365";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
const CryptoUtils = require("@tronscan/client/src/utils/crypto");
const TransactionUtils = require("@tronscan/client/src/utils/transactionBuilder");

module.exports = {
    testTron: async (params) => {
        const trc20ContractAddress = "TQQg4EL8o1BSeKJY4MJ8TB8XK7xufxFBvK";//contract address
        try {
            let contract = await tronWeb.contract().at(trc20ContractAddress);
            //Use call to execute a pure or view smart contract method.
            // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
            let result = await contract.name().call();
            console.log('result: ', result);
            return result
        } catch (error) {

            console.error("trigger smart contract error", error)
            return error
        }

        // console.log("aaa");
        // const token = "TLk4SnKJ2svN3a3qi48ALy2cDMhQAgkQte";
        // const fromAddress = CryptoUtils.pkToAddress(privateKey);
        // const toAddress = "TFE7znZeQ4L7LjKFDQZWbFQZibjHZ2p8ni";
        // const amount = 1;

        // let transaction = TransactionUtils.buildTransferTransaction(token, fromAddress, toAddress, amount);

        // let signedTransaction = CryptoUtils.signTransaction(privateKey, transaction);
        // console.log(signedTransaction);
    },
}