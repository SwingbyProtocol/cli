const floats = require('./floats')
const info = require('./info')
const init = require('./init')
const swaps = require('./swaps')

module.exports = {
    // [floats.getName()]: floats,
    [info.getName()]: info,
    [init.getName()]: init,
    [swaps.getName()]: swaps
}