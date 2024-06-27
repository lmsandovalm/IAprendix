import React from 'react'
import { NavLink } from 'react-router-dom'

import { useCourses } from '../contexts/CourseContext'
import { useTopics } from '../contexts/TopicContext'

const data = [
    {
        title: "Dashboard",
        icon: <i className='fa-solid fa-house'></i>,
        path: "/admin/adminDashboard/home"
    },
    {
        title: "Temáticas",
        icon: <i className='fa-solid fa-house'></i>,
        path: "/admin/adminDashboard/topics"
    },
    {
        title: "Cursos",
        icon: <i className='fa-solid fa-book'></i>,
        path: "/admin/adminDashboard/courses"
    },
    {
        title: "Material temáticas",
        icon: <i className='fa-solid fa-user-tie'></i>,
        path: "/admin/adminDashboard/materials"
    },
    {
        title: "Tests",
        icon: <i className='fa-solid fa-user-tie'></i>,
        path: "/admin/adminDashboard/tests"
    }
]
const AdminSidebar = () => {


    const { getCourses } = useCourses()
    // const { getTopics } = useTopics()
  return (
    <>
    <div className='flex flex-col items-center py-10 bg-[#0a0a27]' style={{ minHeight: 'calc(100vh - 72px)', maxHeight: '100%', width: '300px' }}>
        {
            data.map((d, idx) => (
                <NavLink
                    to={d.path} key={idx}
                    style={({ isActive }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                            backgroundColor: isActive ? "#fff" : "",
                            color: isActive ? "#000" : "",
                            padding: "15px 20px",
                            borderRadius: isActive ? "2px" : "2px",
                            width: '90%',
                            transition: "all 0.5s ease",
                            margin: '5px 0'
                        }
                    }}
                    className='text-[#fff] decoration-none w-full sidebar-link'
                    onClick={() => d.coure_name === "Courses" ? getCourses()  : ''}
                    // onClick={() => d.title === "Books" ? getBooks(): d.title === "Authors" ? getCourses(): d.coure_name === "Courses" ? getAuthors()  : ''}

                    // : d.topic_name === "Topics" ? getTopics()
                >
                    {d.icon} {d.title}
                </NavLink>
            ))
        }
    </div>
</>
  )
}

export default AdminSidebar