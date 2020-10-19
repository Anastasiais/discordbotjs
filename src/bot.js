require('dotenv').config()

const { Client, WebhookClient } = require('discord.js')
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
})

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
)

const PREFIX = "$"

client.on('ready', ()=> {
  console.log(`${client.user.tag} has logged in`)
})

client.on('message', async (message) => {
    if(message.author.bot) return
    if(message.content.startsWith(PREFIX)) {
       const [CMD_NAME, ...args] = message.content
       .trim()
       .substring(PREFIX.length) 
       .split(/\s+/)
    if(CMD_NAME === 'kick') {
        if(!message.member.hasPermission('KICK_MEMBERS')) 
        return message.reply('You do not have permissoins to use that command')
        if(args.length === 0) return message.reply('Please provide an ID')
       const member = message.guild.members.cashe.get(args[0])
        if(member) {
         member
         .kick()
         .then((member) => message.channel.send(`${member} was kicked`))
         .catch((err) => message.channel.send('I do not have permissions to kick that user'))
        } else {
          message.channel.send('That member is not found') 
        }
    } else if(CMD_NAME === 'ban') {
        if(!message.member.hasPermission('BAN_MEMBERS')) 
        return message.reply('You do not have permissoins to use that command')
        if(args.length === 0) return message.reply('Please provide an ID')
       
        try {
          const user = await message.guild.members.ban(args[0])  
          message.channel.send('User was banned successfully')
        } catch(err) {
            message.channel.send('An error occured. Either I do not have permissions or user was not found')
        }  
    } else if(CMD_NAME === 'announce') {
        const msg = args.join(' ')
        webhookClient.send(msg)
     
    }
       
    }
})

client.on('messageReactionAdd', (reaction, user) => {
    console.log('Hello')
    const { name } = reaction.emoji
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '766612354787704834') {
        switch(name) {
          case '🍎': 
          member.roles.add('766603459054403625')
          break
          case '🍌':
          member.roles.add('766603583918964776')
          break
          case '🍇':
          member.roles.add('766603689456435240')
          break
          case '🍑':
          member.roles.add('766603838194450442')
          break
        }
    }
})

client.on('messageReactionRemove', (reaction, user) => {
    console.log('Hello')
    const { name } = reaction.emoji
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '766612354787704834') {
        switch(name) {
          case '🍎': 
          member.roles.remove('766603459054403625')
          break
          case '🍌':
          member.roles.remove('766603583918964776')
          break
          case '🍇':
          member.roles.remove('766603689456435240')
          break
          case '🍑':
          member.roles.remove('766603838194450442')
          break
        }
    }
})


client.login(process.env.DISCORDJS_BOT_TOKEN)
