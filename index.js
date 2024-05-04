// Import necessary modules
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { google } = require('googleapis');

// Configure the YouTube API client
const youtube = google.youtube({
    version: 'v3',
    auth: 'Your_YouTube_API_Key'
});

// Initialize the Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

// Create an audio player
const player = createAudioPlayer();

// Define the playlist queue
let queue = {
    videos: [],
    current: 0,
    connection: null,

    playCurrentIndex: function(message) {
        if (this.current < this.videos.length && this.current >= 0) {
            const videoId = this.videos[this.current];
            playVideo(videoId, message);
        } else {
            message.channel.send("You've reached the end of the playlist.");
        }
    },

    addVideos: function(videoIds) {
        this.videos = this.videos.concat(videoIds);
    },

    clear: function() {
        this.videos = [];
        this.current = 0;
        if (this.connection) {
            this.connection.destroy();
            this.connection = null;
        }
    }
};

// Function to play a video
async function playVideo(videoId, message) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const stream = ytdl(url, { filter: 'audioonly' });
    const resource = createAudioResource(stream);

    if (!this.connection) {
        if (message.member.voice.channel) {
            this.connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            this.connection.subscribe(player);
        } else {
            message.channel.send("You need to be in a voice channel to play music.");
            return;
        }
    }

    player.play(resource);
    message.channel.send(`Now playing: ${url}`);

    player.on(AudioPlayerStatus.Idle, () => {
        queue.current++;
        queue.playCurrentIndex(message);
    });
}

// Function to play a playlist
async function playPlaylist(playlistId, message) {
    const response = await youtube.playlistItems.list({
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 50
    });

    const videoIds = response.data.items.map(item => item.snippet.resourceId.videoId);
    queue.addVideos(videoIds);
    queue.playCurrentIndex(message);
}

// Event listener for commands
client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;

    switch (message.content.split(' ')[0]) {
        case '!play':
            const content = message.content.slice(6);
            if (content.includes('playlist?list=')) {
                const playlistId = content.split('list=')[1];
                playPlaylist(playlistId, message);
            } else {
                handleVideoSearch(content, message);
            }
            break;
        case '!next':
            queue.current++;
            queue.playCurrentIndex(message);
            break;
        case '!back':
            if (queue.current > 0) {
                queue.current--;
                queue.playCurrentIndex(message);
            } else {
                message.channel.send("Already at the start of the playlist.");
            }
            break;
            case '!stop':
                try {
                    if (queue.connection) {
                        queue.connection.disconnect();
                        queue.connection = null;
                    }
                    player.stop();
                    queue.clear();
                    message.channel.send("Playback stopped and playlist cleared.");
                } catch (error) {
                    console.error("Failed to execute stop command:", error);
                    message.channel.send("Error stopping the playback.");
                }
                break;
    }
});

// Handle video search
async function handleVideoSearch(query, message) {
    const searchResponse = await youtube.search.list({
        part: 'snippet',
        q: query,
        maxResults: 1,
        type: 'video'
    });
    if (searchResponse.data.items.length > 0) {
        const videoId = searchResponse.data.items[0].id.videoId;
        playVideo(videoId, message);
    } else {
        message.channel.send("No video found.");
    }
}

// Log the bot in using the Discord bot token
client.login('Your_Discord_Bot_Token');
