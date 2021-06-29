module.exports = {
    name: 'help',
    description: 'Gives a introduction to Senko San.',
    category: 'Core',
    aliases: ['about'],
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const prefix = client.serverDB.fetch(`prefix_${message.guild.id}`);

        message.channel.send({
            embed: {
                color: `${client.config.embed.colour}`,
                author: { name: 'Help' },
                footer: { text: client.config.embed.footer },
                timestamp: new Date(),
                description: 'My prefix is `' + `${prefix}` + '`, to find some of my commands use `' + `${prefix}` + 'commands`.',
            },
        },
    )},
};