const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Play a trivia game'),
    async execute(interaction) {
        const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        const data = await response.json();
        const question = data.results[0];
        const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

        let triviaMessage = `❓ **${question.question}**\n`;
        answers.forEach((answer, index) => {
            triviaMessage += `${index + 1}. ${answer}\n`;
        });

        await interaction.reply({ content: triviaMessage, fetchReply: true });

        const filter = (response) => response.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

        collector.on('collect', (msg) => {
            const userAnswer = parseInt(msg.content, 10);
            if (answers[userAnswer - 1] === question.correct_answer) {
                interaction.followUp(`🎉 Correct! The answer was: **${question.correct_answer}**`);
            } else {
                interaction.followUp(`❌ Incorrect. The correct answer was: **${question.correct_answer}**`);
            }
            collector.stop();
        });

        collector.on('end', (collected) => {
            if (!collected.size) {
                interaction.followUp('⏳ Time’s up! You didn’t answer in time.');
            }
        });
    }
};