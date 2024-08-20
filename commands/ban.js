const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member from the server')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The member to ban')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        if (member) {
            await member.ban();
            await interaction.reply(`${target.username} has been banned from the server.`);
        } else {
            await interaction.reply('That user is not in this server.');
        }
    }
};