const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('Play a game of tic-tac-toe')
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
        const mode = interaction.options.getString('mode');
        const board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
        let currentPlayer = interaction.user.id;
        let otherPlayer = mode === 'player' ? null : 'computer';

        if (mode === 'player') {
            await interaction.reply('👥 **Player 1**, mention **Player 2** to start!');
            const filter = (msg) => msg.mentions.users.first() && msg.author.id === interaction.user.id;
            const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 30000 });
            if (collected.size) {
                otherPlayer = collected.first().mentions.users.first().id;
            }
        }

        const getBoard = () => `
          ${board[0]} | ${board[1]} | ${board[2]}
          ${board[3]} | ${board[4]} | ${board[5]}
          ${board[6]} | ${board[7]} | ${board[8]}
        `;

        const checkWinner = (board) => {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                if (board[a] !== '-' && board[a] === board[b] && board[a] === board[c]) return board[a];
            }
            return board.includes('-') ? null : 'draw';
        };

        const buttons = [
            new ButtonBuilder().setCustomId('0').setLabel('-').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('1').setLabel('-').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('2').setLabel('-').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('3').setLabel('-').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('4').setLabel('-').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('5').setLabel('-').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('6').setLabel('-').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('7').setLabel('-').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('8').setLabel('-').setStyle(ButtonStyle.Secondary),
        ];

        const row1 = new ActionRowBuilder().addComponents(buttons.slice(0, 3));
        const row2 = new ActionRowBuilder().addComponents(buttons.slice(3, 6));
        const row3 = new ActionRowBuilder().addComponents(buttons.slice(6, 9));

        const gameMessage = await interaction.reply({
            content: `🎮 **Tic-Tac-Toe**\n\n${getBoard()}\n\n**${interaction.user.username}**'s turn (X)`,
            components: [row1, row2, row3],
            fetchReply: true,
        });

        const collector = gameMessage.createMessageComponentCollector({ componentType: ComponentType.Button });

        collector.on('collect', async (buttonInteraction) => {
            if (buttonInteraction.user.id !== currentPlayer) {
                return buttonInteraction.reply({ content: '🚫 It’s not your turn!', ephemeral: true });
            }

            const index = parseInt(buttonInteraction.customId, 10);
            if (board[index] !== '-') {
                return buttonInteraction.reply({ content: '🚫 This spot is already taken!', ephemeral: true });
            }

            board[index] = currentPlayer === interaction.user.id ? 'X' : 'O';
            buttons[index].setLabel(board[index]).setStyle(ButtonStyle.Primary).setDisabled(true);

            const winner = checkWinner(board);

            if (winner) {
                collector.stop();
                const result = winner === 'draw' ? 'It’s a draw!' : `🎉 **${winner}** wins!`;
                await interaction.editReply({
                    content: `🎮 **Tic-Tac-Toe**\n\n${getBoard()}\n\n${result}`,
                    components: [],
                });
            } else {
                currentPlayer = currentPlayer === interaction.user.id ? otherPlayer : interaction.user.id;
                await interaction.editReply({
                    content: `🎮 **Tic-Tac-Toe**\n\n${getBoard()}\n\n**${currentPlayer === interaction.user.id ? interaction.user.username : buttonInteraction.user.username}**'s turn (${currentPlayer === interaction.user.id ? 'X' : 'O'})`,
                    components: [row1, row2, row3],
                });
            }
        });
    }
};