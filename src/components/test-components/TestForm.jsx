import React, { useEffect, useState } from 'react';
import { Box, Button, Card, FormLabel, Input, Stack, Spinner, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useTests } from '../../contexts/TestContext';
import { registerQuestion } from '../../services/QuestionService';

export default function TestForm({ testFormik, isEditPage, userInputs, setUserInputs, testId}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(testId)
    const [newQuestion, setNewQuestion] = useState({
        question_name: '',
        question_description: '',
        test: testId,
    });

    const { loading, setLoading, testDetail, setTestDetail, getTest } = useTests();


    useEffect(() => {
        if (isEditPage && testDetail) {
            setUserInputs({
                name_test: testDetail.name_test || '',
                description_test: testDetail.description_test || '',
            });
        }
    }, [isEditPage, testDetail]);

    useEffect(() => {
        if (testId) {
            setNewQuestion(prevState => ({
                ...prevState,
                test: testId, // Actualizar testId en el estado
            }));
        }
    }, [testId]);

    const handleRegisterQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await registerQuestion(newQuestion);
            console.log('Question registered successfully:', response);
            onClose(); // Cierra el modal al enviar la pregunta con éxito
        } catch (error) {
            console.error('Error registering question:', error);
        }
    };

    return (
        <>
            {loading ? (
                <div className='flex justify-center my-10 items-center gap-3'>
                    <Spinner />
                    <small>Loading test detail</small>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center gap-5 w-full'>
                    <Card className='p-5 w-full'>
                        <Stack spacing={4}>
                            <h5 className='my-5 text-[20px] font-[800]'>Detalles del test</h5>
                            <div className='flex justify-center flex-wrap md:flex-nowrap gap-5'>
                                <Box className='w-full'>
                                    <FormLabel>Nombre del test <span className='text-[red]'>*</span></FormLabel>
                                    <Input
                                        placeholder="Nombre del test"
                                        value={testFormik.values.name_test}
                                        name='name_test'
                                        onChange={testFormik.handleChange}
                                        onBlur={testFormik.handleBlur}
                                    />
                                    {testFormik.touched.name_test && testFormik.errors.name_test && (
                                        <small className='text-[red]'>{testFormik.errors.name_test}</small>
                                    )}
                                </Box>
                            </div>
                            <Box className='w-full'>
                                <FormLabel>Descripción del test <span className='text-[red]'>*</span></FormLabel>
                                <Textarea
                                    placeholder="Descripción del test"
                                    value={testFormik.values.description_test}
                                    name='description_test'
                                    onChange={testFormik.handleChange}
                                    onBlur={testFormik.handleBlur}
                                />
                                {testFormik.touched.description_test && testFormik.errors.description_test && (
                                    <small className='text-[red]'>{testFormik.errors.description_test}</small>
                                )}
                            </Box>
                        </Stack>
                        <Button
                            colorScheme="twitter"
                            size="md"
                            leftIcon={isEditPage && <PlusSquareIcon />}
                            onClick={onOpen} // Abre el modal al hacer clic
                        >
                            Agregar pregunta al test
                        </Button>
                    </Card>
                </div>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar nueva pregunta</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleRegisterQuestion}>
                            <Stack spacing={4}>
                                <Box>
                                    <FormLabel>Nombre de la pregunta</FormLabel>
                                    <Input
                                        placeholder="Nombre de la pregunta"
                                        value={newQuestion.question_name}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, question_name: e.target.value })}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel>Descripción de la pregunta</FormLabel>
                                    <Textarea
                                        placeholder="Descripción de la pregunta"
                                        value={newQuestion.question_description}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, question_description: e.target.value })}
                                    />
                                </Box>
                                <Button type="submit" colorScheme="twitter">Agregar pregunta</Button>
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
