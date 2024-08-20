const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('Set a reminder')
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Time in minutes (e.g., 10 for 10 minutes)')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The reminder message')
                .setRequired(true)
        ),
    async execute(interaction) {
        const time = interaction.options.getString('time');
        const message = interaction.options.getString('message');

        await interaction.reply(`Reminder set for ${time} minutes.`);

        setTimeout(async () => {
            await interaction.followUp(`${interaction.user}, reminder: ${message}`);
        }, time * 60000);
    }
};
