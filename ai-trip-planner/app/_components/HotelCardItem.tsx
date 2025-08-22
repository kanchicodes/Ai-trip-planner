"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hotel } from '../create-new-trip/_components/ChatBox';
import { Star, Wallet } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
    hotel: Hotel
}
function HotelCardItem({ hotel }: Props) {

    const [photoUrl, setPhotoUrl] = useState<string>();

    useEffect(() => {
        hotel && GetGooglePlaceDetail();
    }, [hotel]);

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: hotel?.hotel_name
        });
        if (result?.data?.e) {
            return;
        }
        setPhotoUrl(result?.data);
    }
    return (
        <div className='flex flex-col gap-1'>
            <Image
                src={photoUrl ? photoUrl : '/pl.webp'}
                alt={hotel?.hotel_name || 'Hotel Image'}
                // alt='place-image' width={400} height={200}
                fill
                className='rounded-xl shadow object-cover mb-2'
            />

            <h2 className='text-lg font-semibold'>{hotel?.hotel_name}</h2>
            <h2 className='text-gray-500'>{hotel?.hotel_address}</h2>
            <div className='flex justify-between items-center'>
                <p className='flex gap-2 text-green-600'><Wallet />{hotel?.price_per_night}</p>
                <p className='flex gap-2 text-yellow-500'><Star />{hotel?.rating}</p>
            </div>
            <Link href={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name} target='_blank'>
                <Button variant={'outline'} className='mt-1 w-full'>View</Button>
            </Link>
            {/* <p className='text-gray-500 line-clamp-2'>{hotel?.description}</p> */}
        </div>
    )
}
export default HotelCardItem;