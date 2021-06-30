module.exports = {
    name: 'profile',
    description: 'Manage your profile',
    category: 'Profile',
    aliases: ['rank'],
    utilisation: '{prefix}profile',

    execute(client, message, args) {
        function profileCheck() {
            const profile = client.profileDB.fetch(`profile_${message.member.id}`);

            // Check if profile exists or not
            if (profile === null) {
                // Create profile
                client.profileDB.set(`profile_${message.member.id}`, { nick: 'None', xp: 0, money: 0 });

            }
        }

        switch(args[0]) {
            default: {
                profileCheck();
                const prefix = client.serverDB.fetch(`prefix_${message.guild.id}`);
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
                        footer: { text: `${client.config.embed.footer} | ${prefix}help` }
                    }
                });

                break;
            }

            case 'nick': {
                profileCheck();
                if (!args[1]) return message.channel.send('You need to provide a 2nd argument!');
                if (args[1] === 'set') {
                    if (!args[2]) return message.channel.send('Please provide a nickname to set!');
                    const newNick = args[2];
                    try {
                        client.profileDB.set(`profile_${message.member.id}.nick`, newNick);
                    } catch (err) {
                        return message.channel.send('Oops! An error occured... ' + '`' + `${err}` + '`') && console.log(err);
                    }

                    return message.channel.send(`✅ Successfully set your nickname to **${newNick}**`);
                }

                else if (args[1] === 'reset') {
                    let newNick = 'None';
                    try {
                        client.profileDB.set(`profile_${message.member.id}.nick`, newNick);
                    } catch (err) {
                        return message.channel.send(`Oops! An error occured... ` + '`' + `${err}` + '`') && console.log(err);
                    }

                    message.channel.send(`✅ Successfully reset your nickname!`);
                }

                else {
                    return message.channel.send('Command not found!');
                }

                break;
            }
        }
    }
}