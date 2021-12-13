const { MessageEmbed } = require('discord.js');
const urban = require('relevant-urban');
const badwords = require('bad-words');
const filter = new badwords()
const em = require('../../assets/json/emojis.json');
filter.addWords(...require('../../assets/json/filter.json'));
const text = require('../../util/string');

module.exports = {
  name: 'define',
  aliases: [ 'urban', 'ud' ],
  group: 'Utility',
  description: 'Searches for your query on Urban Dictionary.\nNote: Using this on a nsfw channel disables the word profanity filter feature.',
  parameters: [ 'search query' ],
  examples: [
    'define',
    'urban anime'
  ],
  run: async (client, message, args) => {
   const { color } = client.config;
    if (!args.length) {
      return message.channel.send( new MessageEmbed()
      .setAuthor(`Urban Dictionary`,`https://files.catbox.moe/kkkxw3.png`,`https://www.urbandictionary.com/`)
      .setTitle(`Definition of Best Girl`)
      .setURL('https://ao-buta.com/tv/?innerlink')
      .addField(`Definition`,`No arguing, Alina blacky indeed is the best anime girl!`)
      .addField('Example(s)', '[Alina blacky] is the best girl around. No one could beat her, not even zero two.')
      .addField('\u200b', 'Submitted by Blacky')
      .setColor(color)
      .setFooter(`Define | \©️${new Date().getFullYear()} ${client.user.username}`));
    };

    if (filter.isProfane(args.join(' '))
    && !message.channel.nsfw
    && message.channel.type === 'text'){
      return message.channel.send(`${em.error} | ${message.author}, You cannot look-up for the definition of that term in a sfw channel!\n\nNot a profane word? Contact my developer through the command \`feedback\` and ask to whitelist the word!`);
    };

    const defs = await urban(encodeURI(args.join(' '))).catch(() => null);

    if (!defs){
      return message.channel.send(`${em.error} | ${message.author}, No definition found for **${args.join(' ')}**`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor('#e86222')
      .setURL(defs.urbanURL)
      .setTitle(`Definition of ${defs.word}`)
      .setFooter(`Define | \©️${new Date().getFullYear()} ${client.user.username}`)
      .setAuthor('Urban Dictionary', 'https://files.catbox.moe/kkkxw3.png', 'https://www.urbandictionary.com/')
      .addFields([
        {
          name: 'Definition', value: message.channel.nsfw === true || message.channel.nsfw === undefined
          ? text.truncate(defs.definition)
          : text.truncate(filter.clean(defs.definition), 1000)
        },{
          name: 'Examples', value: message.channel.nsfw === true || message.channel.nsfw === undefined
          ? text.truncate(defs.example || 'N/A')
          : text.truncate(filter.clean(defs.example || 'N/A'), 1000)
        },{
          name: 'Submitted by', value: message.channel.nsfw === true || message.channel.nsfw === undefined
          ? text.truncate(defs.author || 'N/A', 250)
          : text.truncate(filter.clean(defs.author || 'N/A'), 250)
        },{
          name: 'Profane Word?',
          value: ' Contact my developer through the command \`feedback\` and ask to blacklist the word!'
        }
      ])
    );
  }
}
