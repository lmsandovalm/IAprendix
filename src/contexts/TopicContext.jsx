import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteTopic, getAllTopics, getSingleTopic } from "../services/TopicService";
import { useNavigate } from "react-router-dom";

const TopicContext = createContext();

export default function TopicProvider({ children }) {

    // useState hooks
    const [loading, setLoading] = useState(false);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const [allTopics, setAllTopics] = useState([]);
    const [topicDetail, setTopicDetail] = useState({});

    // useNavigate hook
    const navigate = useNavigate();

    // Toast hook
    const toast = useToast();

    const getTopics = async () => {
        setLoading(true);
        try {
            const response = await getAllTopics();
            if (response) {
                setLoading(false);
                setAllTopics(response.data);
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
        getTopics();
    }, []);

    // Function to get the topic detail based on id
    const getTopic = async (id) => {
        setLoading(true);
        try {
            const response = await getSingleTopic(id);
            if (response) {
                setTopicDetail(response);
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

    // Function to delete a topic
    const handleDelete = async (id) => {
        setDeleteBtnLoading(true);
        try {
            const response = await deleteTopic(id);
            if (response) {
                setDeleteBtnLoading(false);
                toast({
                    title: 'Topic Deleted!',
                    description: 'Topic has been removed from the library!',
                    status: 'success',
                    isClosable: true,
                    duration: 2000
                });
                navigate('/admin/adminDashboard/topics');

                // Calling all the topics after deleting
                getTopics();
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
        <TopicContext.Provider value={{ allTopics, setAllTopics, loading, setLoading, toast, handleDelete, getTopics, topicDetail, setTopicDetail, getTopic, deleteBtnLoading }}>
            {children}
        </TopicContext.Provider>
    );
}

export const useTopics = () => useContext(TopicContext);
