  import React, { useContext, useEffect } from "react";
  import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
  import Layout from "./layout/Layout";
  import Login from "./pages/auth/Login";
  import Register from "./pages/auth/Register";
  import LandingPage from "./pages/LandingPage";
  import Sidebar from "./components/Sidebar";

  import { AuthContext } from "./contexts/AuthProvider";
  import AdminSidebar from "./components/AdminSidebar";
  import CourseListPage from "./pages/Courses/CourseListPage";
  import CoursePage from "./pages/Courses/CoursePage";
  import TopicListPage from "./pages/Topics/TopicListPage";
  import TopicPage from "./pages/Topics/TopicPage";
  import MaterialTopicListPage from "./pages/MaterialTopics/MaterialTopicListPage";
  import MaterialTopicPage from "./pages/MaterialTopics/MaterialTopicPage";
  import TestGameUser from "./pages/TestGame/TestGameUser";
import TestListPage from "./pages/TestPages/TestListPage";
import TestPage from "./pages/TestPages/TestPage";

  export default function App() {
    const ProtectedLayout = ({ children }) => {
      const { user } = useContext(AuthContext);
      const navigate = useNavigate();

      useEffect(() => {
        if (!user) {
          navigate("/login");
        }
      }, [user, navigate]);

      if (!user || !user.role.name_role) {
        return null;
      }

      return (
        <div className="flex h-screen">
          {user.role.name_role === "admin" ? <AdminSidebar /> : <Sidebar />}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </div>
        </div>
      );
    };

    const UserDashboard = () => {
      const { user } = useContext(AuthContext);
    
      if (user.role.name_role === "user") {
        return <TestGameUser />;
      } else {
        return <p>Hola!</p>;
      }
    };









    return (
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<LandingPage />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedLayout>
                <Outlet />
              </ProtectedLayout>
            }
          >
            <Route path="adminDashboard" element={<Layout />}>
              <Route path="courses" element={<CourseListPage />} />
              <Route path="course" element={<CoursePage />} />
              <Route path="course/:id" element={<CoursePage />} />
              <Route path="topics" element={<TopicListPage />} />
              <Route path="topic" element={<TopicPage />} />
              <Route path="topic/:id" element={<TopicPage />} />
              <Route path="materials" element={<MaterialTopicListPage />} />
              <Route path="materialTopic" element={<MaterialTopicPage />} />
              <Route path="materialTopic/:id" element={<MaterialTopicPage />} />
              <Route path="tests" element={<TestListPage />} />
              <Route path="test" element={<TestPage />} />
              <Route path="test/:id" element={<TestPage />} />
            </Route>
          </Route>

          <Route
            path="/user/*"
            element={
              <ProtectedLayout>
                <Outlet />
              </ProtectedLayout>
            }
          >
            <Route path="userDashboard" element={<Layout />}> 
              <Route path="courses" element={<CourseListPage />} />
              <Route path="tests" element={<TestGameUser />} />
            </Route>
          </Route>
        </Routes>
      </>
    );
  }
