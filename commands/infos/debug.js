module.exports = {
    name: 'debug',
    description: '',
    category: 'Infos',
    aliases: [],
    utilisation: '{prefix}debug',

    execute(client, message) {
        message.channel.send({
            embed: {
                color: `${client.config.embed.colour}`,
                author: { name: 'Debug' },
                footer: { text: `${client.config.embed.colour}` },
                fields: [
                    { name: 'Voice connections', value: `${client.voice.connections.size}`, inline: true },
                ]
            }
        });
    },
};