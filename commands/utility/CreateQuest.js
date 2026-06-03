const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('creerquete').setDescription('Creation de quete de nation'),
	async execute(interaction) {
	},
};