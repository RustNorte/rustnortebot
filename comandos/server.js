module.exports = {
	name: 'server',
	description: 'Informacion servidor Discord.',
	cooldown: 3,
	permissions: 'SEND_MESSAGES',
	execute(message) {
				
		message.delete({timeout: 5000});
		
		const Discord = require('discord.js');
		const client = new Discord.Client();
		var server = message.guild;
  
		const embed = new Discord.MessageEmbed()
	
		.setThumbnail(server.iconURL())	
		.setAuthor(server.name, server.iconURL())	
		.addField('Creado el:', server.joinedAt.toDateString(), true)
		.addField('Region:', server.region, true)				
		.addField('Miembros:', server.memberCount, true)			
		
		.setColor(0xffcd01)
    
message.channel.send(embed).then(m => m.delete({timeout: 15000}));
}};