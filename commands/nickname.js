const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Change a user\'s nickname')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to change the nickname for')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('nickname')
                .setDescription('The new nickname')
                .setRequired(true)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const nickname = interaction.options.getString('nickname');
        const member = interaction.guild.members.cache.get(target.id);

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageNicknames)) {
            return interaction.reply('❌ You do not have permission to manage nicknames.');
        }

        await member.setNickname(nickname);
        interaction.reply(`✅ Changed nickname for **${target.username}** to **${nickname}**.`);
    }
};