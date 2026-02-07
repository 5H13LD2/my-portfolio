export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: Date;
}
