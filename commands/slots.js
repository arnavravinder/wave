const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Play a slot machine game'),
    async execute(interaction) {
        const emojis = ['🍒', '🍋', '🍊', '🍉', '🍇', '7️⃣', '💎'];
        const result = [];
        for (let i = 0; i < 3; i++) {
            result.push(emojis[Math.floor(Math.random() * emojis.length)]);
        }

        const won = result[0] === result[1] && result[1] === result[2];

        await interaction.reply(
            `🎰 **Slot Machine** 🎰\n` +
            `| ${result[0]} | ${result[1]} | ${result[2]} |\n\n` +
            (won ? '🎉 **Congratulations, you won!**' : '😢 **Better luck next time!**')
        );
    }
};