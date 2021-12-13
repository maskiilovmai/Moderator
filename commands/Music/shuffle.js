const { MessageEmbed } = require("discord.js");
module.exports = {
  name: 'shuffle',
  aliases: [""],
  guildOnly: true,
  permissions: [],
  clientPermissions: [],
  inVoiceChannel: true,
  sameVoiceChannel: true,
  group: 'Music',
  description: 'Shuffle queue',
  examples: [''],
  parameters: [''],
  run: async (client, message, args) => {
    
    const { color } = client.config;
    const queue = message.client.distube.getQueue(message);

        if(!queue) {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`There is no music playing.`);
            return message.channel.send(embed);
        }

        message.client.distube.shuffle(message);

        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`**Shuffle** the queue.`)
            .setFooter(`Music | \©️${new Date().getFullYear()} ${client.user.username}`);
        message.channel.send(embed);
    }
}