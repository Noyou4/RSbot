const { Client , Intents, Collection } = require('discord.js')
const client = new Client({intents:32767})
const fs = require('fs')

client.once('ready', ()=>{
    let unmber = 0
    setInterval(() => {
        const list = ["관리", "!도움말"]
        if(unmber == list.length) unmber = 0
        client.user.setActivity(list[unmber],{
            type:"PLAYING"
        })
        unmber++
    }, 2000)
    console.log("🟢봇이 구동 돼었습니다.")
})

client.on('messageCreate' , message =>{
    if(message.content == "안녕"){
        message.reply("안녕!")
    }
})

client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith("!")) return
    const args = message.content.slice("!".length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.login("MTE1ODczMTExOTE3NzUxNTA3OA.GQDuAE.MVK0wZxsUR_MEkhP5_KDnVhJQlY3KZBYPatAaE")