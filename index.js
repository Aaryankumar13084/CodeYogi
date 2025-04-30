
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
console.log(ctx.from)
    
    if (!isuser) {
      const newuser = new tguser({
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        id: ctx.from.id,
        username: ctx.from.username,
      })
      await newuser.save()
      console.log('New user added')
      return ctx.reply(`Welcome to the CodeYogi Helper Bot! me ek ai bot hu jis se tum apne codeyogi levels ke assignment ko solve kar sakte ho kisi bhi level ke assignment ke liye apne assignment ka number likho mare paas abhi 4.1 se 50.1 tak ke assignment hai. assignmrent ko solve karne ke liye apne assignment ka number likho

   👉 ex 50.1 or 4.1 etc.  
   
👍👍👍👍👍👍👍👍👍👍👍👍👍      
        `)
    }
    
    ctx.reply(`Welcome back to the CodeYogi Helper Bot! me ek ai bot hu jis se tum apne codeyogi levels ke assignment ko solve kar sakte ho kisi bhi level ke assignment ke liye apne assignment ka number likho mare paas abhi 4.1 se 50.1 tak ke assignment hai. assignmrent ko solve karne ke liye apne assignment ka number likho

   👉 ex 50.1 or 4.1 etc.  
   
👍👍👍👍👍👍👍👍👍👍👍👍👍      
              `)
    })


bot.command('profile', async (ctx) =>{
  const user = await tguser.findOne({ id: ctx.from.id })
  if (user){
    ctx.reply(`First Name: ${user.first_name}\nLast Name: ${user.last_name}\nUsername: ${user.username}\nID: ${user.id}`)
  }
})


// 📌 Command to send a message to all registered users  
bot.command("broadcast", async (ctx) => {
  const adminId = 7503197657;  

  if (ctx.from.id.toString() !== adminId) {
    return ctx.reply("❌ You are not authorized to use this command.");
  }

  const messageText = ctx.message.text.split(" ").slice(1).join(" ");
  if (!messageText) {
    return ctx.reply("⚠ Please provide a message. Example: `/broadcast This is a test message`");
  }

  try {
    const users = await User.find();
    for (const user of users) {
      try {
        await bot.telegram.sendMessage(user.telegramId, `📢 *Announcement:*\n\n${messageText}`, { parse_mode: "Markdown" });
      } catch (error) {
        console.error(`Error sending message to ${user.telegramId}:`, error);
      }
    }
    ctx.reply("✅ Message sent to all registered users.");
  } catch (err) {
    console.error("Broadcast Error:", err);
    ctx.reply("❌ Failed to send the message.");
  }
});

