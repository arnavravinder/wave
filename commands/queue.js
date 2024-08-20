const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('View the current music queue'),
    async execute(interaction) {
        const serverQueue = queue.get(interaction.guild.id);
        if (!serverQueue || serverQueue.songs.length === 0) {
            return interaction.reply('❌ The music queue is empty.');
        }

        const queueMessage = serverQueue.songs
            .map((song, index) => `${index + 1}. **${song.title}**`)
            .join('\n');

        interaction.reply(`🎶 **Current Music Queue:**\n${queueMessage}`);
    }
};