const { Events, MessageFlags, EmbedBuilder, Component, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (!interaction.isModalSubmit()) return;

	    if (interaction.customId === 'createquest') {
            if (isNaN(interaction.fields.getTextInputValue('quantityInput'))) {
                await interaction.reply({
                                content: "La quantité demandée n'est pas un nombre.",
                                flags: MessageFlags.Ephemeral
                            });
                return;
            }


            let difficultyColor = 0;
            switch (interaction.fields.getStringSelectValues('difficultySelect')[0]) {
                case "Facile": {
                    difficultyColor = 43520;
                    break;
                }
                case "Modéré": {
                    difficultyColor = 16755200;
                    break;
                }
                case "Difficile": {
                    difficultyColor = 11141120;
                    break;
                }
            }

            // Embed
            const questEmbed = new EmbedBuilder()
                .setColor(difficultyColor)
                .setTitle(interaction.fields.getStringSelectValues('difficultySelect')[0]+ " - " + interaction.fields.getTextInputValue('blockItemInput'))
                .addFields(
                    { name: 'Quantité donnée:', value: '0', inline: true},
                    { name: 'Quantité demandée:', value: (interaction.fields.getTextInputValue('quantityInput')).replace(/ /g, ''), inline: true},
                    { name: 'Quantité manquante:', value: (interaction.fields.getTextInputValue('quantityInput')).replace(/ /g, ''), inline: false},
                )
                .setThumbnail(interaction.fields.getTextInputValue('blockItemPictureInput'));
            

            // Button
            const add = new ButtonBuilder().setCustomId('add').setLabel('Ajouter blocs/items').setStyle(ButtonStyle.Primary);
            const row = new ActionRowBuilder().addComponents(add);
		    
            await interaction.reply({ embeds: [questEmbed], components: [row], withResponse: true });

            // Créer thread
            const message = await interaction.fetchReply();            
            await message.startThread({
                name: `${interaction.fields.getTextInputValue('blockItemInput')}`,
                autoArchiveDuration: 1440, // 24h
            });
	    }
    }
};