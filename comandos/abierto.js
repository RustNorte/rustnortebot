module.exports = {
	name: 'abierto',
	description: 'Mensaje de servidor abierto.',
	cooldown: 5,
	execute(message) {
        message.delete({timeout: 5000});
        if(!message.member.hasPermission("ADMINISTRATOR")) 
        return message.reply("**¡ERROR!** no tienes permisos para usar el comando.").
        then(m => m.delete({timeout: 15000}));
		message.channel.send('```'+
                        '☢️▁ ▂ ▄ ▅ ▆ ▇ █ SERVIDOR ABIERTO █ ▇ ▆ ▅ ▄ ▂ ▁☢️\n'+ 
                           "\n"+
                        '        ♧ 🎮Eɳƚɾα ყ ραʂα υɳ Ⴆυҽɳ ɾαƚσ.🎮 ♧\n```').
                        then(sent => {							
							sent.react('👍');+
							sent.react('👎');
                        });        											
    }
};