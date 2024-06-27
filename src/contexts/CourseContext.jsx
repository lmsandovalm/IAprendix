import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteCourse, getAllCourses, getSingleCourse } from "../services/CourseService";
import { useNavigate } from "react-router-dom";

const CourseContext = createContext();

export default function CourseProvider({ children }) {

    // useState hooks
    const [loading, setLoading] = useState(false);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const [allCourses, setAllCourses] = useState([]);
    const [courseDetail, setCourseDetail] = useState({});

    // useNavigate hook
    const navigate = useNavigate();

    // Toast hook
    const toast = useToast();

    const getCourses = async () => {
        setLoading(true);
        try {
            const response = await getAllCourses();
            if (response) {
                setLoading(false);
                setAllCourses(response.data);
            }
        } catch (err) {
            setLoading(false);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                duration: 2000
            });
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    // Function to get the course detail based on id
    const getCourse = async (id) => {
        setLoading(true);
        try {
            const response = await getSingleCourse(id);
            if (response) {
                setCourseDetail(response);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                isClosable: true,
                duration: 2000
            });
        }
    };

    // Function to delete a course
    const handleDelete = async (id) => {
        setDeleteBtnLoading(true);
        try {
            const response = await deleteCourse(id);
            if (response) {
                setDeleteBtnLoading(false);
                toast({
                    title: 'Course Deleted!',
                    description: 'Course has been removed from the library!',
                    status: 'success',
                    isClosable: true,
                    duration: 2000
                });
                navigate('/admin/adminDashboard/courses');

                // Calling all the courses after deleting
                getCourses();
            }
        } catch (err) {
            setDeleteBtnLoading(false);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                duration: 2000
            });
        }
    };

    return (
        <CourseContext.Provider value={{ allCourses, setAllCourses, loading, setLoading, toast, handleDelete, getCourses, courseDetail, setCourseDetail, getCourse, deleteBtnLoading }}>
            {children}
        </CourseContext.Provider>
    );
}

export const useCourses = () => useContext(CourseContext);
