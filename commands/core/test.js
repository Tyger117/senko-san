module.exports = {
    name: 'test',
    description: 'A test command!',
    category: 'Core',
    aliases: [],
    utilisation: '{prefix}test',

    execute(client) {
        message.channel.send("Bruh momento, it work lets gooooooooooooooooooo~!");
    }
}
