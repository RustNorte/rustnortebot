module.exports = {
	name: 'user-info',
	description: 'Informacion sobre usuario.',
	cooldown: 5,
	guildOnly: true,
	permissions: 'SEND_MESSAGES',
	execute(message) {
		
		message.delete({timeout: 5000});
		
		const Discord = require('discord.js');
		
		let userm = message.mentions.users.first()
    	if(!userm){
			
		var user = message.author;
      
		const embed = new Discord.MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setAuthor(user.username+'#'+user.discriminator, user.displayAvatarURL())
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Cuenta Creada', user.createdAt.toDateString(), true)
        .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())

        .setColor(0xffcd01)
        
	   message.author.send({ embed });
	   
	}else{
		const embed = new Discord.MessageEmbed()
		.setThumbnail(userm.displayAvatarURL())
		.setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL())
		.addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
		.addField('ID', userm.id, true)
		.addField('Estado', userm.presence.status, true)
		.addField('Cuenta Creada', userm.createdAt.toDateString(), true)
		.addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
		
		.setColor(0x66b3ff)
		
	   message.author.send({ embed });
    }
}};