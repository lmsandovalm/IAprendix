import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

export default function TestCard({ test, isHome }) {

    const { user } = useContext(AuthContext);

    return (
        <>
            {user?.role?.name_role === 'admin' ? (
                <Link to={`/admin/adminDashboard/test/${test._id}`}> 
                    <Box maxW="sm" borderWidth="1px" borderRadius="3xl" overflow="hidden" className='testCard transform transition duration-500 hover:scale-[1.03] cursor-pointer'>
                        <Box p="6">
                            <Box d="flex" alignItems="baseline">
                                <span className="inline-block bg-[#0a0a27] rounded-xl px-2 py-1 text-sm font-semibold text-[#fff] mr-2">{test.name_test}</span>
                            </Box>
                            <div className="flex items-center gap-2 mt-5">
                                <div><small><b>Descripción del test: </b>{test.description_test}</small></div>
                            </div>
                            <Text mt="2" fontSize="sm" className="description">{test.description}</Text>
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
                    <Box maxW="sm" borderWidth="1px" borderRadius="3xl" overflow="hidden" className='testCard transform transition duration-500 hover:scale-[1.03] cursor-pointer'>
                        <Box p="6">
                            <Box d="flex" alignItems="baseline">
                                <span className="inline-block bg-[#0a0a27] rounded-full px-2 py-1 text-sm font-semibold text-[#fff] mr-2">{test.test_name}</span>
                            </Box>
                            <div className="flex items-center gap-2 mt-5">
                                <Text fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>{test.title}</Text>
                                <div><small><b>Descripción del test: </b>{test.test_description}</small></div>
                            </div>
                            <Text mt="2" fontSize="sm" className="description">{test.description}</Text>
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
