const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('riddle')
        .setDescription('Receive a riddle to solve'),
    async execute(interaction) {
        const response = await fetch('https://riddles-api.vercel.app/random');
        const riddle = await response.json();

        await interaction.reply(`🧠 **Riddle:**\n${riddle.riddle}`);
    }
};