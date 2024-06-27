import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllLearningStyles } from "../services/LearningStyleService";
import { useNavigate } from "react-router-dom";

const LearningStyleContext = createContext();

export default function LearningStyleProvider({ children }) {

    // useState hooks
    const [loading, setLoading] = useState(false);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const [allLearningStyles, setAllLearningStyles] = useState([]);

    // useNavigate hook
    const navigate = useNavigate();

    // Toast hook
    const toast = useToast();

    const getLearningStyles = async () => {
        setLoading(true);
        try {
            const response = await getAllLearningStyles();
            if (response) {
                setLoading(false);
                setAllLearningStyles(response.data);
                console.log(response)
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
        getLearningStyles();
    }, []);

    return (
        <LearningStyleContext.Provider value={{ allLearningStyles, setAllLearningStyles, getLearningStyles }}>
            {children}
        </LearningStyleContext.Provider>
    );
}

export const useLearningStyles = () => useContext(LearningStyleContext);
