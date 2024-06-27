import React, { useEffect, useState } from 'react';
import { Box, Button, Card, FormLabel, Heading, Image, Input, Stack, Spinner, Textarea, Select } from '@chakra-ui/react';
import { useMaterialTopics } from '../../contexts/MaterialTopicContext';
import { useTopics } from '../../contexts/TopicContext';
import axios from 'axios';
import { useLearningStyles } from '../../contexts/LearningStyleContext';


export default function MaterialTopicForm({ materialTopicFormik, materialTopicId, isEditPage, userInputs, setUserInputs }) {

    //Getting the learning style
    
    const {allLearningStyles} = useLearningStyles();
    console.log(allLearningStyles)


    //Getting the topics
    const {allTopics} = useTopics();
    console.log(allTopics)


    // Getting the context
    const { loading, setLoading, materialTopicDetail, setMaterialTopicDetail, getMaterialTopic } = useMaterialTopics();

    
    // Calling getSingleTopicApi
    useEffect(() => {
        // If the page is create topic then we don't need to call the api
        if (materialTopicId) {
            getMaterialTopic(materialTopicId);
        }
    }, [materialTopicId]);

    // Update userInputs when topicDetail is fetched or when isEditPage changes
    useEffect(() => {
        if (isEditPage && materialTopicDetail) {
            setUserInputs({
                material_name: materialTopicDetail.material_name || '',
                material_description: materialTopicDetail.material_description || '',
                idTopic: materialTopicDetail.idTopic || '',
                material_style: materialTopicDetail.material_style || ''

            });
        }
    }, [isEditPage, materialTopicDetail]);

    return (
        <>
            {
                loading ? <div className='flex justify-center my-10 items-center gap-3'>
                    <Spinner />
                    <small>Cargando</small>
                </div> :
                    <div className='flex flex-col justify-center items-center gap-5 w-full'>
                        {/* Material Topic Details Card */}
                        <Card className='p-5 w-full'>
                            <Stack spacing={4}>
                                <h5 className='my-5 text-[20px] font-[800]'>Detalles de material</h5>

                                <div className='flex justify-center flex-wrap md:flex-nowrap gap-5'>
                                    <Box className='w-full'>
                                        <FormLabel>Nombre del material <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="Nombre del material"
                                            value={materialTopicFormik.values.material_name}
                                            name='material_name'
                                            onChange={materialTopicFormik.handleChange}
                                            onBlur={materialTopicFormik.handleBlur}
                                        />
                                        {
                                            materialTopicFormik.touched.material_name && materialTopicFormik.errors.material_name && (
                                                <small className='text-[red]'>
                                                    {materialTopicFormik.errors.material_name}
                                                </small>
                                            )
                                        }
                                    </Box>
                                </div>
                                <Box className='w-full'>
                                    <FormLabel>Descripción del material <span className='text-[red]'>*</span></FormLabel>
                                    <Textarea
                                        placeholder="Descripción del material"
                                        value={materialTopicFormik.values.material_description}
                                        name='material_description'
                                        onChange={materialTopicFormik.handleChange}
                                        onBlur={materialTopicFormik.handleBlur}
                                    />
                                    {
                                        materialTopicFormik.touched.material_description && materialTopicFormik.errors.material_description && (
                                            <small className='text-[red]'>
                                                {materialTopicFormik.errors.material_description}
                                            </small>
                                        )
                                    }
                                </Box>

                                <Box className='w-full'>
                                    <FormLabel>Temática <span className='text-[red]'>*</span></FormLabel>
                                    <Select
                                        placeholder="Selecciona una temática"
                                        value={materialTopicFormik.values.idTopic}
                                        name='idTopic'
                                        onChange={materialTopicFormik.handleChange}
                                        onBlur={materialTopicFormik.handleBlur}
                                    >
                                        {allTopics.map(topic => (
                                            <option key={topic._id} value={topic._id}>
                                                {topic.topic_name}
                                            </option>
                                        ))}
                                    </Select>
                                    {
                                        materialTopicFormik.touched.idTopic && materialTopicFormik.errors.idTopic && (
                                            <small className='text-[red]'>
                                                {materialTopicFormik.errors.idTopic}
                                            </small>
                                        )
                                }
                                </Box>

                                <Box className='w-full'>
                                    <FormLabel>Estilo de aprendizaje <span className='text-[red]'>*</span></FormLabel>
                                    <Select
                                        placeholder="Selecciona una temática"
                                        value={materialTopicFormik.values.material_style}
                                        name='material_style'
                                        onChange={materialTopicFormik.handleChange}
                                        onBlur={materialTopicFormik.handleBlur}
                                    >
                                        {allLearningStyles.map(style => (
                                            <option key={style._id} value={style._id}>
                                                {style.name_style}
                                            </option>
                                        ))}
                                    </Select>
                                    {
                                        materialTopicFormik.touched.material_style && materialTopicFormik.errors.material_style && (
                                            <small className='text-[red]'>
                                                {materialTopicFormik.errors.material_style}
                                            </small>
                                        )
                                }
                                </Box>

                                
                            </Stack>
                        </Card>
                    </div>
            }
        </>
    );
}
