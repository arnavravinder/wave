const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionroles')
        .setDescription('Set up reaction roles')
        .addRoleOption(option =>
            option.setName('role1')
                .setDescription('First role for the reaction')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role2')
                .setDescription('Second role for the reaction')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Description for the reaction roles message')
                .setRequired(false)
        ),
    async execute(interaction) {
        const role1 = interaction.options.getRole('role1');
        const role2 = interaction.options.getRole('role2');
        const description = interaction.options.getString('description') || 'Select a role below:';

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('reaction_roles')
                .setPlaceholder('Choose a role')
                .addOptions([
                    {
                        label: role1.name,
                        value: role1.id,
                        emoji: '1️⃣',
                    },
                    {
                        label: role2.name,
                        value: role2.id,
                        emoji: '2️⃣',
                    }
                ])
        );

        await interaction.reply({
            content: description,
            components: [row],
            ephemeral: false
        });
    }
};