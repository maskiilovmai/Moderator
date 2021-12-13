const { MessageEmbed } = require('discord.js');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'permissionsfor',
  aliases: [ 'permsfor', 'prams' ],
  group: 'Utility',
  guildOnly: true,
  description: 'List the server permissions of mentioned user or provided ID',
  parameters: [ 'User ID/Mention' ],
  examples: [
    'permissionsfor @user',
    'permsfor 728394857675849399'
  ],
  run: async(client, message, [member = '']) => {

    if (!member.match(/\d{17,19}/)){
      member = message.author.id;
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\${em.error} | User not found.`);
    };
    const { color } = client.config;
    const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();

    return message.channel.send(
      new MessageEmbed()
      .setColor(member.displayColor || color)
      .setTitle(`${member.displayName}'s Permissions`)
      .setFooter(`Permissions | \©️${new Date().getFullYear()} ${client.user.username}`)
      .setDescription([
        '\\♨️ - This Server',
        '\\#️⃣ - The Current Channel',
        '```properties',
        '♨️ | #️⃣ | Permission',
        '========================================',
        `${Object.keys(sp).map(perm => [
          sp[perm] ? '✔️ |' : '❌ |',
          cp[perm] ? '✔️ |' : '❌ |',
          perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')
        ].join(' ')).join('\n')}`,
        '```'
      ].join('\n'))
    );
  }
};
