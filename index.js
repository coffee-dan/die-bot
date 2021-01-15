const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const cmd = require(`./commands/${file}`);

	client.commands.set(cmd.name, cmd);
}

// Announce login
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// listen for messages
client.on('message', message => {
	// if the message either doesn't start with the prefix or was sent by a bot, exit early
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// modify args by removing first item and holding it in `command`
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
	}
});

client.login(process.env.TOKEN);
