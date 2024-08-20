const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearqueue')
        .setDescription('Clear the entire music queue'),
    async execute(interaction) {
        const serverQueue = queue.get(interaction.guild.id);
        if (!serverQueue || serverQueue.songs.length === 0) {
            return interaction.reply('❌ The music queue is already empty.');
        }

        serverQueue.songs = [];
        interaction.reply('🧹 The music queue has been cleared.');
    }
};
