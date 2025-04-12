const {Telegraf} = require('telegraf')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://codeyogiai:(himanshu1234)@codeyogihelper.2ixkxfk.mongodb.net/?retryWrites=true&w=majority&appName=codeyogihelper')
.then(() => console.log('connected to db'))

const bot = new Telegraf('7091410950:AAFQQ5uHP6AgooBgAZ6winS8MaAVrQwYy2M')

const tguser = require('./module/module')

bot.start(async function(ctx) {
  const isuser = await tguser.findOne({id:ctx.from.id});
  if(!isuser){
    const newuser = await new tguser({
    first_name:ctx.from.first_name,
      last_name:ctx.from.last_name,
      id:ctx.from.id,
      username:ctx.from.username,
    })
    newuser.save()
    console.log('new user added')
    ctx.reply('Welcome')
  }
  else{
  ctx.reply('Welcome Back')
    const send = await tguser.find({})
    ctx.reply(send)
  }
  })

bot.launch()