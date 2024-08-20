const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guessnumber')
        .setDescription('Guess the number game'),
    async execute(interaction) {
        const targetNumber = Math.floor(Math.random() * 100) + 1;
        await interaction.reply('🔢 I’m thinking of a number between 1 and 100. Can you guess it? Type your guess in the chat.');

        const filter = (response) => response.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 20000 });

        collector.on('collect', (msg) => {
            const guess = parseInt(msg.content, 10);
            if (guess === targetNumber) {
                interaction.followUp(`🎉 Congratulations! You guessed the number **${targetNumber}**.`);
                collector.stop();
            } else if (guess < targetNumber) {
                msg.reply('📉 Too low! Try again.');
            } else {
                msg.reply('📈 Too high! Try again.');
            }
        });

        collector.on('end', (collected) => {
            if (!collected.size || !collected.some(msg => parseInt(msg.content, 10) === targetNumber)) {
                interaction.followUp(`⏳ Time’s up! The correct number was **${targetNumber}**.`);
            }
        });
    }
};