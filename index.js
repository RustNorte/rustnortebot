const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.adcommands = new Discord.Collection();

const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('ready', () => {
	console.log(`Estoy listo!, 
	conectado en ${client.guilds.cache.size} servidores y  ${client.users.cache.size} usuarios.`);
	client.user.setPresence( {status: "online",activity: {name: `¡ayuda | Estoy en ${client.guilds.cache.size} servidores.`,type: "LISTENING"}} );

});

client.on("guildMemberAdd", async member => {
	
	member.roles.add("793072327486472192")

	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	if (!channel) return;
	const Canvas = require("canvas")
	const Discord = require("discord.js")

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('././imagenes/Bienvenida.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on("guildMemberRemove", member => {
    let canal = client.channels.cache.get('784790013707419658'); 
    canal.send(`${member.user}, a dejado el servidor.`);
   
});

client.on("messageDelete", message => {
    let canal = client.channels.cache.get('784790013707419658'); 
    canal.send(`**${message.author.username}** elimino un mensaje con el contenido: ${message}`);
   
});

client.on("messageReactionAdd", async (reaction, user) => {

	const emoji = "✅";
	
	const channel = client.channels.cache.get("784421282543960106") // Aca pondremos la ID del canal en donde estara el mensaje a reaccionar
	const m = await channel.messages.fetch("(793873485717045258)"); // Y este sera el mensaje a donde se reaccionara para verificarse.
	
	// Procedemos a verificar
	
	if (reaction.emoji.name == emoji && reaction.message.id == m.id) {
	
	// Si se cumple procederemos a dar el rol
	
	const member = await reaction.message.guild.members.fetch(user.id)
	member.roles.add("794161782305718272");
	
	}
	
	});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on('message', message => {
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;
		
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('No puedes ejecutar el comando dentro de un DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.author.send('**¡ERROR!** no tienes permisos para eso');}
	}
		
	if (command.args && !args.length) {
		let reply = `No proporcionaste ningún argumento, ${message.author}!`;
		if (command.usage) {
			reply += `\n**Prueba:**\n\`${prefix}${command.name} + ${command.usage}\``;
		}
			return message.channel.send(reply).
			then(m => m.delete({timeout: 20000}));		
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`porfavor espera ${timeLeft.toFixed(1)} antes de volver a usar el \`${command.name}\` comando.`).
		then(m => m.delete({timeout: 20000}));}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('¡Hubo un error al intentar ejecutar ese comando!');
		}		
});

client.login(token);