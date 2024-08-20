const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a random meme'),
    async execute(interaction) {
        const response = await fetch('https://www.reddit.com/r/memes/random/.json');
        const [data] = await response.json();
        const meme = data.data.children[0].data;

        await interaction.reply({
            content: `😂 ${meme.title}`,
            files: [meme.url]
        });
    }
};
