const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../utils/music');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music in your voice channel')
        .addStringOption(option => option.setName('song').setDescription('The song URL').setRequired(true)),
    async execute(interaction) {
        await execute(interaction);
    }
};