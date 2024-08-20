const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('motivate')
        .setDescription('Get a motivational message'),
    async execute(interaction) {
        const response = await fetch('https://www.affirmations.dev/');
        const data = await response.json();

        await interaction.reply(`💪 **Motivation:**\n${data.affirmation}`);
    }
};