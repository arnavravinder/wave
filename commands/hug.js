const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you want to hug')
                .setRequired(true)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        await interaction.reply(`${interaction.user.username} gives a warm hug to ${target.username}! 🤗`);
    }
};
