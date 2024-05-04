Discord Music Bot

This Discord bot is designed to enhance your Discord server by providing rich music playback capabilities. It allows users to play music from YouTube directly into voice channels. Additionally, the bot supports playlist management, allowing users to play entire YouTube playlists, as well as navigate through tracks with simple commands.
Features

    Play Music: Play any song or playlist from YouTube by providing a direct link or search query.
    Playlist Support: Load an entire YouTube playlist and control playback with playlist management commands.
    Navigation Commands: Users can skip to the next song or go back to the previous song in the playlist.
    Immediate Stop: Stop music playback immediately and clear the current playlist.
    Voice Channel Management: Automatically joins and leaves voice channels based on user commands.

Commands

    !play <URL or search term>: Plays the YouTube video or adds it to the current queue. If a playlist URL is provided, it loads the entire playlist.
    !next: Skips to the next song in the playlist.
    !back: Returns to the previous song in the playlist.
    !stop: Stops the music and clears the playlist, and the bot leaves the voice channel.

Setup
Prerequisites

    Node.js v16.x or newer
    A Discord bot token (How to get a Discord Bot Token)
    A YouTube Data API v3 key (How to get a YouTube API Key)

Installation

    Clone the repository:

    bash

git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name

Install the dependencies:

bash

npm install

Configure your bot token and YouTube API key:

    Create a .env file in the root directory of your project.
    Add the following lines to it:

    makefile

    DISCORD_BOT_TOKEN=your_discord_bot_token
    YOUTUBE_API_KEY=your_youtube_api_key

Start the bot:

bash

    node index.js

Adding the Bot to Your Server

Ensure your bot has permissions for reading messages, sending messages, connecting to voice channels, and speaking in them. Use the Discord developer portal to generate an invite link with the appropriate scopes and permissions.
Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

    Fork the Project
    Create your Feature Branch (git checkout -b feature/AmazingFeature)
    Commit your Changes (git commit -m 'Add some AmazingFeature')
    Push to the Branch (git push origin feature/AmazingFeature)
    Open a Pull Request

License

Distributed under the MIT License. See LICENSE for more information.
