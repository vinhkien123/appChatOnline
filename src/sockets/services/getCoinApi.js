const Coinpayments = require('coinpayments');
const options = {
    key: '69af7ae08eb0fa17f25a05dc3044f7725bedd34f1496a0c8599c2ad1ba19672c',
    secret: 'Cf3aB1c2eF98c57e6217Ced6b79Fd957914287fF89103E94c88BA0272c5534e4',
    autoIpn: true
}
const subWallet = {
    currency: 'BTC',
    ipn_url: 'ttser14@!#',
    label: 'test user001'
  }

const client = new Coinpayments(options);

getProfile = async function (params) {
    await client.getProfile({ pbntag: string })
}

coinpayment = async function (params) {
    await client.getBasicInfo(function (error, result) {
        if(error)
        { throw new Error(error) }
    });
}

getSubWallet = async function (params) {
    await client.getCallbackAddress(subWallet, function (err, response) {
        if(error)
        { throw new Error(error) }
    });
}

module.exports = { coinpayment, getProfile, getSubWallet }