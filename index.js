const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix } = require('./config.json')
require('dotenv').config()

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
	if (message.content.startsWith(prefix)) {
		const issuedCommand = message.content.replace(prefix, '')
		if (message.content.search(/[1-9]d[1-9][0-9]{0,2}/i) !== -1) {
			message.channel.send(`this??? ${issuedCommand}...`)

			const params = issuedCommand.split('d')

			message.channel.send(`ok ok, so roll ${params[0]} d${params[1]}`)

			let result = 0
			for (let i = 0; i < params[0]; i++) {
				const dieRoll = Math.floor(Math.random() * params[1] + 1)
				result += dieRoll

				console.log(dieRoll)
			}

			message.channel.send(`the sum of the thing you wanted is ${result}`)
		} else {
			message.channel.send(
				"i don't know what you are trying to make me do"
			)
		}
	}
})

client.login(process.env.TOKEN)
