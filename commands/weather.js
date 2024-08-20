const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the weather for a location')
        .addStringOption(option =>
            option.setName('location')
                .setDescription('The location for which to get the weather')
                .setRequired(true)
        ),
    async execute(interaction) {
        const location = interaction.options.getString('location');
        const apiKey = process.env.WEATHER_API_KEY; 
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return interaction.reply('Could not find weather data for that location.');
        }

        await interaction.reply(
            `**Weather in ${data.name}**\n` +
            `Temperature: ${data.main.temp}°C\n` +
            `Weather: ${data.weather[0].description}\n` +
            `Humidity: ${data.main.humidity}%`
        );
    }
};
