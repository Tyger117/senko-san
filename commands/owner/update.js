const exec = require('child_process').exec;

module.exports = {
    name: 'update',
    description: 'Manually update the server.',
    category: 'Owner',
    aliases: ["reload"],
    utilisation: '{prefix}update',

    execute (client, message) {
        exec(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                    message.channel.send('[Server] Already up to date.');
                    console.log('[Github] Already up to date.');
                } else {
                    client.chanels.cache.get(client.config.discord.update.channel).send("New update on GitHub. Pulling... \n\n Logs: \n```" + response + "```" + "\n\n**Restarting bot...**");
                    setTimeout(() => {
                        process.exit();
                    }, 15000);
                }
            }
        });
    }
}