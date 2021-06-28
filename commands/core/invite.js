module.exports = {
    name: 'invite',
    description: 'Sends an invite link to the user.',
    category: 'Infos',
    aliases: [],
    utilisation: '{prefix}invite',

    execute (client, message) {
        message.channel.send({
            embed: {
                color: `${client.config.embed.colour}`,
                author: { name: 'Invite' },
                description: 'Click [here](https://senko.tyger796.com) to invite me to your server!',
                footer: { text: `${client.config.embed.footer}` }
            }
        })
    }
}