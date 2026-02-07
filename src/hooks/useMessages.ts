import { useState, useEffect } from 'react';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: Date;
}

export const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    // Add your Firebase logic here

    return { messages, loading };
};
