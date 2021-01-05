const { prefix } = require('../config.json');

module.exports = {
	name: 'ayuda',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['comandos', 'help'],
	usage: '[comando]',
	cooldown: 5,
	execute(message, args) {
        message.delete({timeout: 5000});
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('**COMANDOS**:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nPuedes enviar \`${prefix}ayuda [comando]\` para obtener información sobre un comando específico!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
                    message.reply('¡Te envié un DM con todos mis comandos!').
                then(m => m.delete({timeout: 10000}));
				})
				.catch(error => {
					console.error(`No se pudo enviar ayuda DM a ${message.author.tag}.\n`, error);
                    message.reply('¡Parece que no puedo enviarte un mensaje de texto!');
                });
        }
    
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    
        if (!command) {
            return message.reply('¡Eso no es un comando válido!').then(m => m.delete({timeout: 1000}));
        }
    
        data.push(`**Nombre:** ${command.name}`);
    
        if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);
    
        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
    
        message.channel.send(data, { split: true });
        },
    };