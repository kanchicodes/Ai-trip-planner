import { suggestions } from '@/app/_components/suggestions';
import React from 'react'

function EmptyBoxState({ onSelectOption }: any) {
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-3xl text-center'>Start planning new<strong className='text-primary'>Trip</strong> using AI</h2>

            <p className='text-center text-gray-400 mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia possimus assumenda magnam rerum ducimus, omnis quo mollitia officiis esse excepturi repellat expedita aliquam.</p>

            <div className='flex flex-col gap-5 mt-7'>
                {suggestions.map((suggestion, index) => (
                    <div key={index}
                        onClick={() => onSelectOption(suggestion.title)}
                        className='flex items-center gap-2 p-3 border rounded-xl cursur-pointer hover:border-primary hover:text-primary transition-all'>
                        {suggestion.icon}
                        <h2 className='text-lg'>{suggestion.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmptyBoxState;