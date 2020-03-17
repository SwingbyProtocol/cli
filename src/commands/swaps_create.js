const Command = require('../command')
const sdk = require('swingby-js-sdk')
const {
    CFG_NODE_URL,
    CFG_BITCOIN_PUBKEY,
    CFG_BNB_PUBKEY,
} = require('../utils/constants')

class SwapsCreateCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'create'
        this.summary = 'Create a new swap record'
    }

    execute(params) {
        const { flags, config } = params
        const client = new sdk.NodeHttpClient({ url: config.get(CFG_NODE_URL) })
        let queryParams = Object.assign({}, flags)
        if (flags.toMyBnb) {
            queryParams.addressTo = config.get(CFG_BNB_PUBKEY)
        }
        if (flags.toMyBtc) {
            queryParams.addressTo = config.get(CFG_BITCOIN_PUBKEY)
        }
        queryParams.amount = ''+queryParams.amount
        // --toMyBnb --toMyBtc
        client.swap(queryParams)
            .then((swap) => {
                console.log(swap)
            })
            .catch(console.error)
    }

    getDefinition() {
        return [{
                name: this.name,
                summary: this.summary,
            },
            {
                name: '',
                summary: '{bold --toMyBnb} Send to store BNB address'
            },
            {
                name: '',
                summary: '{bold --toMyBtc} Send to stored BTC address'
            },
            {
                name: '',
                summary: '{bold --addressTo} Address to send the funds to'
            },
            {
                name: '',
                summary: '{bold --amount} Amount of funds to swap'
            },
            {
                name: '',
                summary: '{bold --currencyFrom} Currency from (BTC, ETH...)'
            },
            {
                name: '',
                summary: '{bold --currencyTo} Currency to (BTC, ETH...)'
            },
        ]
    }
}

module.exports = SwapsCreateCommand