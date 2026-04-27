export type TeamMember = {
    id: string;
    name: string;
    role: string;
    email: string;
    image: string;
    linkedinUrl?: string;
};

export const team: TeamMember[] = [
    {
        id: "1",
        name: "Jimenez, Jerico",
        role: "Data Engineer / DevOps",
        email: "jimenezjerico227@gmail.com",
        image: "/profile.jpg",
    },
    {
        id: "2",
        name: "Patrick Oliver Reyes",
        role: "MERN Stack Developer",
        email: "patrickreyes@gmail.com",
        image: "/oliver.jpeg",
    },
    {
        id: "3",
        name: "John Rafael Bernardo",
        role: "UI/UX Designer",
        email: "johnbernardo@gmail.com",
        image: "/rafael.jpeg",
    },
];
