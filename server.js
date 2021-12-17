//Keep Alive bot 24/24 with uptimerobot.com
const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("Bot is running!")
})

function keepAlive() {
  server.listen(600, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive