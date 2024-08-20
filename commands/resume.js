const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume a paused track'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) return interaction.reply('❌ No track is currently playing.');

        const player = connection.state.subscription.player;
        if (player.state.status !== 'paused') {
            return interaction.reply('▶️ The track is already playing.');
        }

        player.unpause();
        interaction.reply('▶️ Resumed the track.');
    }
};