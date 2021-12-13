const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'reddit',
  aliases: [ 'rdt', 'subreddit', 'redd.it', 'fetchreddit' ],
  cooldown: {
    time: 10000,
    message: 'Accessing Reddit has been rate limited to 1 use per user per 10 seconds'
  },
  group: 'Utility',
  description: 'Fetch a random image from the supplied subreddit',
  parameters: [ 'subreddit' ],
  examples: [
    'reddit churchofmai',
    'rdt seishunbutayarou'
  ],
  run: async (client, message, [subreddit = 'oneTrueMai']) => {

    const { color } = client.config;
    const embed = new MessageEmbed()
    .setColor('YELLOW')
    .setThumbnail('https://i.imgur.com/u6ROwvK.gif')
    .setDescription(`\u200B\nFetching information from ${em.reddit} **[r/${subreddit}](https://reddit.com/r/${subreddit})**. Please Wait.`)
    .setFooter(`Reddit Image | \©️${new Date().getFullYear()} ${client.user.username}`);

    const prompt = await message.channel.send(embed);
    let res = await fetch(`https://reddit.com/r/${subreddit}.json`)
    .then(res => res.json())
    .catch(() => null);

    embed.setColor('RED')
    .setThumbnail(null)
    .setAuthor('Invalid Subreddit','https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription(`That's an invalid/non-existent <:reddit:767062345422864394> subreddit.`);

    if (!res || !res.data.children || !res.data.children.length){
      return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
    };

    res = res.data.children.filter(m => m.data.post_hint === 'image');

    embed.setAuthor('No Image Found', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription(`This ${em.reddit} subreddit does not have any image posts.`);

    if (!res.length){
      return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
    };

    if (!message.channel.nsfw){
      res = res.filter(m => !m.data.over_18)
    };

    embed.setAuthor('Subreddit NSFW', 'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
    .setDescription(' Seems like you entered a nsfw subreddit in a sfw channel. Please move to nsfw channel while using this subreddit.');

    if (!res.length){
      return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
    };

    const post = res[Math.floor(Math.random() * res.length)].data;

    embed.setColor(color)
    .setDescription('')
    .setImage(post.url)
    .setTimestamp(post.created_utc * 1000)
    .setTitle(post.title)
    .setURL(`https://www.reddit.com${post.permalink}`)
    .setAuthor('', null);

    return await prompt.edit(embed).catch(() => null) || message.channel.send(embed);
  }
};
