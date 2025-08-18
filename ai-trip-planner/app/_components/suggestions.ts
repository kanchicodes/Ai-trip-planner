
import React from 'react';
import { Globe, Plane, Landmark, Globe2 } from 'lucide-react';

export const suggestions = [
    {
        title: "Create New Trip",
        icon: <Globe className='text-blue-400 w-5 h-5' />,
    },
    {
        title: "Inspire Me where to go",
        icon: <Plane className='text-green-500 w-5 h-5' />,
    },
    {
        title: "Discover hidden gems",
        icon: <Landmark className='text-orange-500 w-5 h-5' />,
    },
    {
        title: "Adventure destinations",
        icon: <Globe2 className='text-yellow-600 w-5 h-5' />,
    },
];
