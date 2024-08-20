const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Get the definition of a word')
        .addStringOption(option =>
            option.setName('word')
                .setDescription('The word to define')
                .setRequired(true)
        ),
    async execute(interaction) {
        const word = interaction.options.getString('word');
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (data.title) {
            return interaction.reply('Could not find a definition for that word.');
        }

        const definition = data[0].meanings[0].definitions[0].definition;
        await interaction.reply(`**${word}**: ${definition}`);
    }
};
