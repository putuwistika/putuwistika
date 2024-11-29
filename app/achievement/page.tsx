'use client'

import React from "react"
import { Button } from "@/components/ui/button"

interface AchievementProps {
  title: string
  date: string
  description: string
}

const achievements: AchievementProps[] = [
  {
    title: "Full Stack Data Science Certification",
    date: "2024",
    description:
      "Certified in Full Stack Data Science by ITB's Directorate of Non-Regular Education.",
  },
  {
    title: "Sanbercode Fast Track Data Engineer",
    date: "2024",
    description:
      "Completed Digital Skola Bootcamp focusing on advanced data engineering techniques.",
  },
  {
    title: "BMKG Wilayah 3 Denpasar Internship",
    date: "2023",
    description:
      "Conducted data science analysis for atmospheric data, including prediction and modeling.",
  },
  {
    title: "Microsoft Office Specialist: Excel Associate",
    date: "2023",
    description:
      "Earned a certification in Microsoft Excel (Office 2019) with a focus on advanced features.",
  },
]

export default function Achievement() {
  const openNLPDashboard = () => {
    window.open('http://134.209.105.5:8501/', '_blank')
  }

  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Achievements
        </h2>

        <ul className="space-y-6">
          {achievements.map((achievement, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-500">{achievement.date}</p>
              <p className="mt-2 text-gray-600">{achievement.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <Button 
            onClick={openNLPDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            Dashboard NLP
          </Button>
        </div>
      </div>
    </section>
  )
}