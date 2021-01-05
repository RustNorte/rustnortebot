module.exports = {
	name: 'wipe',
	description: 'Informa sobre nuevo wipe.',
	execute(message) {
		const Discord = require('discord.js');
		const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Nuevo Wipe')
		.setURL('https://discord.js.org/')
		.setAuthor(message.author.username, message.author.displayAvatarURL() ,"https://www.battlemetrics.com/servers/rust")
		.setThumbnail(message.author.displayAvatarURL())
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.addField('Inline field title', 'Some value here', true)
		.setImage(message.author.displayAvatarURL())
		.setTimestamp()
		.setFooter('Some footer text here', message.author.displayAvatarURL());

	message.channel.send(exampleEmbed);


}};