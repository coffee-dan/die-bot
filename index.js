const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

client.once('ready', () => {
	console.log('Logged in as ${client.user.tag}!')
})

client.login(process.env.TOKEN)
