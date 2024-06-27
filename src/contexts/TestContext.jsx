import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteTest, getAllTests, getSingleTest } from "../services/TestService";
import { useNavigate } from "react-router-dom";

const TestContext = createContext();

export default function TestProvider({ children }) {

    // useState hooks
    const [loading, setLoading] = useState(false);
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
    const [allTests, setAllTests] = useState([]);
    const [testDetail, setTestDetail] = useState({});

    // useNavigate hook
    const navigate = useNavigate();

    // Toast hook
    const toast = useToast();

    const getTests = async () => {
        setLoading(true);
        try {
            const response = await getAllTests();
            if (response) {
                setLoading(false);
                setAllTests(response.data);
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
        getTests();
    }, []);

    // Function to get the test detail based on id
    const getTest = async (id) => {
        setLoading(true);
        try {
            const response = await getSingleTest(id);
            if (response) {
                setTestDetail(response);
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

    // Function to delete a test
    const handleDelete = async (id) => {
        setDeleteBtnLoading(true);
        try {
            const response = await deleteTest(id);
            if (response) {
                setDeleteBtnLoading(false);
                toast({
                    title: 'Test Deleted!',
                    description: 'Test has been removed from the library!',
                    status: 'success',
                    isClosable: true,
                    duration: 2000
                });
                navigate('/admin/adminDashboard/tests');

                // Calling all the tests after deleting
                getTests();
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
        <TestContext.Provider value={{ allTests, setAllTests, loading, setLoading, toast, handleDelete, getTests, testDetail, setTestDetail, getTest, deleteBtnLoading }}>
            {children}
        </TestContext.Provider>
    );
}

export const useTests = () => useContext(TestContext);
