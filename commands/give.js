const { SlashCommandBuilder } = require('discord.js');
const { getBalance, updateBalance } = require('../utils/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription('Give coins to another user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to give coins to')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount to give')
                .setRequired(true)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const amount = interaction.options.getInteger('amount');
        const user = interaction.user;

        const balance = await getBalance(user.id);
        if (amount > balance) {
            return interaction.reply('You do not have enough coins to give that amount.');
        }

        await updateBalance(user.id, -amount);
        await updateBalance(target.id, amount);
        await interaction.reply(`You gave ${amount} coins to ${target.username}.`);
    }
};
