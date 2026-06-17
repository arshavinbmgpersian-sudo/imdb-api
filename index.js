export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+/, "").toLowerCase();

    const fileDatabase = {
      "hotd.E01.mkv": {
        source: "https://abrehamrahi.ir/o/public/cvgOVJ0C/",
        downloadName: "HOTD.S01E01.mkv"
      },
      "hotd/s01e02": {
        source: "https://abrehamrahi.ir/o/public/FiJiU0WL/",
        downloadName: "HOTD.S01E02.mkv"
      },
      "hotd/s01e04": {
        source: "https://abrehamrahi.ir/o/public/FiJiU0WL/",
        downloadName: "HOTD.S01E04.mkv"
      }
    };

    const fileInfo = fileDatabase[path];

    if (!fileInfo) {
      return new Response("File not found!", { status: 404 });
    }

    try {
      const response = await fetch(fileInfo.source);

      if (!response.ok) {
        return new Response("Error: file not found.", { status: response.status });
      }

      return new Response(response.body, {
        status: 200,
        headers: {
          "Content-Type":
            response.headers.get("Content-Type") || "application/octet-stream",

          // مهم‌ترین بخش برای دانلود مستقیم
          "Content-Disposition": `attachment; filename="${fileInfo.downloadName}"`,

          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response("Download failed!", { status: 500 });
    }
  }
};
