import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteMaterialTopic, getAllMaterialTopics, getSingleMaterialTopic } from "../services/MaterialTopicService";
import { useNavigate } from "react-router-dom";

const MaterialTopicContext = createContext();

export default function MaterialTopicProvider({ children }) {

    // useState hooks
    const [loading, setLoading] = useState(false);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const [allMaterialTopics, setAllMaterialTopics] = useState([]);
    const [materialTopicDetail, setMaterialTopicDetail] = useState({});

    // useNavigate hook
    const navigate = useNavigate();

    // Toast hook
    const toast = useToast();

    const getMaterialTopics = async () => {
        setLoading(true);
        try {
            const response = await getAllMaterialTopics();
            if (response) {
                setLoading(false);
                setAllMaterialTopics(response.data);
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
        getMaterialTopics();
    }, []);

    // Function to get the material topic detail based on id
    const getMaterialTopic = async (id) => {
        setLoading(true);
        try {
            const response = await getSingleMaterialTopic(id);
            if (response) {
                setMaterialTopicDetail(response);
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

    // Function to delete a material topic
    const handleDelete = async (id) => {
        setDeleteBtnLoading(true);
        try {
            const response = await deleteMaterialTopic(id);
            if (response) {
                setDeleteBtnLoading(false);
                toast({
                    title: 'Material Topic Deleted!',
                    description: 'Material Topic has been removed from the library!',
                    status: 'success',
                    isClosable: true,
                    duration: 2000
                });
                navigate('/admin/adminDashboard/materials');

                // Calling all the material topics after deleting
                getMaterialTopics();
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
        <MaterialTopicContext.Provider value={{ allMaterialTopics, setAllMaterialTopics, loading, setLoading, toast, handleDelete, getMaterialTopics, materialTopicDetail, setMaterialTopicDetail, getMaterialTopic, deleteBtnLoading }}>
            {children}
        </MaterialTopicContext.Provider>
    );
}

export const useMaterialTopics = () => useContext(MaterialTopicContext);
