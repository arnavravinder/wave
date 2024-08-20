const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('advice')
        .setDescription('Get random life advice'),
    async execute(interaction) {
        const response = await fetch('https://api.adviceslip.com/advice');
        const advice = await response.json();

        await interaction.reply(`💡 **Advice:**\n${advice.slip.advice}`);
    }
};