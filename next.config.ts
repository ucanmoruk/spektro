import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 15.5.x (webpack) sunucu tarafında async chunk'ları `require("./<id>.js")`
  // ile çözerken "page data" toplama aşamasında modül bulunamadığı için build kırılıyor.
  // Sunucu bundle'larında chunk bölmeyi kapatarak modülleri kendi kendine yeterli yapıyoruz.
  webpack: (config, { isServer, dev }) => {
    // Yalnızca üretim (production) build'inde sunucu chunk bölmesini kapat.
    // Dev'de dokunmuyoruz; aksi halde HMR runtime "reading 'call'" hatası verebiliyor.
    if (isServer && !dev && config.optimization) {
      config.optimization.splitChunks = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.knauer.net",
        pathname: "/web/**",
      },
      {
        protocol: "https",
        hostname: "sielc.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "www.spektrotek.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
