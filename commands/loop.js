const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Toggle looping for the current track'),
    async execute(interaction) {
        const serverQueue = queue.get(interaction.guild.id);
        if (!serverQueue || serverQueue.songs.length === 0) {
            return interaction.reply('❌ No track is currently playing.');
        }

        serverQueue.loop = !serverQueue.loop;
        interaction.reply(serverQueue.loop ? '🔁 Looping enabled for the current track.' : '🔁 Looping disabled.');
    }
};