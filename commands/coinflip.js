const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin'),
    async execute(interaction) {
        const outcome = Math.random() < 0.5 ? 'Heads 🪙' : 'Tails 🪙';
        await interaction.reply(`The coin landed on: ${outcome}`);
    }
};
