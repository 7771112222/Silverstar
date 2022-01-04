require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require ("discord.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log("Silver Is Online");

    const CLIENT_ID = client.user.id;

    const rest = new REST({
        version: "9"
    }).setToken(process.env.TOKEN);

    (async () => {
        try {
            if (process.env.ENV === "production") {
                await rest.put(Routes.applicationCommand(CLIENT_ID), {
                    body: commands
                });
                console.log("Successfully registered commands globally.");
            } else {
                await rest.put(Routes.applicationCommand(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Successfully registered commands locally.");
            }
        } catch (err) {
             if (err) console.error(err);
        }
    })();
});

client.login(process.env.TOKEN);