const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roast')
        .setDescription('Roast a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to roast')
                .setRequired(true)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const roasts = [ //TODO ADD some ai thing here so it isnt the same
            "You're like a cloud. When you disappear, it’s a beautiful day.",
            "You're proof that even a broken clock is right twice a day.",
            "If laughter is the best medicine, your face must be curing the world.",
            "You're not stupid; you just have bad luck thinking.",
            "Your secrets are always safe with me. I never even listen when you tell me them."
        ];
        const roast = roasts[Math.floor(Math.random() * roasts.length)];
        await interaction.reply(`${target.username}, ${roast}`);
    }
};
