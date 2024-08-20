const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current track'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) return interaction.reply('❌ No track is currently playing.');

        const player = connection.state.subscription.player;
        if (player.state.status === 'paused') {
            return interaction.reply('⏸️ The track is already paused.');
        }

        player.pause();
        interaction.reply('⏸️ Paused the current track.');
    }
};