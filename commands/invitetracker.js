const { SlashCommandBuilder } = require('discord.js');
const { updateInvitesCache, checkInviter } = require('../utils/inviteTracker');

const inviteTrackerSettings = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invitetracker')
        .setDescription('Enable or disable the invite tracker feature')
        .addBooleanOption(option =>
            option.setName('enable')
                .setDescription('Enable or disable the invite tracker')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send invite tracking messages')
                .setRequired(false)
        ),
    async execute(interaction) {
        const enable = interaction.options.getBoolean('enable');
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        if (enable) {
            inviteTrackerSettings.set(interaction.guild.id, {
                enabled: true,
                channelId: channel.id,
            });
            await updateInvitesCache(interaction.guild);
            await interaction.reply(`✅ Invite tracker enabled. Messages will be sent in ${channel}.`);
        } else {
            inviteTrackerSettings.set(interaction.guild.id, { enabled: false });
            await interaction.reply('❌ Invite tracker disabled.');
        }
    }
};