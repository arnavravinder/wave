const { SlashCommandBuilder } = require('discord.js');
const afkUsers = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set yourself as AFK')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The AFK message to display')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.user;
        const message = interaction.options.getString('message') || 'AFK';

        afkUsers.set(user.id, message);
        await interaction.reply(`💤 **${user.username}** is now AFK: ${message}`);

        interaction.client.on('messageCreate', (msg) => {
            if (afkUsers.has(msg.author.id)) {
                afkUsers.delete(msg.author.id);
                msg.reply(`👋 Welcome back, **${msg.author.username}**! You are no longer AFK.`);
            }
        });
    }
};