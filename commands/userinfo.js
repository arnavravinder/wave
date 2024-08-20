const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('View a user’s information')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user whose information you want to view')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        await interaction.reply(
            `**User Info**\n` +
            `Username: ${user.username}\n` +
            `Tag: ${user.tag}\n` +
            `Joined Server: ${member.joinedAt.toDateString()}\n` +
            `Account Created: ${user.createdAt.toDateString()}`
        );
    }
};
