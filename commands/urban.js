const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Look up a term in Urban Dictionary')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('The term to look up')
                .setRequired(true)
        ),
    async execute(interaction) {
        const term = interaction.options.getString('term');
        const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`);
        const data = await response.json();

        if (data.list.length === 0) {
            return interaction.reply(`❌ No results found for **${term}**.`);
        }

        const definition = data.list[0];
        await interaction.reply(`📚 **Urban Dictionary:**\n**${term}** - ${definition.definition}\n\n💬 Example: ${definition.example}`);
    }
};