const helpers = require("../helpers")
const toolkit = require("../../../dist")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// CLI SUBMODULE CONSTANTS ===========================================================================================

module.exports = {
    flags: {
        limit: { 
            hint: "Limit output records (default: 100)", 
            param: ":number", 
        },
        provider: {
            hint: "Public Wit/Oracle JSON-RPC provider, other than default",
            param: ":http-url",
        },
    },
    router: {
        balances: {
            hint: "List addresses with available Wits to spend.",
            options: {},
        },
        blocks: {
            hint: "List block hashes within given epoch range.",
            options: {
                from: { hint: "Range start epoch (default: -1)", param: ":epoch | :relative", }, 
            },
        },
        constants: {
            hint: "Show network consensus constants.",
        },
        mempool: {
            hint: "Dump current transactions mempool.",
            options: {},
        },
        priorities: {
            hint: "Estimate transacting priorities based on recent network activity.",
            params: "vtt | drt",
            options: {
                weight: { hint: "Estimate fees instead for given transaction weight", },
            },
        },
        protocol: {
            hint: "Show network protocol information.",
        },
        ranks: {
            hint: "Rank validators by their current staking power for given capability.",
            params: "mining | witnessing",
        },
        stakes: {
            hint: "List active stake entries at present time.",
        },
        status: {
            hint: "Report RPC provider's network sync status.",
        },
        superblock: {
            hint: "Show superblock metadata for given epoch.",
            params: "EPOCH",
        },
        wips: {
            hint: "Show signaled and currently activated WIPs on the network.",
        },
    },
    subcommands: {
        balances, blocks, constants, protocol, wips, status, mempool, priorities,
    },
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// CLI SUBMODULE COMMANDS ============================================================================================

async function balances(flags) {
    var provider = new toolkit.Provider(flags?.provider)
    var records = Object
        .entries(await provider.balances())
        .map(([ address, balance ]) => [ address, helpers.commas(Math.floor(balance / 10 ** 9))])
    if (parseInt(flags?.limit)) {
        records = records.slice(0, parseInt(flags.limit))
    }
    console.table(Object.fromEntries(records))
}

async function blocks(flags, options) {
    var provider = new toolkit.Provider(flags?.provider)
    var records = Object.entries(await provider.blocks(options?.from || -32, flags?.limit || 32))
    if (parseInt(flags?.limit)) {
        records = records.slice(0, parseInt(flags.limit))
    }
    console.table(Object.fromEntries(records))
}

async function constants(flags) {
    var provider = new toolkit.Provider(flags?.provider)
    console.info(await provider.constants())
}

async function protocol(flags) {
    var provider = new toolkit.Provider(flags?.provider)
    console.info(JSON.stringify(await provider.protocol(), null, 2))
}

async function wips(flags) {
    var provider = new toolkit.Provider(flags?.provider)
    console.info(await provider.wips())
}

async function status(flags) {
    var provider = new toolkit.Provider(flags?.provider)
    console.info(await provider.syncStatus())
}

async function mempool(flags) {
    var provider = new toolkit.Provider(flags?.provider)
    console.info(await provider.mempool())
}

async function priorities(flags) {
    var provider = new toolkit.Provider(flags?.provider)
    console.info(await provider.priorities())
}


