module.exports = {
	name: 'info',
	description: 'Information about the arguments provided.',
	args: true,
	usage: '<-wipe, juego o estadisticas->',
	guildOnly: true,
	
	execute(message, args) {
		
		message.delete({timeout: 5000});
		
		if (args[0] === 'wipe') {
			return message.author.send('Cada viernes excepto wipe forzado **Facepunch**.')
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('Te envié un DM con la informacion!').
				then(m => m.delete({timeout: 10000}));			
			})
			.catch(error => {
				console.error(`No se pudo enviar ayuda DM a ${message.author.tag}.\n`, error);
				message.reply('¡Parece que no puedo enviarte un mensaje de texto!');
			});
		} else if (args[0] === 'juego') {
			return message.author.send('Aqui tienes informacion sobre **Rust**:\nhttps://rust.facepunch.com/')
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('¡Te envié un DM con la informacion!').
				then(m => m.delete({timeout: 10000}));
			})
			.catch(error => {
				console.error(`No se pudo enviar ayuda DM a ${message.author.tag}.\n`, error);
				message.reply('¡Parece que no puedo enviarte un mensaje de texto!');				
			});
		} else if (args[0] === 'estadisticas') {
			return message.author.send('Aqui hay informacion sobre estadisticas de servidores:\nhttps://www.battlemetrics.com/servers/rust')
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('¡Te envié un DM con la informacion!').
				then(m => m.delete({timeout: 10000}));
			})
			.catch(error => {
				console.error(`No se pudo enviar ayuda DM a ${message.author.tag}.\n`, error);
				message.reply('¡Parece que no puedo enviarte un mensaje de texto!');
			});
		}
		const { commands } = message.client;
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));		
		
		if (!command) {
            return message.reply('¡Eso no es un comando válido!').then(m => m.delete({timeout: 10000}));
        }	
	},
};