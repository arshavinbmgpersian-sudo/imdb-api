export default {
  async fetch(request) {
    const url = new URL(request.url);

    const path = url.pathname
      .replace(/^\/+/, "")
      .replace(/\/+$/, "")
      .toLowerCase();

    const fileDatabase = {
      "hotd/s01e01": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "HOTD.S01E01.mkv"
      },

      "series/x-men-97/s02e07/480p/web-dl/softsub/seriexdl/mkv": {
        source: "https://vip-dl1.myalphadl.com/SvVHaHfUJOFKl4omwcBQnQ/X-Men.97.S02E07.480p.WEB-DL.SoftSub.mkv",
        downloadName: "X-Men.97.S02E07.480p.WEB-DL.SoftSub.SeriexDL.mkv"
      },

      "x-men.97.s02e07.480p.web-dl.softsub.seriexdl.mkv": {
        source: "https://vip-dl1.myalphadl.com/SvVHaHfUJOFKl4omwcBQnQ/X-Men.97.S02E07.480p.WEB-DL.SoftSub.mkv",
        downloadName: "X-Men.97.S02E07.480p.WEB-DL.SoftSub.SeriexDL.mkv"
      },

      "cape.fear/s01e01": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
      },

      "cape.fear.s01e01.480p.softsub.seriexdl.mkv": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
      }
    };

    const fileInfo = fileDatabase[path];

    if (!fileInfo) {
      return new Response("File not found!", {
        status: 404
      });
    }

    try {
      const upstream = await fetch(fileInfo.source, {
        method: "GET",
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      if (!upstream.ok) {
        return new Response(`Upstream Error: ${upstream.status}`, {
          status: upstream.status
        });
      }

      const headers = new Headers();

      headers.set(
        "Content-Disposition",
        `attachment; filename="${fileInfo.downloadName}"`
      );

      headers.set(
        "Content-Type",
        upstream.headers.get("Content-Type") ||
          "application/octet-stream"
      );

      const contentLength = upstream.headers.get("Content-Length");
      if (contentLength) {
        headers.set("Content-Length", contentLength);
      }

      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Cache-Control", "public, max-age=3600");

      return new Response(upstream.body, {
        status: 200,
        headers
      });

    } catch (err) {
      return new Response(`Download failed: ${err.message}`, {
        status: 500
      });
    }
  }
};
