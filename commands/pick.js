const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pick')
        .setDescription('Randomly pick an option from a provided list')
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Enter options separated by commas (e.g., option1, option2, option3)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const options = interaction.options.getString('options').split(',').map(option => option.trim());
        const choice = options[Math.floor(Math.random() * options.length)];

        await interaction.reply(`🎯 **I pick:** ${choice}`);
    }
};