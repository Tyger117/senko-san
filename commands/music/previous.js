module.exports = {
    name: 'previous',
    description: 'Go backwards in the queue.',
    category: 'Music',
    aliases: ['back'],
    utilisation: '{prefix}previous',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        message.react('⏮');
        client.player.back(message);
    }
}