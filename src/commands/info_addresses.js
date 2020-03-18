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
        return client.getTssAddresses()
            .catch(console.error)
    }

    render(params, data) {
        const { flags } = params
        const { table, raw } = flags
        if (raw) {
            return data.forEach(element => {
                console.log(element)
            })
        }
        return data.forEach(element => {
            console.log(`${element.currency}: ${element.address}`)
        })
    }
}

module.exports = InfoAddressesCommand