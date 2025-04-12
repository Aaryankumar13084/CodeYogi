
const { Telegraf, Context } = require('telegraf')
const mongoose = require('mongoose')
const tguser = require('./module/module')

// Connect to MongoDB
mongoose.connect(`mongodb+srv://codeyogiai:(himanshu1234)@codeyogihelper.2ixkxfk.mongodb.net/?retryWrites=true&w=majority&appName=codeyogihelper`)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Database connection error:', err))

const bot = new Telegraf(`7091410950:AAFQQ5uHP6AgooBgAZ6winS8MaAVrQwYy2M`)

bot.start(async (ctx) => {
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
    
    ctx.reply('Welcome back!')
    })

const levelarr = {
  "5": "<h1>Welcome to codeyogi</h1>",
  // Add more levels here as needed
}

bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text
  if (levelarr[userMessage]) {
    try {
      await ctx.replyWithHTML(levelarr[userMessage])
    } catch (error) {
      console.error('Error sending level:', error)
      ctx.reply('Error sending level content')
    }
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
