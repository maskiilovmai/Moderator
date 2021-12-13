const profile = require('../../models/Profile');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'setcolor',
  aliases: [],
  rankcommand: true,
  clientPermissions: [],
  group: 'Social',
  description: 'Sets the color for your profile card.',
  requiresDatabase: true,
  parameters: [ 'hex code' ],
  examples: [
    'setcolor #e567da'
  ],
  run: async (client, message, [color] ) => profile.findById(message.author.id, (err, doc) => {

    if (err){
      return message.channel.send(`${em.error} | \`[DATABASE_ERR]:\` The database responded with error: ${err.name}`);
    } else if (!doc){
      doc = new profile({ _id: message.author.id });
    }; 
    
   const hex = color.match(/^#[a-f0-9]{6}$/i)||[0];

    if (!hex){
      return message.channel.send(`${em.error} | **${message.author.tag}**, please supply a valid HEX for the color. You may go to <https://www.google.com/search?q=color+picker> to get the desired hex. You may type \`default\` to revert the color to default.`);
    };

    doc.data.profile.color = hex === 'default' ? null : String('#' + hex);

    return doc.save()
    .then(() => message.channel.send(`${em.success} | **${message.author.tag}**, your profile color has been updated to **${hex}**!`))
    .catch(() => message.channel.send(`${em.error} | **${message.author.tag}**, your profile color update failed!`));
  })
}
