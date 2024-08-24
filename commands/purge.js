const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete a specified number of messages')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete (1-100)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        if (amount < 1 || amount > 100) {
            return interaction.reply('❌ You need to specify a number between 1 and 100.');
        }

        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply(`🧹 Deleted ${amount} messages.`);
        setTimeout(() => interaction.deleteReply(), 5000); // auto delete the mesg -- u can change the time here
    }
};