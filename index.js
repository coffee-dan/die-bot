const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix } = require('./config.json')
// only needed for local testing
require('dotenv').config()

// Announce login
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

function handleDiceRolls(numOfRolls, sizeOfDie) {
	// calculate sum of dice rolls of the specified dice size
	let result = 0
	for (let i = 0; i < numOfRolls; i++) {
		const dieRoll = Math.floor(Math.random() * sizeOfDie + 1)
		result += dieRoll

		console.log(dieRoll)
	}

	return result
}

// listen for messages
client.on('message', message => {
	// check for prefix
	if (message.content.startsWith(prefix)) {
		// remove prefix from string for further processing
		const issuedCommand = message.content.replace(prefix, '')
		console.log(issuedCommand)
		// check for proper command syntax
		// Optional first param: number 1 to 9
		// d or D
		// Required second param: number 1 to 999
		if (message.content.search(/[1-9]?d[1-9][0-9]{0,2}/i) !== -1) {
			message.channel.send(`this??? ${issuedCommand}...`)

			// split into parameters
			const params = issuedCommand.split('d')

			let sum
			if (params[0] === '') {
				// handle no first param case
				message.channel.send(`ok ok, so roll a d${params[1]}`)
				sum = Math.floor(Math.random() * params[1] + 1)
			} else {
				// handle normal case
				message.channel.send(
					`ok ok, so roll ${params[0]} d${params[1]}`
				)
				sum = handleDiceRolls(params[0], params[1])
			}

			if (sum === 0) {
				message.channel.send('you fucking died')
			} else {
				// give use sum total of their roll
				message.channel.send(
					`the sum of the thing you wanted is ${sum}`
				)
			}
		} else {
			// alert user that the syntax was wrong
			message.channel.send(
				"i don't know what you are trying to make me do"
			)
		}
	}
})

client.login(process.env.TOKEN)
