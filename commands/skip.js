const { SlashCommandBuilder } = require('discord.js');
const { skip } = require('../utils/music');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current track'),
    async execute(interaction) {
        await skip(interaction);
    }
};
