const exec = require('child_process').exec;

module.exports = async (client) => {
    console.log(`Logged into Discord Successfully!`)
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
    client.user.setActivity("tygers heartbeat <3", { type: "LISTENING"})
}