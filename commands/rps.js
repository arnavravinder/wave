const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play rock-paper-scissors')
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('Rock, Paper, or Scissors')
                .setRequired(true)
        ),
    async execute(interaction) {
        const choices = ['rock', 'paper', 'scissors'];
        const userChoice = interaction.options.getString('choice').toLowerCase();
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        if (!choices.includes(userChoice)) {
            return interaction.reply('Please choose rock, paper, or scissors.');
        }

        if (userChoice === botChoice) {
            return interaction.reply(`It's a tie! We both chose ${botChoice}.`);
        }

        const win = (userChoice === 'rock' && botChoice === 'scissors') ||
                    (userChoice === 'paper' && botChoice === 'rock') ||
                    (userChoice === 'scissors' && botChoice === 'paper');

        await interaction.reply(win ? `You win! I chose ${botChoice}.` : `You lose! I chose ${botChoice}.`);
    }
};
