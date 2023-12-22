// Import necessary modules
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { google } = require('googleapis');

// Create a new Discord client with specified intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

// Configure the YouTube API client
const youtube = google.youtube({
    version: 'v3',
    auth: 'Your_YouTube_API_Key'
});

// Create an audio player
let player = createAudioPlayer();

// Event listener for when the bot is ready
client.on('ready', () => {
    console.log(`Bot connected as ${client.user.tag}`);
});

// Event listener for new messages
client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;  // Ignore messages from bots or outside of guilds

    // Handle the '!play' command
    if (message.content.startsWith('!play ')) {
        const args = message.content.split(' ').slice(1);
        if (args.length < 2) {
            message.reply('Please specify the artist and title.');
            return;
        }

        const query = args.join(' ');
        try {
            // Search for a video on YouTube
            const response = await youtube.search.list({
                part: 'snippet',
                type: 'video',
                q: query,
                maxResults: 1
            });

            // Handle no search results
            if (response.data.items.length === 0) {
                message.reply('No song found.');
                return;
            }

            // Get video details and prepare to play
            const video = response.data.items[0];
            const { videoId } = video.id;
            const url = `https://www.youtube.com/watch?v=${videoId}`;
            const title = video.snippet.title;
            message.reply(`Now playing: ${title}\nLink: ${url}`);

            const channel = message.member.voice.channel;
            if (!channel) {
                message.reply('You need to be in a voice channel.');
                return;
            }

            // Join the voice channel and play the audio
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            
            // Set up stream with quality options
            const streamOptions = { 
                filter: 'audioonly', 
                quality: 'highestaudio', 
                highWaterMark: 1 << 28 
            };
            const stream = ytdl(url, streamOptions);
            const resource = createAudioResource(stream);
            player.play(resource);
            connection.subscribe(player);

            // Destroy the connection when the audio ends
            player.on(AudioPlayerStatus.Idle, () => connection.destroy());
        } catch (error) {
            console.error('Error during YouTube search:', error);
            message.reply('Error while searching for the song.');
        }
    }

    // Handle the '!stop' command
    if (message.content === '!stop') {
        const connection = getVoiceConnection(message.guild.id);
        if (connection) {
            player.stop();
            connection.destroy();
            message.reply('Music stopped.');
        } else {
            message.reply('The bot is not in a voice channel.');
        }
    }
});

// Log the bot in using the Discord bot token
client.login('Your_Discord_Bot_Token');
