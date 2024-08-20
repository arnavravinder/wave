const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Display information about the current track'),
    async execute(interaction) {
        const serverQueue = queue.get(interaction.guild.id);
        if (!serverQueue || serverQueue.songs.length === 0) {
            return interaction.reply('❌ No track is currently playing.');
        }

        const currentSong = serverQueue.songs[0];
        interaction.reply(
            `🎵 **Now Playing:**\n` +
            `**Title:** ${currentSong.title}\n` +
            `**Duration:** ${formatDuration(currentSong.duration)}\n` +
            `**Requested by:** ${currentSong.requestedBy}\n` +
            `**Link:** [Click here](${currentSong.url})`
        );
    }
};