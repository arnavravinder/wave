const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear messages in a channel')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to clear (up to 100)')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        if (amount < 1 || amount > 100) {
            return interaction.reply('🚫 Please provide a number between 1 and 100.');
        }

        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply(`🧹 Cleared **${amount}** messages.`);
    }
};
