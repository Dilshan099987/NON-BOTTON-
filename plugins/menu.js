const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "Show bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        const desc = `
╭───「 𝗛𝗔𝗦𝗜𝗡𝗗𝗨-𝗠𝗗 」───❍
│👤 ʜᴇʟʟᴏ : *${pushname}*
│⏱️ ʀᴜɴᴛɪᴍᴇ : *${runtime(process.uptime())}*
│📦 ᴍᴏᴅᴇ : *${config.MODE}*
│💠 ᴘʀᴇғɪx : *${config.PREFIX}*
│💾 ʀᴀᴍ : *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem() / 1024 / 1024)}MB*
│🛠️ ᴠᴇʀsɪᴏɴ : *1.0.0*
╰───────────────❍

*📍 Please choose a menu option 👇*
`;

        const buttons = [
            { buttonId: 'menu_owner', buttonText: { displayText: '👑 Owner Menu' }, type: 1 },
            { buttonId: 'menu_convert', buttonText: { displayText: '🔄 Convert Menu' }, type: 1 },
            { buttonId: 'menu_ai', buttonText: { displayText: '🤖 AI Menu' }, type: 1 },
            { buttonId: 'menu_search', buttonText: { displayText: '🔍 Search Menu' }, type: 1 },
            { buttonId: 'menu_download', buttonText: { displayText: '📥 Download Menu' }, type: 1 },
            { buttonId: 'menu_main', buttonText: { displayText: '📜 Main Menu' }, type: 1 },
            { buttonId: 'menu_group', buttonText: { displayText: '👥 Group Menu' }, type: 1 },
            { buttonId: 'menu_other', buttonText: { displayText: '🧿 Other Menu' }, type: 1 }
        ];

        const buttonMessage = {
            image: { url: "https://files.catbox.moe/4l9cjf.jpg" },
            caption: desc,
            footer: `© 2025 Hasindu-MD ✨`,
            buttons: buttons,
            headerType: 4
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ Error: Could not load the menu.');
    }
});
