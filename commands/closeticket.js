const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('closeticket')
        .setDescription('Close the current ticket'),
    async execute(interaction) {
        if (!interaction.channel.name.startsWith('ticket-')) {
            return interaction.reply({ content: '❌ You can only use this command in a ticket channel.', ephemeral: true });
        }

        await interaction.reply('🔒 Are you sure you want to close this ticket?');

        const confirmButton = new ButtonBuilder()
            .setCustomId('confirm_close')
            .setLabel('Yes, close it')
            .setStyle(ButtonStyle.Danger);

        const cancelButton = new ButtonBuilder()
            .setCustomId('cancel_close')
            .setLabel('No, cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton);

        const message = await interaction.channel.send({ components: [row] });

        const filter = (i) => i.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (buttonInteraction) => {
            if (buttonInteraction.customId === 'confirm_close') {
                await buttonInteraction.reply('🔒 Ticket closed.');
                await interaction.channel.delete();
            } else if (buttonInteraction.customId === 'cancel_close') {
                await buttonInteraction.reply('❌ Ticket closure cancelled.', { ephemeral: true });
            }
        });

        collector.on('end', () => {
            message.edit({ components: [] });
        });
    }
};