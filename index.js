export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+/, "").toLowerCase();

    const fileDatabase = {
      "hotd/s01e01": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "HOTD.E01.mkv"
      },
      "hotd/s01e02": {
        source: "https://abrehamrahi.ir/o/public/FiJiU0WL/",
        downloadName: "HOTD.S01E02.mkv"
      },
      "cape.fear/s01e01": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "HOTD.S01E04.mkv"
      }
    };

    const fileInfo = fileDatabase[path];

    if (!fileInfo) {
      return new Response("File not found!", { status: 404 });
    }

    try {
      const upstream = await fetch(fileInfo.source, {
        redirect: "follow"
      });

      if (!upstream.ok) {
        return new Response("Error fetching file", { status: upstream.status });
      }

      const headers = new Headers(upstream.headers);

      // مهم‌ترین بخش برای دانلود مستقیم
      headers.set(
        "Content-Disposition",
        `attachment; filename="${fileInfo.downloadName}"`
      );

      // جلوگیری از رفتار preview
      headers.set("Content-Type", "application/octet-stream");

      // امنیت + جلوگیری از مشکلات CORS
      headers.set("Access-Control-Allow-Origin", "*");

      return new Response(upstream.body, {
        status: 200,
        headers
      });

    } catch (err) {
      return new Response("Download failed", { status: 500 });
    }
  }
};
