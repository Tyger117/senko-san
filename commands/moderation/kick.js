module.exports = {
    name: 'kick',
    description: 'Kick a user! >:D',
    category: 'Moderation',
    aliases: ['yeet'],
    utilisation: '{prefix}kick [@user] <reason>',

    execute(client, message, args) {
        const prefix = client.serverDB.fetch(`prefix_${message.guild.id}`);
        
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Error! You do not have permissions to use this command.');

        let user = message.mentions.members.first();
        if (!user) return message.channel.send('Invalid mention! Please mention a user!');

        let reason = args.slice(1).join(" ");
        if (!reason) reason = 'No reason provided!';

        if (!user.kickable) return message.channel.send("Error! This member isn't kickable.");

        try {
            user.kick(reason);
        } catch (err) {
            message.channel.send(`Oops! An unexpected error occured... ` + '`' + `${err}` + '`');
        }

        message.channel.send(`✅ Successfully kicked **${user.user.tag}**!`);
    }
}