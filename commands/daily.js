const { SlashCommandBuilder } = require('discord.js');
const { claimDailyReward } = require('../utils/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily reward'),
    async execute(interaction) {
        const user = interaction.user;
        const dailyReward = await claimDailyReward(user.id);
        if (dailyReward > 0) {
            await interaction.reply(`🎉 **${user.username}**, you claimed your daily reward of **${dailyReward}** coins!`);
        } else {
            await interaction.reply('⏳ You have already claimed your daily reward today. Come back tomorrow!');
        }
    }
};