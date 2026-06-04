const { Events, ModalBuilder, LabelBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isButton()) return;
        if (interaction.customId === 'add') {
            const modal = new ModalBuilder().setCustomId('addBlockItem').setTitle('Ajout de blocs/items');

            const blockItemGiven = new TextInputBuilder()
			.setCustomId('blockItemGiven')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('69420');

			const blockItemGivenLabel = new LabelBuilder()
			.setLabel('Quantité total donnée')
			.setTextInputComponent(blockItemGiven);

            modal.addLabelComponents(blockItemGivenLabel);

            await interaction.showModal(modal);
        }
	},
};