import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spektrotek Laboratuvar Teknolojileri",
    short_name: "Spektrotek",
    description:
      "HPLC, preparatif HPLC, benchtop NMR, ozmometre, kromatografi kolonları ve laboratuvar sarf malzemeleri için Spektrotek.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0055A4",
    lang: "tr",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
