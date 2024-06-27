import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./contexts/AuthProvider.jsx";
import CourseProvider from "./contexts/CourseContext.jsx";
import TopicProvider from "./contexts/TopicContext.jsx";
import MaterialTopicProvider from "./contexts/MaterialTopicContext.jsx";
import LearningStyleProvider from "./contexts/LearningStyleContext.jsx";
import TestProvider from "./contexts/TestContext.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthProvider>
        <CourseProvider>
          <TopicProvider>
            <MaterialTopicProvider>
              <LearningStyleProvider>
                <TestProvider>
                  <App />
                </TestProvider>
              </LearningStyleProvider>
            </MaterialTopicProvider>
          </TopicProvider>
        </CourseProvider>
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>
);
