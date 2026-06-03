const { Events, LabelBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, FileUploadBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		if (interaction.commandName === 'creerquete') {
			const modal = new ModalBuilder().setCustomId('createquest').setTitle('Ajout d\'une quête de nation');

			// Difficulty of the quest
			const difficultySelect = new StringSelectMenuBuilder()
			.setCustomId('difficultySelect')
			.setPlaceholder('difficulté')
			.setRequired(true)
			.addOptions(
				// String select menu options
				new StringSelectMenuOptionBuilder()
					.setLabel('Facile')
					.setValue('Facile'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Modéré')
					.setValue('Modéré'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Difficile')
					.setValue('Difficile'),
			);

			const difficultySelectLabel = new LabelBuilder()
			.setLabel("Selectionnez la difficulté de la quête")
			.setStringSelectMenuComponent(difficultySelect);

			// Name of block/item of the quest
			const blockItemInput = new TextInputBuilder()
			.setCustomId('blockItemInput')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('Bloc d\'or / Gold Block, Poudre de Blaze / Blaze Powder');

			const blockItemLabel = new LabelBuilder()
			.setLabel('Bloc/Item de la quête')
			.setTextInputComponent(blockItemInput);

			// Quantity needed for the quest
			const quantityInput = new TextInputBuilder()
			.setCustomId('quantityInput')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('10000, 20000, ...');

			const quantityLabel = new LabelBuilder()
			.setLabel('Quantité demandé pour la quête')
			.setDescription('La quantité déjà déposé sera à mettre après')
			.setTextInputComponent(quantityInput);


			// Block / Item picture
			const blockItemPictureInput = new TextInputBuilder()
			.setCustomId('blockItemPictureInput')
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('https://minecraft.wiki/images/thumb/Fox_JE1_BE1.png/150px-Fox_JE1_BE1.png');

			const blockItemPictureLabel = new LabelBuilder()
			.setLabel('Lien d\'une image du bloc/item')
			.setDescription('le mieux est d\'aller sur minecraft.wiki')
			.setTextInputComponent(blockItemPictureInput);

			// Add label to the modal
			modal.addLabelComponents(difficultySelectLabel)
			.addLabelComponents(blockItemLabel)
			.addLabelComponents(quantityLabel)
			.addLabelComponents(blockItemPictureLabel);

			// Show modal to the user
			await interaction.showModal(modal);
		}
	}
};