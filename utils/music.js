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
        serverQueue.songs.shift();
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
        url: songInfo.videoDetails.video_url
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

module.exports = {
    execute,
    stop,
    skip,
};