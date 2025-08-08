"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Popular destination to visit.
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of Apple club is that you boast about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <img
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>    );
};

const data = [
    {
        "category": "Paris, France",
        "title": "Explore the City of Lights - Eiffel Tower, Louvre & more",
        "src": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
        "content": "DummyContent"
    },
    {
        "category": "New York, USA",
        "title": "Experience NYC - Times Square, Central Park, Broadway",
        "src": "https://plus.unsplash.com/premium_photo-166195454458-c7361d4a8e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "content": "DummyContent"
    },
    {
        "category": "Tokyo, Japan",
        "title": "Discover Tokyo - Shibuya, Cherry Blossoms, Temples",
        "src": "https://images.unsplash.com/photo-1522547400478-51f4e1e49d0b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "content": "DummyContent"
    },
    {
        "category": "Rome, Italy",
        "title": "Walk through History - Colosseum, Vatican, Roman Forum",
        "src": "https://plus.unsplash.com/premium_photo-167579784857-d709b4a9e87?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "content": "DummyContent"
    },
    {
        "category": "Dubai, UAE",
        "title": "Luxury and Innovation - Burj Khalifa, Desert Safari",
        "src": "https://images.unsplash.com/photo-1526494121893-a6e1842b54d7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "content": "DummyContent"
    },
    {
        "category": "India",
        "title": "Harbour Views - Opera House, Bondi Beach & Wildlife",
        "src": "https://images.unsplash.com/photo-15249412937-b2677e5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "content": "DummyContent"
    }
];