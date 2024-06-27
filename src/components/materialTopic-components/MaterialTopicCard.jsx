import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLearningStyles } from "../../contexts/LearningStyleContext";
import { useMaterialTopics } from "../../contexts/MaterialTopicContext";

export default function MaterialTopicCard({ materialTopic, isHome }) {

    const { user } = useContext(AuthContext);
    const { allLearningStyles } = useLearningStyles();
    const { allMaterialTopics } = useMaterialTopics();
    

    return (
        <>
            {user?.role?.name_role === 'admin' ? (
                <Link to={`/admin/adminDashboard/materialTopic/${materialTopic._id}`}> 
                    <Box maxW="sm" borderWidth="1px" borderRadius="3xl" overflow="hidden" className='materialTopicCard transform transition duration-500 hover:scale-[1.03] cursor-pointer'>
                        <Box p="6">
                            <Box d="flex" alignItems="baseline">
                                <span className="inline-block bg-[#0a0a27] rounded-full px-2 py-1 text-sm font-semibold text-[#fff] mr-2">{materialTopic.material_name}</span>
                            </Box>
                            <div className="flex items-center gap-2 mt-5">
                                <Text fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>{materialTopic.title}</Text>
                                <div><small><b>{materialTopic.material_name} </b></small></div>
                            </div>
                            <Text mt="2" fontSize="sm" className="description">{materialTopic.material_description}</Text>
                        </Box>

                        <style jsx='true'>{`
                        .description {
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            text-align: justify;
                            margin: 20px 0px;
                        }
                    `}</style>
                    </Box>
                </Link>
            ) : (
                <Link> 
                    <Box maxW="sm" borderWidth="1px" borderRadius="3xl" overflow="hidden" className='materialTopicCard transform transition duration-500 hover:scale-[1.03] cursor-pointer'>
                        <Box p="6">
                            <Box d="flex" alignItems="baseline">
                                <span className="inline-block bg-[#0a0a27] rounded-full px-2 py-1 text-sm font-semibold text-[#fff] mr-2">{materialTopic.material_name}</span>
                            </Box>
                            <div className="flex items-center gap-2 mt-5">
                                <Text fontWeight="semibold" fontSize="xl" lineHeight="tight" isTruncated>{materialTopic.title}</Text>
                                <div><small><b>Descripción material: </b>{materialTopic.material_description}</small></div>
                            </div>
                            <Text mt="2" fontSize="sm" className="description">{materialTopic.material_description}</Text>
                        </Box>

                        <style jsx='true'>{`
                        .description {
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            text-align: justify;
                            margin: 20px 0px;
                        }
                    `}</style>
                    </Box>
                </Link>
            )}
        </>
    );
}
