import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "anthropic-ai",
                disallow: "/",
            },
            {
                userAgent: "Bytespider",
                disallow: "/",
            },
            {
                userAgent: "Claude-Web",
                disallow: "/",
            },
            {
                userAgent: "CCbot",
                disallow: "/",
            },
            {
                userAgent: "FacebookBot",
                disallow: "/",
            },
            {
                userAgent: "GPTBot",
                disallow: "/",
            },
            {
                userAgent: "PiplBot",
                disallow: "/",
            },
        ],
        sitemap: `https://${process.env.NEXT_PUBLIC_HOST_URL}/sitemap.xml`,
    };
}
