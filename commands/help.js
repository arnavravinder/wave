const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the help menu'),
    async execute(interaction) {
        await interaction.reply(
            `**Wave Bot Commands**\n\n` +
            `/ping - Replies with pong!\n` +
            `/ban - Ban a user from the server\n` +
            `/kick - Kick a user from the server\n` +
            `/mute - Mute a user\n` +
            `/unmute - Unmute a user\n` +
            `/play - Play music\n` +
            `/stop - Stop the music\n` +
            `/skip - Skip the current track\n` +
            `/balance - Check your balance\n` +
            `/daily - Claim your daily reward\n` +
            `/leaderboard - View the server leaderboard\n` +
            `/inventory - View your inventory`
        );
    }
};
