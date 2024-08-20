const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fact')
        .setDescription('Get a random fact'),
    async execute(interaction) {
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const fact = await response.json();

        await interaction.reply(`🧠 **Random Fact:**\n${fact.text}`);
    }
};
