#!/usr/bin/env node

const parseArgs = require('minimist')
const constants = require('./src/utils/constants')
// load config
const packageJson = require('./package.json')
const Configstore = require('configstore')
const config = new Configstore(packageJson.name)
if (!(!!config.get(constants.CFG_NODE_URL))) {
    return console.log(`Please run swingby init`)
}
// load handlers
const handlers = require('./src/handlers')

let input = parseArgs(process.argv.slice(2))
if (!input || input.length <= 0) {
    console.log(`No flags specified - try running 'swingby help'`)
    return process.exit(constants.COMMAND_NOT_FOUND)
}
args = input['_']
flags = Object.assign({}, input)
delete flags['_']
const nextArg = args[0]
// find handler based on arg
let handler = handlers[nextArg]
if (!handler) {
    // show help if there is no handler but help is specified
    if (nextArg === 'help' || nextArg === '--help') {
        Object.values(handlers).forEach((handler) => handler.help())
        return process.exit(0)
    }
    console.log(`Unrecognized command ${nextArg}`)
    return process.exit(constants.COMMAND_NOT_FOUND)
}
// validate handler
const params = { config, args, relativeArgs: args.slice(1), flags }
if (!handler.validate(params)) {
    return process.exit(constants.GENERAL_ERROR)
}
// route to command function
handler.route(params)