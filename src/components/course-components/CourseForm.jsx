import React, { useEffect, useState } from 'react'
import { Box, Button, Card, FormLabel, Heading, Image, Input, Stack, Spinner, Textarea } from '@chakra-ui/react'
import { useCourses } from '../../contexts/CourseContext';

export default function CourseForm({ courseFormik, courseId, isEditPage, userInputs, setUserInputs }) {

    // Getting the context
    const { loading, setLoading, courseDetail, setCourseDetail, getCourse } = useCourses()

    // Calling getSingleCourseApi
    useEffect(() => {
        // If the page is create course then we don't need to call the api
        if (courseId) {
            getCourse(courseId)
        }
    }, [courseId])

    // Update userInputs when courseDetail is fetched or when isEditPage changes
    useEffect(() => {
        if (isEditPage && courseDetail) {
            setUserInputs({
                coure_name: courseDetail.coure_name || '',
                coure_description: courseDetail.coure_description || '',
                
            });
        }
    }, [isEditPage, courseDetail]);

    return (
        <>
            {
                loading ? <div className='flex justify-center my-10 items-center gap-3'>
                    <Spinner />
                    <small>Cargando</small>
                </div> :
                    <div className='flex flex-col justify-center items-center gap-5 w-full'>
                        {/* Personal Details Card */}
                        <Card className='p-5 w-full'>
                            <Stack spacing={4}>
                                <h5 className='my-5 text-[20px] font-[800]'>Detalles del curso</h5>

                                <div className='flex justify-center flex-wrap md:flex-nowrap gap-5'>
                                    <Box className='w-full'>
                                        <FormLabel>Nombre del curso <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="Nombre del curso"
                                            value={courseFormik.values.coure_name}
                                            name='coure_name'
                                            onChange={courseFormik.handleChange}
                                            onBlur={courseFormik.handleBlur}
                                        />
                                        {
                                            courseFormik.touched.coure_name && courseFormik.errors.coure_name && (
                                                <small className='text-[red]'>
                                                    {courseFormik.errors.coure_name}
                                                </small>
                                            )
                                        }
                                    </Box>
                                </div>
                                <Box className='w-full'>
                                    <FormLabel>Descripción del curso <span className='text-[red]'>*</span></FormLabel>
                                    <Textarea
                                        placeholder="Descripción del curso"
                                        value={courseFormik.values.coure_description}
                                        name='coure_description'
                                        onChange={courseFormik.handleChange}
                                        onBlur={courseFormik.handleBlur}
                                    />
                                    {
                                        courseFormik.touched.coure_description && courseFormik.errors.coure_description && (
                                            <small className='text-[red]'>
                                                {courseFormik.errors.coure_description}
                                            </small>
                                        )
                                    }
                                </Box>

                                
                            </Stack>
                        </Card>

                        
                    </div>
            }
        </>
    )
}
