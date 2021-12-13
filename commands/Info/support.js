const { MessageEmbed } = require('discord.js');
const text = require('../../util/string');

module.exports = {
  name: 'support',
  aliases: ['botinfo'],
  guildOnly: true,
  group: 'Info',
  description: 'Displays various ways to show support for ALi',
  clientPermissions: [ 'EMBED_LINKS' ],
  parameters: [ ],
  examples: [ 'support' ],
  run: async (client, message) => {

    const { color } = client.config;
    return message.channel.send(
      new MessageEmbed()
      .setColor(color)
      .setTitle(`Support ${client.user.username} and its Development!`)
      .setDescription([
        `${client.user.username} is an open-source, but still a young and adolescent bot, not yet fully matured.`,
        `As the bot progresses, ${client.user.username} is bound to produce undesirable errors`,
        'that interferes with functions, and therefore strains functionality.',
        `It is good to hear that you\'re interested in supporting ${client.user.username}, and there`,
        'are various ways to do so..'
      ].join(' '))
      .addFields([
        {
          name: `Join ${client.user.username}\'s Support Server.`,
          value: [
            `You can join with ${message.client.guilds.cache.get('888311447677960213').memberCount}`,
            `other people and participate in ${client.user.username}\'s support server from development to production,`,
            'test bots, report bugs, or add feature requests, and be updated on what\'s to come. Join [here](https://discord.io/MaskiilovCnD)'
          ].join(' ')
        },{
          name: 'Contribute to Repository.',
          value: [
            `Found some bugs? Do you feel you can fix it yourself? Contribute to ${client.user.username}\'s repository`,
            '[here](https://github.com/brblacky/ALi) by creating an issue or making a reasonable',
            'pull request. While you\'re at it please follow <@491577179495333903>, Venom#9718 and/or add a star to',
            'the repository.'
          ].join(' ')
        },{
          name: 'Collaborate.',
          value: [
            `As of the moment, there are no dedicated collaborators for the production of ${client.user.username}, and maintaining`,
            'the bot has been done solely by <@491577179495333903>, Venom#9718. This is the reason why some fix updates take',
            'longer than anticipated. If you are confident and active enough to help maintain the code, you',
            'may [join](https://discord.gg/gfcv94hDhv) Blacky\'s support server and contact <@491577179495333903>, Venom#9718 from there.'
          ].join(' ')
        },{
          name: `Invite Bot`,
          value: [
            `You can invite [ALi](https://discord.com/api/oauth2/authorize?client_id=841716414053351486&permissions=8&scope=bot) the source bot by <@491577179495333903>, or invite [${client.user.username}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) activated by <@340479704962301952>`
          ].join(' ')
        },
      ]).setFooter(`Support | \©️${new Date().getFullYear()} ${client.user.username}`)
    )
  }
}
