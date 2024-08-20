const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

// todo add more words
const wordDatabase = {
    animals: ['elephant', 'tiger', 'giraffe', 'kangaroo', 'penguin'],
    fruits: ['apple', 'banana', 'cherry', 'orange', 'grape'],
    countries: ['canada', 'brazil', 'germany', 'india', 'japan'],
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hangman')
        .setDescription('Play a game of hangman(limited words for now sorry :/)')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Choose a word category')
                .setRequired(true)
                .addChoices(
                    { name: 'Animals', value: 'animals' },
                    { name: 'Fruits', value: 'fruits' },
                    { name: 'Countries', value: 'countries' }
                )
        )
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Choose game mode')
                .setRequired(true)
                .addChoices(
                    { name: 'Player vs Computer', value: 'computer' },
                    { name: 'Player vs Player', value: 'player' }
                )
        ),
    async execute(interaction) {
        const category = interaction.options.getString('category');
        const mode = interaction.options.getString('mode');
        let wordToGuess = wordDatabase[category][Math.floor(Math.random() * wordDatabase[category].length)];
        let guessedWord = '_'.repeat(wordToGuess.length).split('');
        let attemptsLeft = 6;
        let guessedLetters = [];
        let currentPlayer = interaction.user.id;
        let otherPlayer = null;

        if (mode === 'player') {
            await interaction.reply('👥 **Player 1**, mention **Player 2** to start!');
            const filter = (msg) => msg.mentions.users.first() && msg.author.id === interaction.user.id;
            const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 30000 });
            if (collected.size) {
                otherPlayer = collected.first().mentions.users.first().id;
                wordToGuess = await collected.first().reply('🔤 **Player 1**, please send the word to guess in a DM to me.').then(async () => {
                    await collected.first().author.send('Please reply with the word to guess:');
                    const dmCollected = await collected.first().author.dmChannel.awaitMessages({ max: 1, time: 30000 });
                    return dmCollected.first().content.toLowerCase();
                });
            }
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('guess').setLabel('Guess a Letter').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('end').setLabel('End Game').setStyle(ButtonStyle.Danger)
        );

        const gameMessage = await interaction.reply({
            content: `🎮 **Hangman**\n\n${guessedWord.join(' ')}\n\nAttempts left: ${attemptsLeft} (Category: **${category}**)`,
            components: [row],
            fetchReply: true,
        });

        const collector = gameMessage.createMessageComponentCollector({ componentType: ComponentType.Button });

        collector.on('collect', async (buttonInteraction) => {
            if (buttonInteraction.customId === 'end') {
                collector.stop();
                return buttonInteraction.reply({ content: '🚫 Game ended.', ephemeral: true });
            }

            if (buttonInteraction.user.id !== currentPlayer && buttonInteraction.user.id !== otherPlayer) {
                return buttonInteraction.reply({ content: '🚫 It’s not your turn!', ephemeral: true });
            }

            if (buttonInteraction.customId === 'guess') {
                const guessMsg = await buttonInteraction.reply({ content: '🔤 Please type your guess:', ephemeral: true });
                const filter = (msg) => msg.author.id === buttonInteraction.user.id;
                const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 15000 });

                if (collected.size) {
                    const guess = collected.first().content.toLowerCase();
                    if (guess.length !== 1 || guessedLetters.includes(guess)) {
                        return buttonInteraction.followUp({ content: '❌ Invalid guess! Guess a single letter that hasn’t been guessed yet.', ephemeral: true });
                    }

                    guessedLetters.push(guess);

                    if (wordToGuess.includes(guess)) {
                        for (let i = 0; i < wordToGuess.length; i++) {
                            if (wordToGuess[i] === guess) guessedWord[i] = guess;
                        }
                    } else {
                        attemptsLeft--;
                    }

                    if (guessedWord.join('') === wordToGuess) {
                        collector.stop();
                        return buttonInteraction.followUp({ content: `🎉 You guessed the word! **${wordToGuess}**`, ephemeral: false });
                    }

                    if (attemptsLeft === 0) {
                        collector.stop();
                        return buttonInteraction.followUp({ content: `💀 You’ve run out of attempts! The word was **${wordToGuess}**`, ephemeral: false });
                    }

                    currentPlayer = currentPlayer === interaction.user.id ? otherPlayer : interaction.user.id;
                    await gameMessage.edit({
                        content: `🎮 **Hangman**\n\n${guessedWord.join(' ')}\n\nAttempts left: ${attemptsLeft} (Category: **${category}**)`,
                        components: [row],
                    });
                }
            }
        });
    }
};
