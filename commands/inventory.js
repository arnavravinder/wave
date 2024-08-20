const { SlashCommandBuilder } = require('discord.js');
const { getInventory } = require('../utils/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('View your inventory'),
    async execute(interaction) {
        const user = interaction.user;
        const inventory = await getInventory(user.id);
        let replyMessage = `🎒 **${user.username}'s Inventory**:\n`;
        inventory.forEach(item => {
            replyMessage += `- ${item}\n`;
        });
        await interaction.reply(replyMessage);
    }
};
