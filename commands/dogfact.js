const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dogfact')
        .setDescription('Get a random dog fact'),
    async execute(interaction) {
        const response = await fetch('https://dog-api.kinduff.com/api/facts');
        const fact = await response.json();

        await interaction.reply(`🐶 **Dog Fact:**\n${fact.facts[0]}`);
    }
};
