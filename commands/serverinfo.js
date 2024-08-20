const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('View server information'),
    async execute(interaction) {
        const { guild } = interaction;
        await interaction.reply(
            `🏠 **Server Info**\n` +
            `📛 Name: ${guild.name}\n` +
            `👑 Owner: <@${guild.ownerId}>\n` +
            `👥 Member Count: ${guild.memberCount}\n` +
            `📅 Created On: ${guild.createdAt.toDateString()}`
        );
    }
};