import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'MekonBot - Governance for Humanoid Robotics',
        short_name: 'MekonBot',
        description: 'Independent certification authority and policy enforcement infrastructure for humanoid robotics.',
        start_url: '/',
        display: 'standalone',
        background_color: '#2d3b80',
        theme_color: '#2d3b80',
        icons: [
            {
                src: '/logo-i.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/logo-i.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
