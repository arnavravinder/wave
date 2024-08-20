const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catfact')
        .setDescription('Get a random cat fact'),
    async execute(interaction) {
        const response = await fetch('https://meowfacts.herokuapp.com/');
        const fact = await response.json();

        await interaction.reply(`🐱 **Cat Fact:**\n${fact.data[0]}`);
    }
};