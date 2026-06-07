export default {
  async fetch(request) {
    const url = new URL(request.url);

    // حذف اسلش اول و تبدیل به حروف کوچک
    const path = url.pathname.replace(/^\/+/, "").toLowerCase();

    // دیتابیس فایل‌ها
    // همه کلیدها را با حروف کوچک بنویس
    const fileDatabase = {
      "hotd/s01e01": {
        source: "https://abrehamrahi.ir/o/public/cvgOVJ0C/",
        downloadName: "HOTD.S01E01.mkv"
      },

      "hotd/s01e02": {
        source: "https://abrehamrahi.ir/o/public/FiJiU0WL/",
        downloadName: "HOTD.S01E02.mkv"
      },

      "hotd/s01e03/480p/hardsub/seriexdl.mkv": {
        source: "https://example.com/episode3.mkv",
        downloadName: "HOTD.S01E03.480p.HardSub.mkv"
      }
    };

    // صفحه اصلی
    if (!path) {
      return new Response(
`Download Worker

نمونه لینک‌ها:

/hotd/s01e01
/hotd/s01e02`,
        {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      );
    }

    const fileInfo = fileDatabase[path];

    // فایل پیدا نشد
    if (!fileInfo) {
      return new Response(
`Error 404 - File Not Found`,
        {
          status: 404,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      );
    }

    try {
      const upstream = await fetch(fileInfo.source, {
        redirect: "follow"
      });

      if (!upstream.ok) {
        return new Response(
          `Source server returned ${upstream.status}`,
          {
            status: upstream.status,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          }
        );
      }

  

    } catch (err) {
      return new Response(
        `500 - Internal Error\n\n${err.message}`,
        {
          status: 500,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      );
    }
  }
};
