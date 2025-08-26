import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowBigRightIcon } from '@heroicons/react/24/solid'
import { Trip } from "../page"
import axios from 'axios'
import Link from 'next/link'
import { useTripDetail } from '@/app/provider'


type Props = {
    trip: Trip
}

function MyTripCardItem({ trip }: Props) {
    const [photoUrl, setPhotoUrl] = useState<string>();
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    useEffect(() => {
        trip && GetGooglePlaceDetail();
    }, [trip]);

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: trip?.tripDetail?.destination
        });
        if (result?.data?.e) {
            return;
        }
        setPhotoUrl(result?.data);
    }
    return (
        <Link href={`/view-trips/`+trip?.tripId} className='p-5 shadow rounded-2xl'>
            <Image src={photoUrl ? photoUrl : '/placeholder.png'}
                alt={trip.tripId} width={400} height={400}
                className='rounded-2xl object-cover w-full h-[270px]'
            />
            <h2 className='flex gap-2 font-semibold text-2xl mt-2'>{trip?.tripDetail?.destination}<ArrowBigRightIcon /> {trip?.tripDetail?.destination}</h2>
            <h2 className='mt-2 text-gray-500'>{trip?.tripDetail?.duration}Trip with{trip?.tripDetail?.budget}Budget</h2>
        </Link>
    )
}
export default MyTripCardItem;