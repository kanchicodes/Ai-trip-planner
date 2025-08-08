import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowDown, Globe, Globe2, Landmark, Plane, Send } from 'lucide-react';
import React from 'react'

const suggestions = [
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

]

function Hero() {
    return (
        <div className='mt-24 w-full flex flex-col items-center'>
            {/* Content */}
            <div className='max-w-3xl w-full text-center space-y-6'>
                <h1 className='text-4xl md:text-5xl font-bold'>Hey,I'm your personal<span className='text-primary'>Trip planner</span></h1>
                <p className='text-lg'>Tell me what you want, and I'll handle the rest:Flights, Hotels, trip planner - all in seconds</p>

                <div>
                    {/* input box */}
                    <div className='relative border rounded-2xl p-4'>
                        <Textarea placeholder='Create a trip for Paris from New York'
                            className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                        />
                        <Button size={'icon'} className='absolute bottom-6 right-6'>
                            <Send className='w-4 h-4' />
                        </Button>
                    </div>
                </div>

                {/* suggestion list */}
                <div className='flex gap-5'>
                    {suggestions.map((suggestions, index) => (
                        <div key={index} className='flex items-center gap-2 p-2 border rounded-full cursur-pointer hover:bg-primary hover:text-white transition-all'>
                            {suggestions.icon}
                            <h2 className='text-sm'>{suggestions.title}</h2>
                        </div>))}
                        </div>

                    <div className='flex items-center justify-center flex-col'>
                        <h2 className='my-7 mt-14 flex gap-2 items-center'>Not sure where to go?<strong>See how it works</strong><ArrowDown /></h2>
                    </div>

                    {/* video section */}
                </div>
                <HeroVideoDialog
                    className="block dark:hidden"
                    animationStyle="from-center"
                    videoSrc="https://www.example.com/dummy-video"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Dummy Video Thumbnail"
                />
            </div>
    
        
    )
}
export default Hero;

