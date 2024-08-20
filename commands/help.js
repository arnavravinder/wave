const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the help menu'),
    async execute(interaction) {
        const categories = {
            moderation: [
                '🔨 /ban - Ban a user from the server',
                '👢 /kick - Kick a user from the server',
                '🔇 /mute - Mute a user',
                '🔊 /unmute - Unmute a user',
                '⚠️ /warn - Warn a user',
                '🧹 /clear - Clear messages in a channel',
                '🔒 /lock - Lock a channel',
                '🔓 /unlock - Unlock a channel',
                '🔁 /log - Enable or disable logging'
            ],
            music: [
                '🎶 /play - Play music',
                '⏸️ /pause - Pause the current track',
                '▶️ /resume - Resume a paused track',
                '⏭️ /skip - Skip the current track',
                '🔁 /loop - Toggle looping for the current track',
                '📜 /queue - View the current music queue',
                '🔀 /shuffle - Shuffle the music queue',
                '🧹 /clearqueue - Clear the entire music queue',
                '🔊 /volume - Adjust the bot’s volume',
                '📜 /lyrics - Get lyrics for the current track',
                '🎵 /nowplaying - Show the currently playing track'
            ],
            economy: [
                '💰 /balance - Check your balance',
                '🎁 /daily - Claim your daily reward',
                '🏆 /leaderboard - View the server leaderboard',
                '🎒 /inventory - View your inventory',
                '🎰 /slots - Play a slot machine game',
                '🎲 /gamble - Gamble your coins',
                '💸 /give - Give coins to another user',
                '🕵️‍♂️ /steal - Steal coins from another user'
            ],
            fun: [
                '🎱 /8ball - Ask the magic 8-ball a question',
                '😂 /meme - Get a random meme',
                '🔥 /roast - Roast a user',
                '✊ /rps - Play rock-paper-scissors',
                '🔢 /guessnumber - Guess the number game',
                '❓ /trivia - Play a trivia game',
                '✏️ /hangman - Play hangman',
                '❌⭕ /tictactoe - Play tic-tac-toe',
                '👋 /slap - Slap another user'
            ],
            utility: [
                'ℹ️ /info - Get bot/server info',
                '🖼️ /avatar - View a user’s avatar',
                '🏠 /serverinfo - View server information',
                '👥 /userinfo - View a user’s information',
                '⏰ /remind - Set a reminder',
                '📊 /poll - Create a poll',
                '💤 /afk - Set yourself as AFK',
                '🌐 /translate - Translate a message',
                '📚 /define - Get the definition of a word',
                '🔗 /invite - Get the bot invite link',
                '💡 /inspire - Get a random inspirational quote',
                '🐱 /catfact - Get a random cat fact',
                '🐶 /dogfact - Get a random dog fact',
                '😂 /dadjoke - Get a random dad joke',
                '🪙 /coin - Flip a virtual coin',
                '💪 /motivate - Get a motivational message',
                '🧠 /riddle - Receive a riddle to solve',
                '💡 /advice - Get random life advice',
                '📚 /urban - Look up a term in Urban Dictionary',
                '🧠 /fact - Get a random fact'
            ]
        };

        const buttons = [
            new ButtonBuilder().setCustomId('moderation').setLabel('Moderation').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('music').setLabel('Music').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('economy').setLabel('Economy').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('fun').setLabel('Fun').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('utility').setLabel('Utility').setStyle(ButtonStyle.Primary)
        ];

        const row = new ActionRowBuilder().addComponents(buttons);

        const initialMessage = await interaction.reply({
            content: 'Please choose a category to view commands:',
            components: [row],
            fetchReply: true
        });

        const filter = (i) => i.user.id === interaction.user.id;
        const collector = initialMessage.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (buttonInteraction) => {
            const category = buttonInteraction.customId;
            const commandsList = categories[category].join('\n');

            await buttonInteraction.update({
                content: `**${category.charAt(0).toUpperCase() + category.slice(1)} Commands:**\n${commandsList}`,
                components: [row]
            });
        });

        collector.on('end', () => {
            initialMessage.edit({ components: [] });
        });
    }
};