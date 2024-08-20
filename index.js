const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { updateInvitesCache, checkInviter } = require('./utils/inviteTracker');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const inviteTrackerSettings = new Map();
const logSettings = new Map();

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.guilds.cache.forEach(guild => {
        updateInvitesCache(guild);
    });
});

client.on('guildMemberAdd', async (member) => {
    const settings = inviteTrackerSettings.get(member.guild.id);
    if (settings && settings.enabled) {
        const inviter = await checkInviter(member);
        const channel = member.guild.channels.cache.get(settings.channelId);

        if (inviter && channel) {
            channel.send(`👋 Welcome **${member.user.username}**! Invited by **${inviter.tag}**.`);
        } else {
            channel.send(`👋 Welcome **${member.user.username}**!`);
        }

        updateInvitesCache(member.guild); 
    }

    const logChannel = logSettings.get(member.guild.id)?.channelId;
    if (logChannel) {
        member.guild.channels.cache.get(logChannel)?.send(`✅ **${member.user.tag}** joined the server.`);
    }
});

client.on('guildMemberRemove', async (member) => {
    const logChannel = logSettings.get(member.guild.id)?.channelId;
    if (logChannel) {
        member.guild.channels.cache.get(logChannel)?.send(`🚫 **${member.user.tag}** was kicked or left the server.`);
    }
});

client.on('guildBanAdd', async (ban) => {
    const logChannel = logSettings.get(ban.guild.id)?.channelId;
    if (logChannel) {
        ban.guild.channels.cache.get(logChannel)?.send(`🔨 **${ban.user.tag}** was banned from the server.`);
    }
});

client.on('guildBanRemove', async (ban) => {
    const logChannel = logSettings.get(ban.guild.id)?.channelId;
    if (logChannel) {
        ban.guild.channels.cache.get(logChannel)?.send(`⚖️ **${ban.user.tag}** was unbanned from the server.`);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'reaction_roles') {
        const selectedRole = interaction.values[0];
        const role = interaction.guild.roles.cache.get(selectedRole);

        if (interaction.member.roles.cache.has(role.id)) {
            await interaction.member.roles.remove(role);
            await interaction.reply({ content: `❌ Removed the **${role.name}** role.`, ephemeral: true });
        } else {
            await interaction.member.roles.add(role);
            await interaction.reply({ content: `✅ Added the **${role.name}** role.`, ephemeral: true });
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login('TOKEN');