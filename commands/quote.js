const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get an inspirational quote'),
    async execute(interaction) {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        await interaction.reply(`*"${data.content}"*\n- ${data.author}`);
    }
};
