module.exports = {
    name: 'commands',
    aliases: ['c'],
    category: 'Core',
    utilisation: '{prefix}commands <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            const core = message.client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
            const infos = message.client.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const mod = message.client.commands.filter(x => x.category == 'Moderation').map((x) => '`' + x.name + '`').join(', ');
            const owner = message.client.commands.filter(x => x.category == 'Owner').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'EAC8C8',
                    author: { name: 'Help' },
                    footer: { text: 'To find more info on a specific command, please use !commands [command]' },
                    fields: [
                        { name: 'Core', value: core },
                        { name: 'Infos', value: infos },
                        { name: 'Music', value: music },
                        { name: 'Moderation', value: mod },
                        { name: 'Owner', value: owner },
                        { name: 'Filters', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                    ],
                    timestamp: new Date(),
                    description: `To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.`,
                },
            });
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} I did not find this command !`);

            message.channel.send({
                embed: {
                    color: 'EAC8C8',
                    author: { name: 'Commands' },
                    footer: { text: client.config.embed.footer },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                }
            });
        };
    },
};