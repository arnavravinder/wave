const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('View a user’s avatar')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user whose avatar you want to view')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        await interaction.reply(`🖼️ **${user.username}**'s avatar: ${user.displayAvatarURL({ dynamic: true, size: 512 })}`);
    }
};
