'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Activity } from '../create-new-trip/_components/ChatBox';

type Props = {
    activity: Activity
}

function PlaceCardItem({ activity }: Props) {

    const [photoUrl, setPhotoUrl] = useState<string>();

    useEffect(() => {
        activity && GetGooglePlaceDetail();
    }, [activity]);

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: activity?.place_name + ': ' + activity?.place_address
        });
        if (result?.data?.e) {
            return;
        }
        setPhotoUrl(result?.data);
    }
    return (
        <div>
            <Image src={photoUrl ? photoUrl : '/pl.webp'}
                alt={activity.place_name}
                fill
                className='rounded-xl object-cover'
            />
            <h2 className='text-lg font-semibold'>{activity?.place_name}</h2>
            <p className='text-gray-500 line-clamp-2'>{activity?.place_details}</p>
            <h2 className='flex gap-2 text-blue-500 line-clamp-1'><Ticket />{activity?.ticket_pricing}</h2>
            <p className='flex gap-2 text-orange-400 line-clamp-1'><Clock />{activity?.best_time_to_visit}</p>
            <Link href={'https://www.google.com/maps/search/?api=1&query=' + activity?.place_name} target='_blank'>
                <Button size={'sm'} variant={'outline'} className='w-full mt-2'>View on Map<ExternalLink /></Button>
            </Link>

        </div>
    )
}
export default PlaceCardItem;