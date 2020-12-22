module.exports = {
	name: 'roll',
	description: 'Roll some dice',
	execute(message, args) {
		const user = message.author.username

		// syntax check
		if (args[0].search(/[1-9]?d[1-9][0-9]{0,2}/i) === -1) {
			message.channel.send(
				`no!! ${user}, it should be \`[num of rolls]d[size of dice]\``
			)
			throw 'Syntax Error :: Roll :: [1-9]?d[1-999]'
		}

		// check for extra arguements
		if (args.length > 1) {
			message.channel.send(
				"...i'm gonna pretend you didn't send that last bit"
			)
		}

		// split into parameters
		const [numOfDice, diceSize] = args[0].split('d')

		let sum
		if (numOfDice === '') {
			// handle no first param case
			message.channel.send(`ok ok, so roll a d${diceSize}`)
			sum = Math.floor(Math.random() * diceSize + 1)
		} else {
			// handle normal case
			message.channel.send(`ok ok, so roll ${numOfDice} d${diceSize}s`)
			sum = handleDiceRolls(numOfDice, diceSize)
		}

		if (sum === 0) {
			message.channel.send(`${user} fucking died`)
		} else {
			// give use sum total of their roll
			message.channel.send(
				`the sum of the thing ${user} wanted is ${sum}`
			)
		}
	},
}

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
