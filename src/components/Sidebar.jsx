import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import { useTests } from '../contexts/TestContext';


const data = [
    {
        title: "Dashboard",
        icon: <i className='fa-solid fa-house'></i>,
        path: "/user/userDashboard/home"
    },
    {
        title: "Courses",
        icon: <i className='fa-solid fa-user-tie'></i>,
        path: "/user/userDashboard/courses"
    },
    {
        title: "Test",
        icon: <i className='fa-solid fa-user-tie'></i>,
        path: "/user/userDashboard/tests"
    }
]


export default function Sidebar() {

   
    const { getCourses, allCourses } = useCourses()
    const { getTests, allTests } = useTests()
    console.log(allCourses)
    console.log(allTests)

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
                            onClick={() => d.title === "Courses" ? getCourses() : d.title === "Test" ? getTests() :''}
                            // onClick={() => d.title === "Books" ? getBooks(): d.title === "Authors" ? getCourses(): d.coure_name === "Courses" ? getAuthors() : ''}
                        >
                            {d.icon} {d.title}
                        </NavLink>
                    ))
                }
            </div>
        </>
    )
}
