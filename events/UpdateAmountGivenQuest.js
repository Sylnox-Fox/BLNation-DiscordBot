const { Events, EmbedBuilder, ActionRowBuilder, MessageFlags } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId !== 'addBlockItem') return;
        if (isNaN(interaction.fields.getTextInputValue('blockItemGiven'))) {
            await interaction.reply({
                            content: "La quantité donnée     n'est pas un nombre.",
                            flags: MessageFlags.Ephemeral
                        });
            return;
        }

        const message = interaction.message;
        const questEmbed = EmbedBuilder.from(message.embeds[0]);

        let totalAdded = parseInt((interaction.fields.getTextInputValue('blockItemGiven').replace(/ /g, '')));
        const amountNeeded = parseInt((questEmbed.data.fields[1].value).replace(/ /g, ''));
        let doneQuest = false;
        if (totalAdded >= amountNeeded) {
            totalAdded = amountNeeded;
            doneQuest = true;
        }

        const amountAdded = totalAdded - questEmbed.data.fields[0].value;

        if (amountAdded < 1) {
            await interaction.reply({
                content: "Quantité donnée inférieur ou égale à la quantité déjà mise",
                flags: MessageFlags.Ephemeral
            });
        }
        else {
            questEmbed.data.fields[0].value = totalAdded;
            questEmbed.data.fields[2].value = amountNeeded - totalAdded;

            const thread = message.thread;
            if (thread) {
                await thread.send( `${interaction.user} a ajouté **${amountAdded}** blocs/items` );

                if (doneQuest) {
                    await thread.send( `La quête à été fini !` );
                }
            }

            
            await interaction.update({
                embeds: [questEmbed],
                components: doneQuest ? [] : message.components
            });
        }
        
    }
};