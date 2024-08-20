const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Adjust the volume of the bot')
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Volume level (1 to 100)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const volumeLevel = interaction.options.getInteger('level');
        if (volumeLevel < 1 || volumeLevel > 100) {
            return interaction.reply('❌ Volume level must be between 1 and 100.');
        }

        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) return interaction.reply('❌ No track is currently playing.');

        const player = connection.state.subscription.player;
        player.state.resource.volume.setVolume(volumeLevel / 100);
        interaction.reply(`🔊 Volume set to ${volumeLevel}%.`);
    }
};