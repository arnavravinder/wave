const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot say a specified message')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message you want the bot to say')
                .setRequired(true)
        ),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply({ content: message, ephemeral: true }); 
        await interaction.channel.send(message); 
    }
};
