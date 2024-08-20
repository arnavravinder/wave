const { SlashCommandBuilder } = require('discord.js');
const translate = require('@vitalets/google-translate-api');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate a message')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to translate')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('language')
                .setDescription('The target language (e.g., "en" for English, "es" for Spanish)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const language = interaction.options.getString('language');

        const translated = await translate(text, { to: language });
        await interaction.reply(`Translation: ${translated.text}`);
    }
};
