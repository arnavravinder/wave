const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get the invite link for the bot'),
    async execute(interaction) {
        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=8&scope=bot%20applications.commands`;

        await interaction.reply(`🔗 **Invite me to your server!**\n[Click here to invite](${inviteLink})`);
    }
};