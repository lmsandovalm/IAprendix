import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react';

function TestGameUser() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://nodebackend-vv0e.onrender.com/api/v1/test/find/6675b8f8b9536ac62396a452'
        );
        setQuestions(response.data.data.questions_test);
        console.log(response.data.data.questions_test);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleOptionClick = (answerType) => {
    setAnswers([...answers, answerType]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const counts = answers.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    const mostFrequentId = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
    alert(`La opción más seleccionada es: ${mostFrequentId}`);
  };

  return (
    <Box bg="blue.900" minH="100vh" color="white">
      <Center>
        <VStack spacing={6} mt={10} textAlign="center">
          {currentQuestionIndex < questions.length ? (
            <Box>
              <Heading as="h2" size="xl">
                {questions[currentQuestionIndex].question_name}
              </Heading>
              <Text fontSize="lg" mt={4}>
                {questions[currentQuestionIndex].question_description}
              </Text>
              <VStack mt={8} spacing={4}>
                {questions[currentQuestionIndex].answers_question.map((option) => (
                  <Button
                    key={option._id}
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => handleOptionClick(option.answer_type)}
                  >
                    {option.answer_question}
                  </Button>
                ))}
              </VStack>
            </Box>
          ) : (
            <Heading as="h2" size="xl">
              Cargando preguntas...
            </Heading>
          )}
        </VStack>
      </Center>
    </Box>
  );
}

export default TestGameUser;
