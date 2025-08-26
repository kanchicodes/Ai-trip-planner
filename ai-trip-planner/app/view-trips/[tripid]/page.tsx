'use client'
import Itinerary from '@/app/_components/Itinerary';
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';
import { useTripDetail, useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TripInfo } from '@/app/create-new-trip/_components/ChatBox';

function ViewTrip() {

    const { tripid } = useParams();
    const { userDetail, setUserDetail } = useUserDetail();
    const convex = useConvex();
    const [tripData, setTripData] = useState<Trip>();
    //@ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    useEffect(() => {
        userDetail && GetTrip();
    }, [userDetail])

    const GetTrip = async () => {
        const result = await convex.query(api.tripDetail.GetTripById, {
            uid: userDetail?._id,
            tripid: tripid + ''
        })

        console.log(result)
        setTripData(result)
        setUserDetailInfo(result?.tripDetail)

    }
    return (
        <div className='grid grid-cols-5'>
            <div className='col-span-3'>
                <Itinerary />
            </div>
            <div className='col-span-2'>
                <GlobalMap />
            </div>
        </div>
    )
}
export default ViewTrip;
//