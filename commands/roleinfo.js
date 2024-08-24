const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('Get information about a specific role')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to get information about')
                .setRequired(true)
        ),
    async execute(interaction) {
        const role = interaction.options.getRole('role');

        await interaction.reply(
            `📜 **Role Info**\n` +
            `• Name: ${role.name}\n` +
            `• ID: ${role.id}\n` +
            `• Color: ${role.hexColor}\n` +
            `• Members: ${role.members.size}\n` +
            `• Created On: ${role.createdAt.toDateString()}\n` +
            `• Mentionable: ${role.mentionable ? 'Yes' : 'No'}`
        );
    }
};