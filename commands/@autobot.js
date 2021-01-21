module.exports = {
	name: '@autobot',
	description: 'Ping the autobot',
	execute(message, args) {
		const user = message.author.username;

		// check for arguements
		if (args.length > 0) {
			message.channel.send(
				`...${user} i'm gonna pretend you didn't send that last bit`
			);
		}

		const gifs = [
			'https://media.discordapp.net/attachments/731681232546562089/796983885460013107/tarobonk.gif',
			'https://media.discordapp.net/attachments/731681232546562089/796971333271158784/possumwglassesv2.gif',
			'https://emoji.gg/assets/emoji/8379_Sad_Boi_Hours.gif',
			'https://media.discordapp.net/attachments/753050809935200308/800980342034661386/haaaaa.gif',
		];

		const rando = Math.floor(Math.random() * gifs.length);

		message.channel.send(`<@264658694338248704> ${gifs[rando]}`);
	},
};
