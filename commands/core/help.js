module.exports = {
    name: 'help',
    description: 'Gives a introduction to Senko San.',
    category: 'Core',
    aliases: [],
    utilisation: '{prefix}help',

    execute(client, message, args) {
        message.channel.send({
            embed: {
                color: `${client.config.embed.colour}`,
                author: { name: 'Help' },
                footer: { text: client.config.embed.footer },
                timestamp: new Date(),
                description: 'My prefix is `' + `${client.config.discord.prefix}` + '`, to find some of my commands use `!commands`.\nDeveloped by [Tyger](https://www.tyger796.com)\nPublished by [Nord Studios](https://www.nordstudios.org)',
            },
        },
    )},
};