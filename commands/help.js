const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the help menu'),
    async execute(interaction) {
        await interaction.reply(
            `📋 **Wave Bot Commands**\n\n` +
            `**Moderation**\n` +
            `🔨 /ban - Ban a user from the server\n` +
            `👢 /kick - Kick a user from the server\n` +
            `🔇 /mute - Mute a user\n` +
            `🔊 /unmute - Unmute a user\n` +
            `📜 /log - Set up server logs\n` +
            `🕵️‍♂️ /steal - Steal coins from another user\n` +
            `⚠️ /warn - Warn a user\n` +
            `🧹 /clear - Clear messages in a channel\n` +
            `🔒 /lock - Lock a channel\n` +
            `🔓 /unlock - Unlock a channel\n\n` +

            `**Music**\n` +
            `🎶 /play - Play music\n` +
            `⏹️ /stop - Stop the music\n` +
            `⏭️ /skip - Skip the current track\n` +
            `⏸️ /pause - Pause the current track\n` +
            `▶️ /resume - Resume a paused track\n` +
            `📜 /queue - View the current music queue\n` +
            `🔁 /loop - Toggle looping for the current track\n` +
            `❌ /remove - Remove a specific track from the queue\n` +
            `🔀 /shuffle - Shuffle the music queue\n` +
            `🔊 /volume - Adjust the bot’s volume\n` +
            `📜 /lyrics - Get lyrics for the current track\n` +
            `🎵 /nowplaying - Show the currently playing track\n` +
            `🧹 /clearqueue - Clear the entire music queue\n\n` +

            `**Economy/Fun**\n` +
            `💰 /balance - Check your balance\n` +
            `🎁 /daily - Claim your daily reward\n` +
            `🏆 /leaderboard - View the server leaderboard\n` +
            `🎒 /inventory - View your inventory\n` +
            `🕵️‍♂️ /steal - Steal coins from another user\n` +
            `🎲 /gamble - Gamble your coins\n` +
            `💸 /give - Give coins to another user\n` +
            `🎰 /slots - Play a slot machine game\n` +
            `🎲 /roll - Roll a dice\n` +
            `🪙 /coinflip - Flip a coin\n` +
            `🎯 /pick - Randomly pick an option\n` +
            `✊ /rps - Play rock-paper-scissors\n\n` +

            `**Utility**\n` +
            `💡 /suggest - Make a suggestion\n` +
            `👤 /profile - View your profile\n` +
            `ℹ️ /info - Get bot/server info\n` +
            `🖼️ /avatar - View a user’s avatar\n` +
            `🏠 /serverinfo - View server information\n` +
            `👥 /userinfo - View a user’s information\n` +
            `⏰ /remind - Set a reminder\n` +
            `📊 /poll - Create a poll\n` +
            `💤 /afk - Set yourself as AFK\n\n` +

            `**Fun/Games**\n` +
            `🎱 /8ball - Ask the magic 8-ball a question\n` +
            `😂 /meme - Get a random meme\n` +
            `🔥 /roast - Roast a user\n` +
            `🔢 /guessnumber - Guess the number game\n` +
            `❓ /trivia - Play a trivia game\n` +
            `✏️ /hangman - Play hangman\n` +
            `❌⭕ /tictactoe - Play tic-tac-toe\n\n` +

            `**Other**\n` +
            `💬 /quote - Get an inspirational quote\n` +
            `🌦️ /weather - Get the weather for a location\n` +
            `🌐 /translate - Translate a message\n` +
            `📚 /define - Get the definition of a word\n`
        );
    }
};