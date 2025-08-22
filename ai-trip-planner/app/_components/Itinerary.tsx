'use client'
import React, { useEffect, useState } from 'react'
import { Timeline } from "@/components/ui/timeline";
import Image from 'next/image';
import { ArrowLeft, Clock, ExternalLink, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '../provider';
import { TripInfo } from '../create-new-trip/_components/ChatBox';



// const TRIP_DATA = {
//     "destination": "Goa, India",
//     "duration": "2 Days",
//     "origin": "Lonavla, India",
//     "budget": "50000 INR",
//     "group_size": "50 People",
//     "hotels": [
//         {
//             "hotel_name": "Chumma Goa",
//             "hotel_address": "Adventure Street, Goa",
//             "price_per_night": "5000 INR",
//             "hotel_image_url": "/fr.webp",
//             "geo_coordinates": {
//                 "latitude": "50.123456",
//                 "longitude": "70.123456"
//             },
//             "rating": "5",
//             "description": "nice hotel with great amenities"
//         }
//     ],
//     "itinerary": [
//         {
//             "day": "0",
//             "day_plan": "on the first day, we will explore the beaches of Goa and enjoy water sports.",
//             "best_time_to_visit_day": "from 10 AM to 6 PM",
//             "activities": [
//                 {
//                     "place_name": "amazing beach",
//                     "place_details": "description of the amazing beach",
//                     "place_image_url": "/ol2.webp",
//                     "geo_coordinates": {
//                         "latitude": "10.123456",
//                         "longitude": "0.123456"
//                     },
//                     "place_address": "azad maidan, Goa",
//                     "ticket_pricing": "500 INR",
//                     "time_travel_each_location": "just 10 minutes",
//                     "best_time_to_visit": "visit in the morning for a peaceful experience"
//                 }
//             ]
//         }
//     ]
// }

function Itinerary() {
    //@ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const [tripData, setTripData] = useState<TripInfo | null>(null);

    useEffect(() => {
        tripData && setTripData(tripDetailInfo);
    })

    const data = tripData ? [
        {
            title: "Recommended Hotels",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {tripData?.hotels.map((hotel, index) => (
                        <HotelCardItem hotel={hotel} />
                    ))}
                </div>
            ),
        },
        ...tripData?.itinerary.map((dayData) => ({
            title: `Day ${dayData?.day}`,
            content: (
                <div>
                    <p>Best Time: {dayData?.best_time_to_visit_day}</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {dayData?.activities.map((activity, index) => (
                            <PlaceCardItem activity={activity} />
                        ))}
                    </div>
                </div>
            )
        }))
    ] : [];
    return (
        <div className="relative w-full h-[85vh] overflow-auto">
            {/* @ts-ignore */}
            {tripData ? <Timeline data={data} tripData={tripData} />
                :
                <div>
                    <h2 className='flex gap-2 text-3xl text-white left-20 items-center absolute bottom-20'><ArrowLeft /> Getting to know you to build perfect trip here...</h2>
                    <Image src={'/travel.png'}
                        className='w-full h-full object-cover rounded-3xl'
                    />
                </div>
            }
        </div>
    );
}
export default Itinerary;