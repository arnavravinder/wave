const { SlashCommandBuilder } = require('discord.js');
const { getLyrics } = require('genius-lyrics-api'); // You can use any lyrics API you prefer

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Fetch lyrics for the current track'),
    async execute(interaction) {
        const serverQueue = queue.get(interaction.guild.id);
        if (!serverQueue || serverQueue.songs.length === 0) {
            return interaction.reply('❌ No track is currently playing.');
        }

        const songTitle = serverQueue.songs[0].title;
        const lyrics = await getLyrics({ apiKey: process.env.GENIUS_API_KEY, title: songTitle, artist: '' }); // Adjust based on your lyrics API

        if (lyrics) {
            interaction.reply(`📜 **Lyrics for "${songTitle}":**\n${lyrics}`);
        } else {
            interaction.reply('❌ Could not find lyrics for this track.');
        }
    }
};