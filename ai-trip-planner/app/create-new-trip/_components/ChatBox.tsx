"use client";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Section, Send } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import EmptyBoxState from './EmptyBoxState';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
// import SelectDays from './SelectDays';
import SelectDays from './SelectDays';
import FinalUi from './FinalUi';

type Message = {
    role: string,
    content: string,
    ui?: string,
};

function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>();
    const [loading, setLoading] = useState(false);

    const onSend = async () => {

        if (!userInput?.trim()) return;

        setLoading(true);
        setUserInput('');
        const newMsg: Message = {
            role: 'user',
            content: userInput
        };
        setMessages((prev: Message[]) => [...prev, newMsg]);

        const result = await axios.post('/api/aimodel', {
            messages: [...messages, newMsg]
        });

        let aiContent = '';
        let aiUi = '';
        if (typeof result?.data === 'object' && result.data !== null) {
            aiContent = result.data.TextResp || '';
            aiUi = result.data.ui || '';
        } else if (typeof result?.data === 'string') {
            aiContent = result.data;
        }
        if (!aiContent) aiContent = 'AI did not return a response.';
        setMessages((prev: Message[]) => [...prev, {
            role: 'assistant',
            content: aiContent,
            ui: aiUi
        }]);
        console.log('AI reply:', aiContent, 'UI:', aiUi, 'Raw:', result.data);
        setLoading(false);
    }
    const RenderGenerativeUi = (ui: string) => {
        if (ui == 'budget') {
            //budget ui component
            return <BudgetUi onSelectOption={(v: string) => { setUserInput(v); onSend() }} />

        } else if (ui == 'groupSize') {
            //group size ui component
            return <GroupSizeUi onSelectOption={(v: string) => { setUserInput(v); onSend() }} />

        } else if (ui == 'tripDuration') {
            // group size ui component
            return <SelectDays onSelectOption={(v: string) => { setUserInput(v); onSend() }} />

        } else if (ui == 'final') {
            //group size ui component
            return <FinalUi viewTrip={() => console.log()} />
        }

        return null
    }

    return (
        <div className='h-[85vh] flex flex-col'>
            {messages?.length == 0 &&
                <EmptyBoxState
                    onSelectOption={(v: string) => { setUserInput(v); onSend() }} />
            }
            {/* Display messages */}
            <section className='flex-1 overflow-auto p-4'>
                {messages.map((msg: Message, index) => (
                    msg.role === 'user' ?
                        <div className='flex justify-end mt-2' key={index}>
                            <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                                {msg.content}
                            </div>
                        </div> :
                        <div className='flex justify-start mt-2' key={index}>
                            <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                                {msg.content}
                                {RenderGenerativeUi(msg.ui ?? '')}
                            </div>
                        </div>
                ))}
                {loading && <div className='flex justify-start mt-2'>
                    <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                        <Loader className='animate-spin' />
                    </div>
                </div>}
            </section>
            {/* user input */}
            <section>
                <div className='relative border rounded-2xl p-4'>
                    <Textarea placeholder='Start typing here...'
                        className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                    />
                    <Button size={'icon'} className='absolute bottom-6 right-6' onClick={() => onSend()}>
                        <Send className='w-4 h-4' />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default ChatBox;