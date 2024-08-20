const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the music queue'),
    async execute(interaction) {
        const serverQueue = queue.get(interaction.guild.id);
        if (!serverQueue || serverQueue.songs.length === 0) {
            return interaction.reply('❌ The music queue is empty.');
        }

        for (let i = serverQueue.songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [serverQueue.songs[i], serverQueue.songs[j]] = [serverQueue.songs[j], serverQueue.songs[i]];
        }

        interaction.reply('🔀 The music queue has been shuffled.');
    }
};