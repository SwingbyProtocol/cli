const Handler = require('../handler')
const AddressesCommand = require('../commands/info_addresses')
const PeersCommand = require('../commands/info_peers')
const NodeCommand = require('../commands/info_node')

const definitions = [
    new AddressesCommand(),
    new PeersCommand(),
    new NodeCommand()
]

module.exports = new Handler('info', definitions)