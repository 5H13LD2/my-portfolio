import React from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

const Home = () => {
    return (
        <div className="ml-96 min-h-screen">
            <div className="max-w-6xl mx-auto p-8 space-y-8">
                {/* Projects Section */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Projects</h2>

                    <div className="space-y-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Laravel', 'MySQL', 'MongoDB', 'Git', 'Tailwind CSS'].map((skill) => (
                            <div
                                key={skill}
                                className="px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-center font-medium text-gray-700"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
