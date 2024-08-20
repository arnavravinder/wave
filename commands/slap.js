const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you want to slap')
                .setRequired(true)
        ),
    async execute(interaction) { //todo image manipulation to add slapped user pfp etc
        const target = interaction.options.getUser('target');
        await interaction.reply(`${interaction.user.username} just slapped ${target.username}! 👋`);
    }
};