const levelarr = {
  "4.1": `https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/17fa1b81121ce6234e23f130fddba3cb108ac74dcc42d0e37067d8a0cfb1e5a6`,
  "6.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/857b13c4440091988b7c078af02b23707765c6c41be605c01a2cb0e0af69da6b`,
  "7.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/5793fe04d33c7b502987d29f1562073c265906f010452b4743da72d5cf0bf06b`,
  "8.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/ca051a1ec060272ce04523381bd38a1e78f81c757b400a878df2bc48a5aeb8f9`,
  "10.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/8fdcc957e4c33c29cd5371bb1adb317c69679e35f9e603997dd4c7abd1c4f02e`,
  "11.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/8ab7d12ca262b600dc003ac9b0d3fa06110a178eaef8580aa8f9fe57e5b6f517`,
  "12.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/1a10f000565867fa8539788af05e0c70d61fcc840ae98206a37a04ee0dd0b87d`,
  "14.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/b77763b38e95cb7e44009d8e82b2a636f63be3423ac7f5477ce414e5e75f5f2d`,
  "18.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/8fdcc957e4c33c29cd5371bb1adb317c017846f0ebbde5800f7cdc236acc856e`,
  "18.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/e296e2fb3aa466723487ba82abccad09eda10eda04e55f2e436e1d84ba8dcb4f`,
  "19.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/9477a0609491e17779a90a8677c9cac0a5aa512e1bc1a396104ef6fe42019fc6`,
  "20.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/2a2784c9e7d4ecc72dab0563fcb7defb0df515d1248aa00dae14fc1d6dac5413`,
  "21.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/97c85daf8dc5dbfd0e89e0d32df8b54a47307b6a925436032f927e6855e8c856`,
  "22.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/84b63ec9e09509c520b418299214a46189d76ed2bca8c36d85f2559b9c269fb6`,
  "22.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/e0d3519858e5030d56f77aaace58bf363fafc02d620ff33ff0e65959c72332bb`,
  "22.3":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/b8dd274a56dfea62f0a3943f335b131b389e299079601e0214941cae52a5d0e2`,
  "22.4":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/6eadd46ac0923936928513bb163723050ca2f6278badcffebcecaa77071ee109`,
  "22.5":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/6a443126fb99d57ab285c789b5572a7b00d703c837622042e902e199dd434317`,
  "22.6":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/c145d157f6432d5f806f5333b14aba200f4ae6a2fe59e4365bd6b8be8e4e4f60`,
  "22.7":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/2cdf9d1339d7657bfb912057a475cfa473a32aa069b6f5fb31425b80b8f275e2`,
  "22.8":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/b8570dc0ad6d69022460ccf9afb4d466e73ea42c659a684b6398cfc76361b0b4`,
  "22.9":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/13db085c5515f772530f38a8b340638c62ca8ec72ed7f9b227f6d67a2d2002f5`,
  "22.10":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/8e0c769e09ede32cc9eea4840a033b75ee31f97a86145cfadc8e6af7c6fccc59`,
  "23.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/ea4b1801916cea5fe9aa88f3bcaadfad55e22c858b72214df677ec995f12cc1d`,
  "23.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/b67e38beec09cb678ab3d2da6f8967a685922335a3ea68f45a266cbc9794e3da`,
  "23.4":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/45316119bcc12503fccb49d0ac8b5435bba8eb1f0e706d72920df1560a8b28f2`,
  "24.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/f1d8a4f5912cecd110280020e1003040ab59c86981c825cc8eddabae434473bc`,
  "25.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/2cf51bcea0921d8e84d2bd585045c4dfc7be98b56492c051058e3ebbff949e08`,
  "25.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/2a9fddc3ae7b02ba26f8b1b2419067416e3576afd3233133e39766fb6c24a0d7`,
  "27.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/e595f98e10c7fb116241c8357fa33dd92ae4e5eaaac62848d5ebcfa0426907d7`,
  "28.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/c17a8ce2fa7a4b575fba1823c6a63cc4b548f17f31eefda2c61e3dee5d14aee4`,
  "28.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/682d4d5ea9639c0c54c466bf3813afbceb8e93677940367b9e8ed14ccb6b4fb6`,
  "28.3":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/737a2fa20045f1fdd3feb107d124b82701fcca4f6698095f6a5395492a987e26`,
  "28.4":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/410a946f022949f04cf1dfbd15870c455a5765aa1fa262e42ea5c07a12d4e2fb`,
  "28.5":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/48f277da5b685b02d83767ad7e2683bf4e0a46794ec3b7dfec70e37157f35232`,
  "29.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/1c249f2abe27359676d3c236c053269c17d2865d3a332a814c07d969303e6704`,
  "30.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/b3ab9de183598b07226e9477c3e10c22de46fabd8af9c4aae388b92912019a17`,
  "30.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/462b4951f26609222689456545737a964a3ec536a39bb355b80418ad2a8030cb`,
  "31.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/9d5a97a2af7251490078881a170c0d881ff877ef592176f5a9b307f3d57e5ecb`,
  "32.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/323bd3e079809d0cffaf4347104b4a4a89949be693331d2af5834a468ca656ee`,
  "32.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/6985e79a02186c6670a2fd4c0bd89bc470d96da300006f453bf815e200808ff1`,
  "34.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/9fe5f9b05f6a1010c498ba9fe679231736243f8f2e8b53e0c4882fd3ac0a0832`,
  "34.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/02fe14a1c3fee3e603346595737dc6bc1b5d5248aefd7ee85c34ac74e4600bab`,
  "34.3":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/cceb7c40d621ffc9994ff17b5cf8e293481fc5b2e070404cfc96639fd801f94e`,
  "34.4":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/754bf4cb6b66a7e1687350254568fbc91938343e5634fc65e3cadb7e495920bb`,
  "35.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/9fe5f9b05f6a1010c498ba9fe679231753a1c8bcbdcbf09b8301308a6f1a59cc`,
  "35.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/df2282fc745a86dfdd8d37ea204413a2daa153c7f62340fa2350d40690cadbe0`,
  "35.3":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/2b4d7e8cae55046f92e89304df6a84ac7adeb1950e0495fe8a0c3eef2de17880`,
  "35.4":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/6406f4aac6cf498266a002cc3e129b9fdeb5852b04ecaeecabb7ec108370869e`,
  "35.5":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/47388010f0d91f56adcca6f42d9c1916308f919a7574d8a062d09e1ba616d3ee`,
  "35.6":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/28b9a6a85742111087ed8b1dac9055d9134a1f51e99fd27de48bd104d2328454`,
  "35.7":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/6fdcba551eec247945ba5d981d4875b18631356a7259ea4dc03864451baf2c0c`,
  "35.8":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/a0f107dc9b47ddf616ad1cd69815185da1c0c70057c30e13912a25560cb110b9`,
  "35.9":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/f6ca0bec1343f964d2c8c6243b5f1caa29a740a67a72a6930bb017f06c2638f9`,
  "36.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/628fedcf83f2364d109ac94d2edaeeab026554de69b0761133cac3019d383200`,
  "36.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/9e8dbcf5ed6fd28ce137dbed079982cc9496b8431f4ed60f6d74c5ab0663bf2b`,
  "36.3":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/a152032753581b63ee35cebee0bbfde99e15fabe1e519f97cd7c191fe2f4b4c9`,
"37.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/9f944feabfa3750945bbf4369c9ef6e0b29b031581a250d2e876dca2b76ba1b8`,
  "37.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/bfeec606a8cc71174e3eefce0a1ea8609dbb717e861138b989bb07d09e502b76`,
  "37.3":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/a0ac150ef854bf31243bc353a3510bad75b2598bd47f789b2d72ae28d34a8363`,
  "37.4":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/f7b5ac89c56715c74c8fd7e44250a811116be3a7dcb6e22d59580e4385d85ae6`,
  "38.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/f4538a8eb53a19b45fd97960c37332c4ebfbd5b98ff2bdf1083fbf482d404646`,
  "38.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/eb64d3deddc98040462f549900d2370bc7509a808e149f0b2ef4a406f0b750b9`,
  "38.3":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/32a01dcff37efde8d42808c9f374864d5c804325ce749045581e999cb5636e8b`,
  "39.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/76b6304071764e5c852c9a48f5d6446534c53a157403ed7b3c7e157dc8047029`,
  "40.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/d05cac134d019ce0fa7519c94bd93d0cf9fa4c21507c6c01cf548d2927771c4f`,
  "40.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/107a1d51f4ea5e67ea43b4adff92435dd9040acbbafcd9b37d3ea3ec12d8bd15`,
  "41.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/d72d82c7471eecc72251a616bfedd3ff0ada3abf28c6420545d4831fce25e978`,
  "41.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/2b992b59573f7a791677e2a022e0caed570797081b921d4da9d974a46944febf`,
  "45.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/63ff074fbfc158ae5575b14903a62831108296800e6f626a86445cbfb15314d2`,
  "46.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/95747cd107a130368147fed06d8c1979599e7b0227e0783c8e4b3f1eb1dd5440`,
  "47.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/a69e6fa050fabefaed25022664ebeb80001cc3fa4221d22f21d54689716ca4f5`,
  "47.2":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/cff1361ac561c819f6a4c060bcf5bcaaf0dffbe62250110b5dc579661b176084`,
  "48.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/16058c5ad0f54e6fed325b4bfc56cdc1b47c30237d6a36e9e4f36b164c3d13ce`,
  "49.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/c2043370d2e24d2d74784db9a66df4b99b73b52acbbff301da22c995435c0866`,
  "50.1":`https://editor.codeyogi.io/u/c7d20d2c0f79640618650845163522e7/s/9181084daf2505a840c7b1b2d61978e3598887663c81809fcbdf9bb9fa3ef00e`,
  "":``,
  "":``,
  "":``,
  // Add more levels here as needed
}

bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text
console.log(userMessage)
  if (levelarr[userMessage]) {
      await ctx.reply(levelarr[userMessage])
    }else{
      await ctx.reply(`Invalid level number. Please enter a valid level number. ex 4.1 or 6.1 etc.`)
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
