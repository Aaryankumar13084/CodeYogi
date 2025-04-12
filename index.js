
const { Telegraf } = require('telegraf')
const mongoose = require('mongoose')
const tguser = require('./module/module')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Database connection error:', err))

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async (ctx) => {
  try {
    const isuser = await tguser.findOne({ id: ctx.from.id })
    
    if (!isuser) {
      const newuser = new tguser({
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        id: ctx.from.id,
        username: ctx.from.username,
      })
      await newuser.save()
      console.log('New user added')
      return ctx.reply('Welcome to the bot!')
    }
    
    const users = await tguser.find({})
    ctx.reply('Welcome back!')
    ctx.reply(JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error in start command:', error)
    ctx.reply('Sorry, there was an error processing your request')
  }
})

bot.catch((err, ctx) => {
  console.error('Bot error:', err)
  ctx.reply('An error occurred')
})

bot.launch()
  .then(() => console.log('Bot started'))
  .catch(err => console.error('Bot launch error:', err))

// Enable graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
