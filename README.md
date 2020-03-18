# Swingby CLI tool

A simple toolset build for use in the command line for interacting with the Swingby network

## Features:

* Official implementation
* Save user settings
* Query data from network
* Tustless swaps between ECDSA chains

## Instillation

```bash
npm install -g https://github.com/SwingbyProtocol/cli
swingby init
swingby help
```

## Quickstart

Query the last 20 completed swaps and render as raw json:

```bash
swingby swaps query --pageSize=20 --status COMPLETED --raw
```

Create a new swap to my saved bnb address

```bash
swingby swaps create --currencyFrom BTC --currencyTo BTC.B --toMyBnb --amount 0.1
```

Check the peers on the network

```
swingby info peers
```

For more commnads, check out the `swingby help` command.

## Useful links

* [Website](https://swingby.network)
* [Swingby explorer](https://bridge-testnet.swingby.network/explorer)
* [Swingby network dashboard](https://testnet-node.swingby.network/)

