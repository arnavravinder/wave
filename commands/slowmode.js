const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set slow mode for the channel')
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('The slow mode duration in seconds (0-21600)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');
        if (seconds < 0 || seconds > 21600) {
            return interaction.reply('❌ You need to specify a duration between 0 and 21600 seconds.');
        }

        await interaction.channel.setRateLimitPerUser(seconds);
        interaction.reply(`🐢 Slow mode set to ${seconds} seconds.`);
    }
};