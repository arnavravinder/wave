const { SlashCommandBuilder } = require('discord.js');
const { stop } = require('../utils/music');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and leave the voice channel'),
    async execute(interaction) {
        await stop(interaction);
    }
};
