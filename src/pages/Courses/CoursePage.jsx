import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Heading, IconButton, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../contexts/CourseContext";
import CourseForm from "../../components/course-components/CourseForm";

import * as Yup from "yup";
import { useFormik } from "formik";
import { addCourse, updateCourse } from "../../services/CourseService";

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditPage, setIsEditPage] = useState(false);

  // State to handle button loading
  const [btnLoading, setBtnLoading] = useState(false);

  // Getting the contexts
  const { handleDelete, toast, getCourses, deleteBtnLoading } = useCourses();

  // State to store user inputs
  const [userInputs, setUserInputs] = useState({
    coure_name: "",
    coure_description: ""   
  });

  // Checking whether the page is edit page or create page
  useEffect(() => {
    if (id) {
      setIsEditPage(true);
    }
  }, [id]);

  // Validation schema
  const courseValidation = Yup.object().shape({
    coure_name: Yup.string().required("Course name is required!"),
    coure_description: Yup.string()
      .min(3, "Description should be more than 3 words!")
      .required("Course description is required!"),
  });

  // Creating the course formik using useFormik hook
  const courseFormik = useFormik({
    initialValues: userInputs,
    validationSchema: courseValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setBtnLoading(true);
      try {
        const response = isEditPage
          ? await updateCourse(id, values)
          : await addCourse(values);
        if (response) {
          setBtnLoading(false);
          toast({
            title: `Course ${isEditPage ? "Updated" : "Created"}`,
            description: `Success! We have ${
              isEditPage ? "updated" : "created"
            } the requested course for you!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/admin/adminDashboard/courses");

          // Calling the courses list api
          getCourses();
        }
      } catch (error) {
        setBtnLoading(false);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <form onSubmit={courseFormik.handleSubmit}>
      <div className="flex flex-col gap-5 justify-center my-10 w-full">
        <div className="flex justify-center md:justify-between flex-wrap gap-5">
          <div className="flex items-center flex-wrap gap-5"> 
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => {
                navigate("/admin/adminDashboard/courses");
                getCourses();
              }}
            />
            <h1 className="text-[35px] font-[800]">
              {isEditPage ? "Editar o borrar curso" : "Crear Curso"}
            </h1>
          </div>
          <div className="flex items-center flex-wrap md:flex-nowrap gap-5">
            <Button
              colorScheme="twitter"
              size="md"
              leftIcon={!btnLoading && isEditPage && <EditIcon />}
              type="submit"
              className="flex items-center gap-2"
            >
              {btnLoading && <Spinner size={"sm"} />}
              {isEditPage ? " Actualizar" : " Guardar"}
            </Button>
            {isEditPage && (
              <Button
                colorScheme="red"
                leftIcon={!deleteBtnLoading && isEditPage && <DeleteIcon />}
                onClick={() => handleDelete(id)}
                className="flex gap-2 items-center"              >
                {deleteBtnLoading && <Spinner size="sm" />}Eliminar curso
              </Button>
            )}
          </div>
        </div>

        <CourseForm
          userId={id}
          isEditPage={isEditPage}
          userInputs={userInputs}
          setUserInputs={setUserInputs}
          courseFormik={courseFormik}
        />
      </div>
    </form>
  );
}
