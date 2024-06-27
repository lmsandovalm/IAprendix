import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Heading, IconButton, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTests } from "../../contexts/TestContext";
import TestForm from "../../components/test-components/TestForm";

import * as Yup from "yup";
import { useFormik } from "formik";
import { addTest, updateTest } from "../../services/TestService";

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditPage, setIsEditPage] = useState(false);

  // State to handle button loading
  const [btnLoading, setBtnLoading] = useState(false);

  // Getting the contexts
  const { handleDelete, toast, getTests, deleteBtnLoading } = useTests();

  // State to store user inputs
  const [userInputs, setUserInputs] = useState({
    name_test: "",
    description_test: "",
    
  });

  // Checking whether the page is edit page or create page
  useEffect(() => {
    if (id) {
      setIsEditPage(true);
    }
  }, [id]);

  // Validation schema
  const testValidation = Yup.object().shape({
    name_test: Yup.string().required("Test name is required!"),
    description_test: Yup.string()
      .min(3, "Description should be more than 3 words!")
      .required("Test description is required!"),
  });

  // Creating the test formik using useFormik hook
  const testFormik = useFormik({
    initialValues: userInputs,
    validationSchema: testValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setBtnLoading(true);
      try {
        const response = isEditPage
          ? await updateTest(id, values)
          : await addTest(values);
        if (response) {
          setBtnLoading(false);
          toast({
            title: `Test ${isEditPage ? "Updated" : "Created"}`,
            description: `Success! We have ${
              isEditPage ? "updated" : "created"
            } the requested test for you!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/admin/adminDashboard/tests");

          // Calling the tests list api
          getTests();
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
    <form onSubmit={testFormik.handleSubmit}>
      <div className="flex flex-col gap-5 justify-center my-10 w-full">
        <div className="flex justify-center md:justify-between flex-wrap gap-5">
          <div className="flex items-center flex-wrap gap-5"> 
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => {
                navigate("/admin/adminDashboard/tests");
                getTests();
              }}
            />
            <h1 className="text-[35px] font-[800]">
              {isEditPage ? "Editar o eliminar test" : "Crear Test"}
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
                className="flex gap-2 items-center"
              >
                {deleteBtnLoading && <Spinner size="sm" />}Eliminar test
              </Button>
            )}
          </div>
        </div>

        <TestForm
          testId={id}
          isEditPage={isEditPage}
          userInputs={userInputs}
          setUserInputs={setUserInputs}
          testFormik={testFormik}
        />
      </div>
    </form>
  );
}
