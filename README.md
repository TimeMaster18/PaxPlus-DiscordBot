# PaxPlus-DiscordBot

Hawken PaxPlus DiscordBot for server status in real-time. This bot retrieves server listing information from the PaxPlus Master Server and posts the details to a designated Discord channel.

## Table of Contents

- [PaxPlus-DiscordBot](#paxplus-discordbot)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [Configuration](#configuration)
  - [Running the Bot](#running-the-bot)
  - [Scripts](#scripts)
  - [Credits](#credits)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-repo-url/paxplus-discordbot.git
   ```

2. Navigate into the directory:
   ```
   cd paxplus-discordbot
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

Before you run the bot, you need to set up your configuration.

1. Create a `config.json` file in the **/resources** directory.
2. Populate the file with the following:

```json
{
    "DISCORD_BOT_TOKEN": "YOUR_TOKEN",
    "DISCORD_CHANNEL_ID": "YOUR_CHANNEL_ID",
    "MASTER_SERVER_URL": "YOUR_MASTER_SERVER_URL",
    "SERVER_LISTINGS_ENDPOINT": "/serverListings",
    "REFRESH_INTERVAL_IN_SECONDS": 60,
    "LOG_LEVEL": "INFO",
    "UPDATE_MODE": false
}
```

* `DISCORD_BOT_TOKEN`: Your Discord bot token.
* `DISCORD_CHANNEL_ID`: The ID of the Discord channel where the bot should post the server list.
* `MASTER_SERVER_URL`: The base URL of your PaxPlus Master Server.
* `SERVER_LISTINGS_ENDPOINT`: The endpoint to get server listings (usually `/serverListings`).
* `REFRESH_INTERVAL_IN_SECONDS`: The time interval in seconds for the bot to refresh and repost the server listings.
* `LOG_LEVEL`: The level of logs you want to see (`DEBUG` or `INFO`).
* `UPDATE_MODE`: If set to `true`, the bot will update the previous message with new server listings. If `false`, it will send a new message every time.

## Running the Bot

To run the bot:

```
npm start
```

This will start the bot, and it will begin posting server information to the specified Discord channel based on your configurations.

## Scripts

Apart from starting the bot, there are a few other npm scripts available:

* `npm run lint`: This will run the eslint and show you any linting errors in the code.
* `npm test`: This is a placeholder test script. Right now, it will throw an error as no test is specified.

## Credits

Author: **TimeMaster**  
Dependencies: axios, discord.js, node-html-to-image  
Dev Dependencies: eslint  
License: ISC

For more information, please refer to the PaxPlus Masterserver project: [PaxPlus-Masterserver](https://github.com/iNFiNiTY6441/PaxPlus-Masterserver).
