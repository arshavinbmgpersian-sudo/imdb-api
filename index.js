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

      "Series/X-Men.97.S02E07.480p.WEB-DL.SoftSub.SeriexDL.mkv": {
        source: "https://vip-dl1.myalphadl.com/SvVHaHfUJOFKl4omwcBQnQ/X-Men.97.S02E07.480p.WEB-DL.SoftSub.mkvhttps://vip-dl1.myalphadl.com/SvVHaHfUJOFKl4omwcBQnQ/X-Men.97.S02E07.480p.WEB-DL.SoftSub.mkv",
        downloadName: "X-Men.97.S02E07.480p.WEB-DL.SoftSub.SeriexDL.mkv"
      },

      "cape.fear.s01e01.480p.softsub.seriexdl.mkv": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
      },
      
            "cape.fear.s01e01.480p.softsub.seriexdl.mkv": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
            },

            "cape.fear.s01e01.480p.softsub.seriexdl.mkv": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
            },

            "cape.fear.s01e01.480p.softsub.seriexdl.mkv": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
      },

            "cape.fear.s01e01.480p.softsub.seriexdl.mkv": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
      },

           "cape.fear.s01e01.480p.softsub.seriexdl.mkv": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
      },

            "cape.fear.s01e01.480p.softsub.seriexdl.mkv": {
        source: "https://abrehamrahi.ir/o/public/5VjfDkSO/",
        downloadName: "Cape.Fear.S01E01.mkv"
            },

      "cape.fear/s01e01": {
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
        redirect: "follow"
      });

      if (!upstream.ok) {
        return new Response(
          `Upstream error: ${upstream.status}`,
          { status: upstream.status }
        );
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

      headers.set(
        "Content-Length",
        upstream.headers.get("Content-Length") || ""
      );

      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Cache-Control", "public, max-age=3600");

      return new Response(upstream.body, {
        status: 200,
        headers
      });

    } catch (error) {
      return new Response(
        `Download failed: ${error.message}`,
        { status: 500 }
      );
    }
  }
};
