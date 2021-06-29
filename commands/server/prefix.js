module.exports = {
    name: 'prefix',
    description: 'Control your server prefix.',
    category: 'Server',
    aliases: [],
    utilisation: '{prefix}prefix [set/reset] <newPrefix>',

    execute(client, message, args) {
        // Check if member has permission to use this command.
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Invalid permissions! You need the `MANAGE_GUILD` permission to use this command.');

        // Set a new prefix
        if (args[0] === 'set') {
            // If no 2nd param provided, display an error message!
            if (!args[1]) return message.channel.send('You need to provide a new prefix to be set!');

            // Store new prefix as a var
            const newPrefix = args[1];

            // attempt to change prefix in the DB.
            try {
                client.serverDB.set(`prefix_${message.guild.id}`, newPrefix);
            } catch (err) {
                // Catch the error and send it to the channel!
                return message.channel.send(`Oops! An error occured... ` + '`' + `${err}` + '`') && console.log(err);
            }

            // If there are no errors and the prefix was successfully set in the DB, display a success message!
            message.channel.send(`Prefix set to ` + "`" + `${newPrefix}` + "`");
        }


        // Reset the prefix
        else if (args[0] === 'reset') {
            // Get the default prefix from the config and store in var called newPrefix
            const newPrefix = client.config.discord.prefix;
            // Attempt to set the prefix back to default on the DB
            try {
                client.serverDB.set(`prefix_${message.guild.id}`, newPrefix);
            } catch (err) {
                // Catch the error and send it to the channel!
                return message.channel.send(`Oops! An error occured... ` + '`' + `${err}` + '`');
            }

            // If there are no errors and the prefix was successfully set in the DB, display a success message!
            message.channel.send(`${message.guild.name}'s prefix was reset to ` + '`' + `${newPrefix}` + '`');
        } 
        
        else {
            // If there are no params, display current prefix
            const currentPrefix = client.serverDB.get(`prefix_${message.guild.id}`);
            message.channel.send(`Prefix is set to ` + '`' + `${currentPrefix}` + '`');
        }
    }
}