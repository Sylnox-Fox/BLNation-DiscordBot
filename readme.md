Petit Bot discord pour les nations de badlands ^^
en dépendance il faut node.js, npm et discord.js (`npm install discord.js`)
Il faudra créer un fichier config.json ressemblant à ceci:
```json
{
    "token": "[BotToken]",
    "clientId": "[BotApplicationID]",
	"guildId": "[ServerID]"
}
```

puis faire les commandes `node deploy-commands.js` puis `node index.js`

et voilà, une commande a été créer dans votre serveur (/creerquete) et vous pouvez entrer la difficulté de la quête, le nom du bloc, la quantité demandée et une image du bloc en question (oui il faut que je vois pour automatisé ça ^^")

Si jamais vous avez des suggestions, envoyer moi un mp sur discord `sylnox_` :3