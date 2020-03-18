const Command = require('../command')
const sdk = require('swingby-js-sdk')
const {
    CFG_NODE_URL,
    CFG_BITCOIN_PUBKEY,
    CFG_BNB_PUBKEY,
} = require('../utils/constants')

function printSwaps(swaps) {
    swaps.forEach(element => {
        console.log(element)
    })
}

class SwapsQueryCommand extends Command {
    constructor(options) {
        super(options)
        this.name = 'query'
        this.summary = 'Create a new swap record'
    }

    execute(params) {
        const { flags, config } = params
        const client = new sdk.NodeHttpClient({ url: config.get(CFG_NODE_URL) })
        let queryParams = Object.assign({}, flags)
        // set addresses to config addresses if --mine set
        if (flags.mine) {
            // queryParams.inAddress = config.get(CFG_BNB_PUBKEY)
            queryParams.orInAddress = config.get(CFG_BITCOIN_PUBKEY)
            // queryParams.outAddress = config.get(CFG_BNB_PUBKEY)
            queryParams.orOutAddress = config.get(CFG_BITCOIN_PUBKEY)
            return Promise.all([
                client.querySwaps({ ...queryParams, orInAddress: config.get(CFG_BITCOIN_PUBKEY), orOutAddress: config.get(CFG_BITCOIN_PUBKEY) }),
                client.querySwaps({ ...queryParams, orInAddress: config.get(CFG_BNB_PUBKEY), orOutAddress: config.get(CFG_BNB_PUBKEY) })
            ])
            .then((res) => {
                res[0].items = res[0].items.concat(res[1].items).sort((a, b) => a.timestamp < b.timestamp)
                return res[0]
            })
            .catch(console.error)
        }
        return client.querySwaps(queryParams)
            .then((swaps) => swaps)
            .catch(console.error)
    }

    render(params, data) {
        const { flags } = params
        const { table, raw } = flags

        if (raw) {
            return data.items.forEach(element => {
                console.log(element)
            })
        }
        if (table) {
            // todo print table
        } else {
            return data.items.forEach(element => {
                console.log(`${element.status}: ${element.addressIn} (${element.amountIn} ${element.currencyIn}) -> ${element.addressOut} (${element.amountOut} ${element.currencyOut})`)
            })
        }
    }

    getDefinition() {
        return [
            {
                name: this.name,
                summary: this.summary,
            },
            {
                name: '',
                summary: '{bold --inHash} Hash of the inbound tx'
            },
            {
                name: '',
                summary: '{bold --outHash} Hash of the outbound tx'
            },
            {
                name: '',
                summary: '{bold --toChain} Currency (BTC, BNB ...)'
            },
            {
                name: '',
                summary: '{bold --fromChain} Currency (BTC, BNB ...)'
            },
            {
                name: '',
                summary: '{bold --inAddress} Swap inbound address'
            },
            {
                name: '',
                summary: '{bold --outAddress} Swap outbound address'
            },
            {
                name: '',
                summary: '{bold --status} Status of swap (pending | active | expired)'
            },
            {
                name: '',
                summary: '{bold --pageSize} Max number of items per page'
            },
            {
                name: '',
                summary: '{bold --page} Page number'
            },
            {
                name: '',
                summary: '{bold --sort} If sort = 1 then results are old - new'
            },
        ]
    }
}

module.exports = SwapsQueryCommand