const Command = require('../command')
const sdk = require('swingby-js-sdk')
const {
    CFG_NODE_URL,
} = require('../utils/constants')

class InfoPeersCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'peers'
        this.summary = 'Retrieve connected peers'
    }

    execute(params) {
        const { config } = params
        const client = new sdk.NodeHttpClient({ url: config.get(CFG_NODE_URL) })
        client.getPeers()
            .then((peers) => {
                peers.forEach(element => {
                    console.log(element)
                })
            })
            .catch(console.error)
    }
}

module.exports = InfoPeersCommand