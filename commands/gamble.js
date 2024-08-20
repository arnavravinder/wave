const { SlashCommandBuilder } = require('discord.js');
const { getBalance, updateBalance } = require('../utils/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamble')
        .setDescription('Gamble your coins')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount to gamble')
                .setRequired(true)
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const user = interaction.user;
        const balance = await getBalance(user.id);

        if (amount > balance) {
            return interaction.reply('You do not have enough coins to gamble that amount.');
        }

        const win = Math.random() < 0.5;
        const winnings = win ? amount : -amount;

        await updateBalance(user.id, winnings);
        await interaction.reply(win ? `You won ${amount} coins!` : `You lost ${amount} coins.`);
    }
};
