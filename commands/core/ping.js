module.exports = {
    name: 'ping',
    description: 'The all-mighty command to check if the bot is alive or not.',
    category: 'Core',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        const prefix = client.serverDB.fetch(`prefix_${message.guild.id}`);
        
        message.channel.send('🏓 Pinging...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`🏓 Pong!\nLatency: ${ping}ms\nAPI Latency: ${client.ws.ping}ms`)
        })
    },
};