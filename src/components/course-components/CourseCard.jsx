import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

export default function CourseCard({ course, isHome }) {

    const { user } = useContext (AuthContext);

    return (
        <>
              {user?.role?.name_role === 'admin' ? (
            <Link to={`/admin/adminDashboard/course/${course._id}`}> 
                <Box maxW="sm" borderWidth="1px" borderRadius="3xl" overflow="hidden" className='courseCard transform transition duration-500 hover:scale-[1.03] cursor-pointer'>

                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <span className="inline-block bg-[#050B30] rounded-full px-2 py-1 text-sm font-semibold text-[#fff] mr-2">{course.coure_name}</span>
                        </Box>
                        <div className="flex items-center gap-2 mt-5">
                            <Text fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>{course.title}</Text>
                            <div><small><b>Descripción curso: </b>{course.coure_description}</small></div>
                        </div>

                        

                        <Text mt="2" fontSize="sm" className="description">{course.description}</Text>

                        
                        
                    </Box>
                  

                    <style jsx='true'>{`
                    .description {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: justify;
                        margin: 20px 0px
                    }
                `}</style>
                </Box>
            </Link>
             ) : (
                <Link> 
                <Box maxW="sm" borderWidth="1px" borderRadius="3xl" overflow="hidden" className='courseCard transform transition duration-500 hover:scale-[1.03] cursor-pointer'>

                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <span className="inline-block bg-[#0a0a27] rounded-full px-2 py-1 text-sm font-semibold text-[#fff] mr-2">{course.coure_name}</span>
                        </Box>
                        <div className="flex items-center gap-2 mt-5">
                            <Text fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>{course.title}</Text>
                            <div><small><b>Descripción curso: </b> {course.coure_description}</small></div>
                        </div>

                        

                        <Text mt="2" fontSize="sm" className="description">{course.description}</Text>

                        
                        
                    </Box>
                    

                    <style jsx='true'>{`
                    .description {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: justify;
                        margin: 20px 0px
                    }
                `}</style>
                </Box>
            </Link>
            )}
        </>
    );
}
