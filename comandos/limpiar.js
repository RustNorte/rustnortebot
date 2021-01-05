module.exports = {
	name: 'limpiar',
	description: 'Prune up to 99 messages.',
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {
		
		const amount = parseInt(args[0]) + 1;
		
		if (isNaN(amount)) {
			return message.reply('escribe un numero valido.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('escribe un numero entre 1 y 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};