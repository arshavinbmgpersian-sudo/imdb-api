const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

// دیتابیس ساده (فعلاً داخل حافظه)
let movies = [
  {
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi",
    desc: "A team travels through a wormhole in space.",
    link: "https://example.com/interstellar"
  },
  {
    title: "Breaking Bad",
    year: "2008",
    genre: "Crime",
    desc: "A chemistry teacher becomes a drug dealer.",
    link: "https://example.com/breakingbad"
  }
];

let users = new Set();

// START
bot.start((ctx) => {
  users.add(ctx.from.id);

  return ctx.reply(
    `سلام ${ctx.from.first_name} 👋\nبه ربات فیلم خوش اومدی`,
    Markup.keyboard([
      ["🔍 جستجو فیلم"],
      ["📊 آمار"]
    ]).resize()
  );
});

// دکمه‌ها
bot.hears("📊 آمار", (ctx) => {
  ctx.reply(`👥 کاربران: ${users.size}\n🎬 فیلم‌ها: ${movies.length}`);
});

bot.hears("🔍 جستجو فیلم", (ctx) => {
  ctx.reply("اسم فیلم رو بفرست 🎬");
});

// جستجو
bot.on("text", async (ctx) => {
  const text = ctx.message.text.toLowerCase();

  const results = movies.filter((m) =>
    m.title.toLowerCase().includes(text)
  );

  if (results.length === 0) {
    return ctx.reply("❌ چیزی پیدا نشد");
  }

  for (const movie of results) {
    await ctx.reply(
      `🎬 ${movie.title}

📅 ${movie.year}
🎭 ${movie.genre}

📝 ${movie.desc}`,
      Markup.inlineKeyboard([
        Markup.button.url("⬇️ دانلود", movie.link)
      ])
    );
  }
});

// پنل ادمین ساده (افزودن فیلم)
bot.command("add", (ctx) => {
  const adminId = process.env.ADMIN_ID;

  if (ctx.from.id != adminId) {
    return ctx.reply("⛔ دسترسی نداری");
  }

  const data = ctx.message.text.split("|");

  if (data.length < 5) {
    return ctx.reply(
      "فرمت:\n/add title|year|genre|desc|link"
    );
  }

  movies.push({
    title: data[0].replace("/add ", ""),
    year: data[1],
    genre: data[2],
    desc: data[3],
    link: data[4]
  });

  ctx.reply("✅ اضافه شد");
});

bot.launch();

console.log("Bot is running...");
