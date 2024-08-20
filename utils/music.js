const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const { Collection } = require('discord.js');
const ytdl = require('ytdl-core');
const queue = new Collection();

function playMusic(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.connection.destroy();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly' });
    const resource = createAudioResource(stream);
    serverQueue.player.play(resource);

    serverQueue.player.on(AudioPlayerStatus.Idle, () => {
        if (!serverQueue.loop) {
            serverQueue.songs.shift();
        }
        playMusic(guild, serverQueue.songs[0]);
    });

    serverQueue.player.on(AudioPlayerStatus.Playing, () => {
        serverQueue.textChannel.send(`🎶 Now playing: **${song.title}**`);
    });
}

async function execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) return interaction.reply('❌ You need to be in a voice channel to play music!');
    
    const permissions = voiceChannel.permissionsFor(interaction.client.user);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
        return interaction.reply('⚠️ I need permissions to join and speak in your voice channel!');
    }

    const songInfo = await ytdl.getInfo(interaction.options.getString('song'));
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        duration: songInfo.videoDetails.lengthSeconds,
        requestedBy: interaction.user.username,
    };

    const serverQueue = queue.get(interaction.guild.id);

    if (!serverQueue) {
        const queueContruct = {
            textChannel: interaction.channel,
            voiceChannel,
            player: createAudioPlayer(),
            connection: joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            }),
            songs: [],
            loop: false,
        };

        queue.set(interaction.guild.id, queueContruct);
        queueContruct.songs.push(song);
        playMusic(interaction.guild, queueContruct.songs[0]);

        interaction.reply(`🎶 Now playing: **${song.title}**`);
    } else {
        serverQueue.songs.push(song);
        interaction.reply(`✅ **${song.title}** has been added to the queue!`);
    }
}

function stop(interaction) {
    const serverQueue = queue.get(interaction.guild.id);
    if (!serverQueue) return interaction.reply('❌ There is no song to stop!');
    serverQueue.songs = [];
    serverQueue.player.stop();
    interaction.reply('⏹️ Music stopped.');
}

function skip(interaction) {
    const serverQueue = queue.get(interaction.guild.id);
    if (!serverQueue) return interaction.reply('❌ There is no song to skip!');
    serverQueue.player.stop();
    interaction.reply('⏭️ Skipped the current track.');
}

function toggleLoop(interaction) {
    const serverQueue = queue.get(interaction.guild.id);
    if (!serverQueue) return interaction.reply('❌ No track is currently playing.');
    serverQueue.loop = !serverQueue.loop;
    interaction.reply(serverQueue.loop ? '🔁 Looping enabled for the current track.' : '🔁 Looping disabled.');
}

function showQueue(interaction) {
    const serverQueue = queue.get(interaction.guild.id);
    if (!serverQueue || serverQueue.songs.length === 0) {
        return interaction.reply('❌ The music queue is empty.');
    }

    const queueMessage = serverQueue.songs
        .map((song, index) => `${index + 1}. **${song.title}** (${formatDuration(song.duration)}) - Requested by ${song.requestedBy}`)
        .join('\n');

    interaction.reply(`🎶 **Current Music Queue:**\n${queueMessage}`);
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

module.exports = {
    execute,
    stop,
    skip,
    toggleLoop,
    showQueue,
};
