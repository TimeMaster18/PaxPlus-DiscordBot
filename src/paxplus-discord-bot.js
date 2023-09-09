const { Client, GatewayIntentBits } = require('discord.js')
const axios = require('axios')
const htmlToImage = require('node-html-to-image')

const { DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID, MASTER_SERVER_URL, SERVER_LISTINGS_ENDPOINT, REFRESH_INTERVAL_IN_SECONDS, LOG_LEVEL, UPDATE_MODE } = require('../resources/config.json')
const { generateHtml } = require('./html-generator')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

if (LOG_LEVEL !== "DEBUG") {
  console.debug = () => { }
}

const MILLISECONDS_IN_SECOND = 1000

client.once('ready', () => {
  console.log('PaxPlus Discord Bot is ready!')

  let lastMessageId = null

  async function fetchDataAndPostUpdate() {
    try {
      console.debug('Fetching data...')
      const response = await axios.get(MASTER_SERVER_URL + SERVER_LISTINGS_ENDPOINT)
      const data = response.data

      /** For testing purposes
      const fileContent = fs.readFileSync('./mock-server-response.json', 'utf-8')
      const data = JSON.parse(fileContent)
      */

      console.debug('Generating html and image from data...')
      const html = generateHtml(data)
      const imageBuffer = await htmlToImage({ html: html, type: 'png', quality: 80, transparent: true })

      console.log('Refreshing information...')
      const channel = await client.channels.fetch(DISCORD_CHANNEL_ID)

      if (UPDATE_MODE && lastMessageId) {
        try {
          await updateExistingDiscordMessage(channel, lastMessageId, imageBuffer)

        } catch (err) {
          console.error("Failed to update the message:", err)
          lastMessageId = await sendNewDiscordMessage(channel, imageBuffer, lastMessageId)
        }
      } else {
        lastMessageId = await sendNewDiscordMessage(channel, imageBuffer, lastMessageId)
      }

    } catch (error) {
      console.error('Error occurred:', error)
    }
  }

  // Call the function immediately upon bot's ready event, then set it to be called repeatedly
  fetchDataAndPostUpdate()
  setInterval(fetchDataAndPostUpdate, REFRESH_INTERVAL_IN_SECONDS * MILLISECONDS_IN_SECOND)
})


client.login(DISCORD_BOT_TOKEN)


async function updateExistingDiscordMessage(channel, lastMessageId, imageBuffer) {
  console.debug('Updating existing message...')
  const messageToUpdate = await channel.messages.fetch(lastMessageId)
  await messageToUpdate.edit({ files: [imageBuffer] })
}

async function sendNewDiscordMessage(channel, imageBuffer) {
  console.debug('Posting new message...')
  const newMessage = await channel.send({ files: [imageBuffer] })
  return newMessage.id
}

