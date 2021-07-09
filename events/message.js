module.exports = async (client, message) => {
    if (message.author.bot) return;

    let prefix; 
    let prefixes = await client.serverDB.fetch(`prefix_${message.guild.id}`);

    if (prefixes == null) {
        prefix = `${client.config.discord.prefix}`
        client.serverDB.set(`prefix_${message.guild.id}`, prefix);
    } else {
        prefix = prefixes;
    }

    if (message.content === `<@${client.config.bot.id}>`) {
        const prefix = client.serverDB.get(`prefix_${message.guild.id}`);
        message.channel.send(`My prefix is: `+ '`' + `${prefix}` + '`');
    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (cmd) cmd.execute(client, message, args);
};