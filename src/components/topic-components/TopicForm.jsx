import React, { useEffect, useState } from 'react';
import { Box, Button, Card, FormLabel, Heading, Image, Input, Stack, Spinner, Textarea, Select } from '@chakra-ui/react';
import { useTopics } from '../../contexts/TopicContext';
import { useCourses } from '../../contexts/CourseContext';

export default function TopicForm({ topicFormik, topicId, isEditPage, userInputs, setUserInputs }) {

    // Getting the courses for droplist

    const { allCourses } = useCourses();
    console.log(allCourses)

    // Getting the context
    const { loading, setLoading, topicDetail, setTopicDetail, getTopic } = useTopics();
    

    // Calling getSingleTopicApi
    useEffect(() => {
        // If the page is create topic then we don't need to call the api
        if (topicId) {
            getTopic(topicId);
        }
    }, [topicId]);

    // Update userInputs when topicDetail is fetched or when isEditPage changes
    useEffect(() => {
        if (isEditPage && topicDetail) {
            setUserInputs({
                topic_name: topicDetail.topic_name || '',
                topic_description: topicDetail.topic_description || '',
                course: topicDetail.topic_course || ''
            });
        }
    }, [isEditPage, topicDetail]);

    return (
        <>
            {
                loading ? <div className='flex justify-center my-10 items-center gap-3'>
                    <Spinner />
                    <small>Loading topic detail</small>
                </div> :
                <div className='flex flex-col justify-center items-center gap-5 w-full'>
                    {/* Personal Details Card */}
                    <Card className='p-5 w-full'>
                        <Stack spacing={4}>
                            <h5 className='my-5 text-[20px] font-[800]'>Detalles de temática</h5>

                            <div className='flex justify-center flex-wrap md:flex-nowrap gap-5'>
                                <Box className='w-full'>
                                    <FormLabel>Nombre de la temática <span className='text-[red]'>*</span></FormLabel>
                                    <Input
                                        placeholder="Nombre de la temática"
                                        value={topicFormik.values.topic_name}
                                        name='topic_name'
                                        onChange={topicFormik.handleChange}
                                        onBlur={topicFormik.handleBlur}
                                    />
                                    {
                                        topicFormik.touched.topic_name && topicFormik.errors.topic_name && (
                                            <small className='text-[red]'>
                                                {topicFormik.errors.topic_name}
                                            </small>
                                        )
                                    }
                                </Box>
                            </div>

                            <Box className='w-full'>
                                <FormLabel>Descripción de la tematica <span className='text-[red]'>*</span></FormLabel>
                                <Textarea
                                    placeholder="Descripción de la temática"
                                    value={topicFormik.values.topic_description}
                                    name='topic_description'
                                    onChange={topicFormik.handleChange}
                                    onBlur={topicFormik.handleBlur}
                                />
                                {
                                    topicFormik.touched.topic_description && topicFormik.errors.topic_description && (
                                        <small className='text-[red]'>
                                            {topicFormik.errors.topic_description}
                                        </small>
                                    )
                                }
                            </Box>

                            <Box className='w-full'>
                                <FormLabel>Curso <span className='text-[red]'>*</span></FormLabel>
                                <Select
                                    placeholder="Selecciona un curso"
                                    value={topicFormik.values.course}
                                    name='course'
                                    onChange={topicFormik.handleChange}
                                    onBlur={topicFormik.handleBlur}
                                >
                                    {allCourses.map(course => (
                                        <option key={course._id} value={course._id}>
                                            {course.coure_name}
                                        </option>
                                    ))}
                                </Select>
                                {
                                    topicFormik.touched.course && topicFormik.errors.course && (
                                        <small className='text-[red]'>
                                            {topicFormik.errors.course}
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
