function helpFn() {
    console.log(`
        List of all commands:
        a) node main.js tree 'dirpath'
        b) node main.js organize 'dirpath'
        c) node main.js help
    `);
}

module.exports = {
    helpKey: helpFn
}