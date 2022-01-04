const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("You Can Get Help By Using This Command"),
    async execute(interation) {
        interation.reply("Yes Sir how Can We Help You If You want Help You Can Just Ping <@788745942777462794>")
    }
}