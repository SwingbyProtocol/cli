const Handler = require('../handler')
const { validateNodeUrl } = require('../utils/validate_config')
const QueryCommand = require('../commands/swaps_query')
const CreateCommand = require('../commands/swaps_create')
const FeesCommand = require('../commands/swaps_fees')
const StatsCommand = require('../commands/swaps_stats')

const definitions = [
    new QueryCommand(),
    new CreateCommand(),
    new FeesCommand(),
    new StatsCommand()
]

const validate = (args) => {
    return validateNodeUrl(args)
}

module.exports = new Handler('swaps', definitions, { validateFunc: validate })
