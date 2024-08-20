const { SlashCommandBuilder } = require('discord.js');

const logSettings = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('Enable or disable logging for the server')
        .addBooleanOption(option =>
            option.setName('enable')
                .setDescription('Enable or disable logging')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send logs')
                .setRequired(false)
        ),
    async execute(interaction) {
        const enable = interaction.options.getBoolean('enable');
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        if (enable) {
            logSettings.set(interaction.guild.id, {
                enabled: true,
                channelId: channel.id,
            });
            await interaction.reply(`✅ Logging enabled. Logs will be sent in ${channel}.`);
        } else {
            logSettings.set(interaction.guild.id, { enabled: false });
            await interaction.reply('❌ Logging disabled.');
        }
    }
};