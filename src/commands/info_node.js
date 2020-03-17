const Command = require('../command')
const sdk = require('swingby-js-sdk')
const {
    CFG_NODE_URL,
} = require('../utils/constants')

class InfoNodeCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'node'
        this.summary = 'Retrieve node info'
    }

    execute(params) {
        const { config } = params
        const client = new sdk.NodeHttpClient({ url: config.get(CFG_NODE_URL) })
        client.getStatus()
            .then((status) => {
                console.log(status)
            })
            .catch(console.error)
    }
}

module.exports = InfoNodeCommand