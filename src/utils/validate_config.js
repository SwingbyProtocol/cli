const {
    CFG_NODE_URL,
    CFG_BITCOIN_PUBKEY,
    CFG_BNB_PUBKEY
} = require('./constants')

module.exports.validateNodeUrl = ({ config }) => {
    const url = config.get(CFG_NODE_URL)
    if (!url) {
        console.log(`no node url specified - please run 'swingby init'`)
        return false
    }
    if (!url.includes('http')) {
        console.log(`no protocol define in node url - add 'http' or 'https'`)
        return false
    }
    return true
}