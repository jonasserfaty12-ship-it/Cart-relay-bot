const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const TOKEN = process.env.BOT_TOKEN;

client.once("ready", () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot && message.embeds.length > 0 && message.embeds[0].title?.includes("Ticketmaster Cart")) {
    const embed = message.embeds[0];
    await message.channel.send({
      embeds: [embed],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 1,
              label: "Cart réservé",
              custom_id: "reserve_cart"
            }
          ]
        }
      ]
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "reserve_cart") {
    await interaction.reply({ content: `✅ ${interaction.user.username} a réservé ce cart !`, ephemeral: true });
    const owner = await client.users.fetch("TON_ID_DISCORD"); // Mets ton ID Discord ici
    owner.send(`ℹ️ ${interaction.user.tag} a cliqué sur "Cart réservé" dans le serveur ${interaction.guild.name}`);
  }
});

client.login(TOKEN);
