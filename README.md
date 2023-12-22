# omibot

## Name
OmiBot Discord Tunes Streamer.

## Description
This Node.js script powers a Discord bot designed to stream music within Discord voice channels. It listens for user commands to play or stop music. When a user sends a !play command followed by an artist's name and song title, the bot uses the YouTube Data API to find and stream the requested song into a Discord voice channel. The !stop command halts the music and disconnects the bot from the channel. The script utilizes the discord.js library for Discord interaction, @discordjs/voice for managing voice connections, and ytdl-core for fetching audio streams from YouTube. It ensures smooth playback with quality control settings and handles errors effectively for a seamless user experience.

## Installation
To run this Discord music bot script, you need Node.js installed with npm. Key Node.js libraries required are discord.js for Discord API interactions, @discordjs/voice for voice connections, ytdl-core for streaming from YouTube, and googleapis for YouTube data access. Obtain a Discord bot token from the Discord Developer Portal and a YouTube Data API key from the Google Cloud Console. Ensure your bot has permissions for GUILDS, GUILD_MESSAGES, GUILD_VOICE_STATES, and MESSAGE_CONTENT. A stable internet connection and adequate computational resources are also necessary for smooth operation.

## Usage
This script is used to operate a Discord music bot that can play songs from YouTube within a Discord server's voice channels. To use it, first ensure the script is running on a server or hosting environment with Node.js. Once active, the bot listens for specific commands in the text channels of your Discord server.

To play a song, a user types !play followed by the artist's name and song title in any text channel where the bot has access. The bot then searches YouTube for the requested song using the YouTube Data API and starts streaming the audio into the voice channel where the user is currently present.

If a user wants to stop the music, typing !stop in the text channel will make the bot cease playing the current song and leave the voice channel. The bot handles these commands in real-time, providing an interactive music experience within your Discord server.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
omicronc with help from ChatGPT.

## License
open source projects.

