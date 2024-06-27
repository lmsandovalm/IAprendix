import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Heading, IconButton, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTopics } from "../../contexts/TopicContext";
import TopicForm from "../../components/topic-components/TopicForm";

import * as Yup from "yup";
import { useFormik } from "formik";
import { addTopic, updateTopic } from "../../services/TopicService";

export default function TopicPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditPage, setIsEditPage] = useState(false);

  // State to handle button loading
  const [btnLoading, setBtnLoading] = useState(false);

  // Getting the contexts
  const { handleDelete, toast, getTopics, deleteBtnLoading } = useTopics();

  // State to store user inputs
  const [userInputs, setUserInputs] = useState({
    topic_name: "",
    topic_description: "",
    course: ""
  });

  // Checking whether the page is edit page or create page
  useEffect(() => {
    if (id) {
      setIsEditPage(true);
    }
  }, [id]);

  // Validation schema
  const topicValidation = Yup.object().shape({
    topic_name: Yup.string().required("Topic name is required!"),
    topic_description: Yup.string()
      .min(3, "Description should be more than 3 words!")
      .required("Topic description is required!"),
  });

  // Creating the topic formik using useFormik hook
  const topicFormik = useFormik({
    initialValues: userInputs,
    validationSchema: topicValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setBtnLoading(true);
      try {
        const response = isEditPage
          ? await updateTopic(id, values)
          : await addTopic(values);
        if (response) {
          setBtnLoading(false);
          toast({
            title: `Topic ${isEditPage ? "Updated" : "Created"}`,
            description: `Success! We have ${
              isEditPage ? "updated" : "created"
            } the requested topic for you!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/admin/adminDashboard/topics");

          // Calling the topics list api
          getTopics();
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
    <form onSubmit={topicFormik.handleSubmit}>
      <div className="flex flex-col gap-5 justify-center my-10 w-full">
        <div className="flex justify-center md:justify-between flex-wrap gap-5">
          <div className="flex items-center flex-wrap gap-5"> 
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => {
                navigate("/admin/adminDashboard/topics");
                getTopics();
              }}
            />
            <h1 className="text-[35px] font-[800]">
              {isEditPage ? "Editar o eliminar temática" : "Create Topic"}
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
              {isEditPage ? " Actualizar" : "Guardar"}
            </Button>
            {isEditPage && (
              <Button
                colorScheme="red"
                leftIcon={!deleteBtnLoading && isEditPage && <DeleteIcon />}
                onClick={() => handleDelete(id)}
                className="flex gap-2 items-center"              >
                {deleteBtnLoading && <Spinner size="sm" />}Eliminar temática
              </Button>
            )}
          </div>
        </div>

        <TopicForm
          userId={id}
          isEditPage={isEditPage}
          userInputs={userInputs}
          setUserInputs={setUserInputs}
          topicFormik={topicFormik}
        />
      </div>
    </form>
  );
}
