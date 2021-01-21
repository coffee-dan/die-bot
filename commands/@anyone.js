module.exports = {
	name: '@anyone',
	description: 'Ping a random soul',
	execute(message, args) {
		const user = message.author.username;

		// check for arguements
		if (args.length > 0) {
			message.channel.send(
				`...${user} i'm gonna pretend you didn't send that last bit`
			);
		}

		let memberList;
		let rando;

		// First we use guild.members.fetch to make sure all members are cached
		message.guild.members
			.fetch()
			.then(fetchedMembers => {
				memberList = fetchedMembers.array();
			})
			.then(() => {
				// get random number to grab random name from the member list
				rando = Math.floor(Math.random() * memberList.length);
				// mercilessly ping them
				message.channel.send(
					`get @'d <@!${memberList[rando].user.id}> >:)`
				);
			})
			.catch(error => message.channel.send(error));
	},
};
