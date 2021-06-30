module.exports = {
    name: 'profile',
    description: 'Manage your profile',
    category: 'Profile',
    aliases: ['rank'],
    utilisation: '{prefix}profile',

    execute(client, message, args) {
        const prefix = client.serverDB.fetch(`prefix_${message.guild.id}`);
        const profile = client.profileDB.fetch(`profile_${message.member.id}`);

        // Check if profile exists or not
        if (profile === null) {
            // Create profile
            client.profileDB.set(`profile_${message.member.id}`, { nick: 'None', xp: 0, money: 0 });
        }

        const nick = client.profileDB.get(`profile_${message.member.id}.nick`);
        const xp = client.profileDB.get(`profile_${message.member.id}.xp`);
        const money = client.profileDB.get(`profile_${message.member.id}.money`);
        const avatar = message.member.user.displayAvatarURL({ dynamic: true });
        const username = message.member.user.tag;

        message.channel.send({
            embed: {
                author: { name: `${username}'s profile` },
                thumbnail: {
                    url: avatar,
                },
                fields: [
                    { name: 'Nickname', value: '`' + `${nick}` + '`', inline: true },
                    { name: 'XP', value: '`' + `${xp}` + '`', inline: true },
                    { name: 'Money', value: '`' + `${money}` + '`', inline: true },
                ],
            }
        });
    }
}