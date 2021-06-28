module.exports = {
    name: 'nowplaying',
    description: 'Displays the current song playing.',
    category: 'Music',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing!`);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: client.config.embed.colour,
                author: { name: track.title },
                footer: { text: client.config.embed.footer },
                fields: [
                    { name: 'Requested by', value: track.requestedBy.username, inline: false },
                    { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    },
};