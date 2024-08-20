const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The poll question')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Poll options separated by commas (e.g., Yes,No)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const options = interaction.options.getString('options').split(',');

        let pollMessage = `📊 **Poll:** ${question}\n\n`;
        options.forEach((option, index) => {
            pollMessage += `${index + 1}. ${option}\n`;
        });

        const poll = await interaction.reply({ content: pollMessage, fetchReply: true });

        for (let i = 0; i < options.length; i++) {
            await poll.react(`${i + 1}️⃣`);
        }
    }
};
