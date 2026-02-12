import { useState } from 'react';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: Date;
}

export const useMessages = () => {
    const [messages] = useState<Message[]>([]);
    const [loading] = useState(false);

    // Add your Firebase logic here

    return { messages, loading };
};
