const { SlashCommandBuilder } = require('discord.js');
const { getBalance } = require('../utils/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance'),
    async execute(interaction) {
        const user = interaction.user;
        const balance = await getBalance(user.id);
        await interaction.reply(`${user.username}, your balance is ${balance} coins.`);
    }
};
