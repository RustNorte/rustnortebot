module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {

		message.delete({timeout: 5000});

		message.channel.send(`Latencia: ${sent.createdTimestamp - message.createdTimestamp}ms`).then(sent => {
				sent.edit(`Latencia: ${sent.createdTimestamp - message.createdTimestamp}ms`);});		
	}
};