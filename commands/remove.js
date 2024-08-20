const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a specific track from the queue')
        .addIntegerOption(option =>
            option.setName('index')
                .setDescription('The position of the track to remove in the queue')
                .setRequired(true)
        ),
    async execute(interaction) {
        const serverQueue = queue.get(interaction.guild.id);
        if (!serverQueue || serverQueue.songs.length === 0) {
            return interaction.reply('❌ The music queue is empty.');
        }

        const index = interaction.options.getInteger('index');
        if (index < 1 || index > serverQueue.songs.length) {
            return interaction.reply('❌ Invalid track number.');
        }

        const removedSong = serverQueue.songs.splice(index - 1, 1);
        interaction.reply(`🗑️ Removed **${removedSong[0].title}** from the queue.`);
    }
};