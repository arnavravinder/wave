const { SlashCommandBuilder } = require('discord.js');
const { getLeaderboard } = require('../utils/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('View the server leaderboard'),
    async execute(interaction) {
        const leaderboard = await getLeaderboard();
        let replyMessage = '🏆 **Leaderboard** 🏆\n';
        leaderboard.forEach((user, index) => {
            replyMessage += `${index + 1}. ${user.username} - ${user.coins} coins\n`;
        });
        await interaction.reply(replyMessage);
    }
};