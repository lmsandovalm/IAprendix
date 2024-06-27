import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Heading, IconButton, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMaterialTopics } from "../../contexts/MaterialTopicContext";
import MaterialTopicForm from "../../components/materialTopic-components/MaterialTopicForm";

import * as Yup from "yup";
import { useFormik } from "formik";
import { addMaterialTopic, updateMaterialTopic } from "../../services/MaterialTopicService";

export default function MaterialTopicPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditPage, setIsEditPage] = useState(false);

  // State to handle button loading
  const [btnLoading, setBtnLoading] = useState(false);

  // Getting the contexts
  const { handleDelete, toast, getMaterialTopics, deleteBtnLoading } = useMaterialTopics();

  // State to store user inputs
  const [userInputs, setUserInputs] = useState({
    material_name: "",
    material_description: "",
    idTopic: "",
    material_style: ""
  });

  // Checking whether the page is edit page or create page
  useEffect(() => {
    if (id) {
      setIsEditPage(true);
    }
  }, [id]);

  // Validation schema
  const materialTopicValidation = Yup.object().shape({
    material_name: Yup.string().required("Material name is required!"),
    material_description: Yup.string()
      .min(3, "Description should be more than 3 words!")
      .required("Material description is required!"),
  });

  // Creating the material topic formik using useFormik hook
  const materialTopicFormik = useFormik({
    initialValues: userInputs,
    validationSchema: materialTopicValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setBtnLoading(true);
      try {
        const response = isEditPage
          ? await updateMaterialTopic(id, values)
          : await addMaterialTopic(values);
        if (response) {
          setBtnLoading(false);
          toast({
            title: `Material topic ${isEditPage ? "Updated" : "Created"}`,
            description: `Success! We have ${
              isEditPage ? "updated" : "created"
            } the requested material topic for you!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/admin/adminDashboard/materials");

          // Calling the material topics list api
          getMaterialTopics();
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
    <form onSubmit={materialTopicFormik.handleSubmit}>
      <div className="flex flex-col gap-5 justify-center my-10 w-full">
        <div className="flex justify-center md:justify-between flex-wrap gap-5">
          <div className="flex items-center flex-wrap gap-5"> 
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => {
                navigate("/admin/adminDashboard/materials");
                getMaterialTopics();
              }}
            />
            <h1 className="text-[35px] font-[800]">
              {isEditPage ? "Edit or Delete Material Topic" : "Create Material Topic"}
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
                {deleteBtnLoading && <Spinner size="sm" />}Eliminar material
              </Button>
            )}
          </div>
        </div>

        <MaterialTopicForm
          userId={id}
          isEditPage={isEditPage}
          userInputs={userInputs}
          setUserInputs={setUserInputs}
          materialTopicFormik={materialTopicFormik}
        />
      </div>
    </form>
  );
}
