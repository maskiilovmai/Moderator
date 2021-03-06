const profile = require('../../models/Profile');
const moment = require('moment');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'setbirthday',
  aliases: ["set-birthday"],
  rankcommand: true,
  clientPermissions: [],
  group: 'Social',
  description: 'Sets the profile birthday for your profile card.',
  requiresDatabase: true,
  parameters: [ 'Date <DD-MM format>' ],
  examples: [
    'setbirthday 02-12'
  ],
  run: async (client, message, [date] ) => profile.findById(message.author.id, (err, doc) => {

    if (err){
      return message.channel.send(`${em.error} |  [DATABASE_ERR]:\` The database responded with error: ${err.name}`);
    } else if (!doc){
      doc = new profile({ _id: message.author.id });
    };

    if (!date){
      return message.channel.send(`${em.error} | **${message.author.tag}**, Please add the date`);
    } else {
      date = moment(date, 'DD-MM');

      if (!date.isValid()){
        return message.channel.send(`${em.error} |  **${message.author.tag}**, Please add the date in DD-MM format`);
      };

      doc.data.profile.birthday = date.format('Do MMMM');

      return doc.save()
      .then(() => message.channel.send(`${em.success} | **${message.author.tag}**, your birthday has been updated to **${date.format('Do MMMM')}**!`))
      .catch(() => message.channel.send(`${em.error} | **${message.author.tag}**, your birthday update failed!`))
    };
  })
}
