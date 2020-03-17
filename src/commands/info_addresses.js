const Command = require('../command')
const sdk = require('swingby-js-sdk')
const {
    CFG_NODE_URL,
} = require('../utils/constants')

class InfoAddressesCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'addresses'
        this.summary = 'Retrieve network TSS addresses'
    }

    execute(params) {
        const { config } = params
        const client = new sdk.NodeHttpClient({ url: config.get(CFG_NODE_URL) })
        client.getTssAddresses()
            .then((addresses) => {
                addresses.forEach(element => {
                    console.log(element)
                })
            })
            .catch(console.error)
    }
}

module.exports = InfoAddressesCommand