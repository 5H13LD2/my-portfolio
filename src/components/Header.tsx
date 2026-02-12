import { Linkedin, Github, Mail } from 'lucide-react'

const Header = () => {
    return (
        <div className="fixed left-0 top-0 h-full w-96 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 overflow-y-auto">
            <div className="space-y-8">
                {/* Greeting */}
                <div>
                    <h1 className="text-5xl font-bold mb-2">Hello! 👋</h1>
                    <p className="text-xl text-blue-100">
                        I'm Jerico Jimenez, a Full Stack Developer.
                    </p>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center">
                    <div className="w-48 h-48 rounded-full bg-white p-2 shadow-xl">
                        <img
                            src="/profile.jpg"
                            alt="Jerico Jimenez"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Contact</h2>
                    <div className="space-y-3">
                        <a
                            href="https://www.linkedin.com/in/jerico-jimenez-a504852a4/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                        >
                            <Linkedin size={20} />
                            <span>linkedin.com/in/jerico-jimenez-a504852a4</span>
                        </a>
                        <a
                            href="https://github.com/5H13LD2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                        >
                            <Github size={20} />
                            <span>https://github.com/5H13LD2</span>
                        </a>
                        <a
                            href="jimenezjerico227@gmail.com"
                            className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors"
                        >
                            <Mail size={20} />
                            <span>jimenezjerico227@gmail.com</span>
                        </a>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Summary</h2>
                    <p className="text-blue-100 leading-relaxed">
                        Motivated Full Stack Developer with almost 1 year of experience in designing,
                        developing, and building web systems. Proficient in both front and backend technologies.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header
