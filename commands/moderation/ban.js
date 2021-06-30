module.exports = {
    name: 'ban',
    description: 'Ban a user! >:D',
    category: 'Moderation',
    aliases: [],
    utilisation: '{prefix}ban [@user] <reason>',

    execute(client, message, args) {
        const prefix = client.serverDB.fetch(`prefix_${message.guild.id}`);
        
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Error! You do not have permissions to use this command.');

        let user = message.mentions.members.first();
        if (!user) return message.channel.send('Invalid mention! Please mention a user!');

        let reason = args.slice(1).join(" ");
        if (!reason) reason = 'No reason provided!';

        if (!user.bannable) return message.channel.send("Error! This member isn't bannable.");

        try {
            user.ban(reason);
        } catch (err) {
            message.channel.send(`Oops! An unexpected error occured... ` + '`' + `${err}` + '`');
        }

        message.channel.send(`✅ Successfully banned **${user.user.tag}**!`);
    }
}