import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://placapedia.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://placapedia.com/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://placapedia.com/login',
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 0.5,
        },
        {
            url: 'https://placapedia.com/register',
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 0.5,
        },
    ]
}