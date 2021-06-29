module.exports = {
    name: 'commands',
    description: 'Displays all the avalible commands.',
    category: 'Core',
    aliases: ['c'],
    utilisation: '{prefix}commands <command name>',

    execute(client, message, args) {
        const prefix = client.serverDB.fetch(`prefix_${message.guild.id}`);

        if (!args[0]) {
            const core = message.client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const mod = message.client.commands.filter(x => x.category == 'Moderation').map((x) => '`' + x.name + '`').join(', ');
            const server = message.client.commands.filter(x => x.category == 'Server').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: client.config.embed.colour,
                    author: { name: 'Commands' },
                    footer: { text: `To find more info on a specific command, please use ${prefix}commands [command]` },
                    fields: [
                        { name: 'Core', value: core },
                        { name: 'Server', value: server }, 
                        { name: 'Moderation', value: infos },
                        { name: 'Music', value: music },
                        { name: 'Filters', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                    ],
                    timestamp: new Date(),
                    description: `To use filters, ${prefix}filter (the filter). Example : ${prefix}filter 8D.`,
                },
            });
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`Command not found!`);

            message.channel.send({
                embed: {
                    color: `${client.config.embed.colour}`,
                    author: { name: 'Commands' },
                    footer: { text: client.config.embed.footer },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Description', value: command.description, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nRequired arguments `[]`, optional arguments `<>`.',
                }
            });
        };
    },
};