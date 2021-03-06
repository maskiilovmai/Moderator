const profile = require('../../models/Profile');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'register',
  aliases: [ ],
  group: 'Social',
  description: 'Start earning credits. Register to keep track of your earned credits!',
  requiresDatabase: true,
  examples: [
    'register'
  ],
  run: (client, message) => profile.findById(message.author.id, (err, doc) => {

    if (err){
      return message.channel.send(`${em.error} | [DATABASE_ERR]:\` The database responded with error: ${err.name}`);
    } else if (doc && doc.data.economy.wallet !== null){
      return message.channel.send(`${em.error} | **${message.author.tag}**, You already had a **wallet**!\nTo check your balance, type \`${client.prefix}bal\``);
    } else if (!doc){
      doc = new profile({ _id: message.author.id })
    };

    doc.data.economy.wallet =  Math.floor(Math.random() * 250) + 250;

    return doc.save()
    .then(() => message.channel.send(`${em.success} | **${message.author.tag}**, you were successfully registered! You received **${doc.data.economy.wallet}** as a gift!\nTo check your balance, type \`${client.prefix}bal\``))
    .catch((err) => message.channel.send(`${em.success} | [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`));
  })
};
