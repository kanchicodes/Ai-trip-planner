import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Activity, Itinerary } from './ChatBox';
import { useTripDetail } from '@/app/provider';


function GlobalMap() {

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    //@ts-ignore
    const { tripDetailInfo } = useTripDetail();

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef?.current!,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-74.5, 40],
                zoom: 1.7,
                projection: 'globe'
            });
        }

        const markers: mapboxgl.Marker[] = [];

        if (tripDetailInfo?.itinerary) {
            let lastCoordinates: [number, number] | null = null;
            tripDetailInfo?.itinerary.forEach((itinerary: Itinerary) => {
                itinerary.activities.forEach((activity: Activity) => {
                    if (activity?.geo_coordinates?.longitude && activity?.geo_coordinates?.latitude) {
                        const marker = new mapboxgl.Marker({ color: 'red' })
                            .setLngLat([activity.geo_coordinates.longitude, activity.geo_coordinates.latitude])
                            .setPopup(new mapboxgl
                                .Popup({ offset: 25 })
                                .setText(activity.place_name)
                            )
                            .addTo(mapRef.current!);
                        markers.push(marker);
                        lastCoordinates = [activity.geo_coordinates.longitude, activity.geo_coordinates.latitude];
                    }
                });
            });
            // Only fly to the last marker
            if (lastCoordinates) {
                mapRef.current!.flyTo({
                    center: lastCoordinates,
                    zoom: 8,
                    essential: true
                });
            }
        }
        return () => {
            markers.forEach(marker => marker.remove());
        }

    }, [tripDetailInfo])

    return (
        <div>
            <div>
                <div ref={mapContainerRef}
                    style={{
                        width: '95%',
                        height: '85vh',
                        borderRadius: 20
                    }}
                />
            </div>
        </div>
    )
}
export default GlobalMap;