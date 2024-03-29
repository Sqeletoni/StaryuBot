const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("shows info of the songs that is currently playing"),
    run: async ({ client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const song = queue.currentTrack

        await interaction.editReply({
            embeds: [new MessageEmbed()
                .setThumbnail(song.thumbnail)
                .setDescription(`currently playing [${song.title}](${song.url})\n\n` + bar)
            ],
        })
    },
}