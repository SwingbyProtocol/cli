const {
  CFG_NODE_URL,
  CFG_BITCOIN_PUBKEY,
  CFG_BNB_PUBKEY
} = require('../utils/constants')
const Handler = require('../handler')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('inquirer')

const questions = [
  {
    name: CFG_NODE_URL,
    type: 'input',
    message: 'Please enter your Swingby node URL (Example: http://127.0.0.1:8080):',
    validate: function (value) {
      if (value.length > 4 && value.includes('http')) {
        return true
      } else {
        return 'Please re-enter your Swingby node URL:'
      }
    }
  },
  {
    name: CFG_BITCOIN_PUBKEY,
    type: 'input',
    message: 'Please enter your Bitcoin address:',
    validate: function (value) {
      if (value.length > 15) {
        return true
      } else {
        return 'Please re-enter your Bitcoin address.'
      }
    }
  },
  {
    name: CFG_BNB_PUBKEY,
    type: 'input',
    message: 'Please enter your Binance-chain address:',
    validate: function (value) {
      if (value.length > 15) {
        return true
      } else {
        return 'Please re-enter your Binance-chain address.'
      }
    }
  }
]

const route = (_, { config }) => {
  console.log(
    chalk.blue(
      figlet.textSync('Swingby', { horizontalLayout: 'full' })
    )
  )
  return inquirer.prompt(questions)
    .then((data) => {
      Object.keys(data).forEach((k) => {
        config.set(k, data[k])
      })
    })
}

module.exports = new Handler('init', [], { routeFunc: route })
