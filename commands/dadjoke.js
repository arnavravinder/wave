const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('Get a random dad joke'),
    async execute(interaction) {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' }
        });
        const joke = await response.json();

        await interaction.reply(`😂 **Dad Joke:**\n${joke.joke}`);
    }
};