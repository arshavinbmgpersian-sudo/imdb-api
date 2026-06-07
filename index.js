export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+/, "").toLowerCase();

    const fileDatabase = {
      "hotd/s01e01": {
        source: "https://abrehamrahi.ir/o/public/cvgOVJ0C/",
        downloadName: "HOTD.S01E01.mkv"
      },

      "hotd/s01e02": {
        source: "https://abrehamrahi.ir/o/public/FiJiU0WL/",
        downloadName: "HOTD.S01E02.mkv"
      }
    };

    const fileInfo = fileDatabase[path];

    if (!fileInfo) {
      return new Response("Error 404 - File Not Found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      });
    }

    try {
      const upstream = await fetch(fileInfo.source, {
        redirect: "follow"
      });

      if (!upstream.ok) {
        return new Response("Error 404 - File Not Found", {
          status: upstream.status
        });
      }

      const headers = new Headers();

headers.set(
  "Content-Disposition",
  `attachment; filename="${fileInfo.downloadName}"`
);

headers.set("Content-Type", "application/octet-stream");
headers.set("Content-Length", upstream.headers.get("Content-Length") || "");
headers.set("X-Content-Type-Options", "nosniff");
      return new Response(upstream.body, {
        status: 200,
        headers
      });

    } catch (err) {
      return new Response("Please Disconnect Vpn!", {
        status: 500
      });
    }
  }
};
