import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/UserDashboard";
import CourseListPage from "./pages/Courses/CourseListPage";
import CoursePage from "./pages/Courses/CoursePage";
import TopicPage from "./pages/Topics/TopicPage";
import TopicListPage from "./pages/Topics/TopicListPage";
import MaterialTopicPage from "./pages/MaterialTopics/MaterialTopicPage";
import MaterialTopicListPage from "./pages/MaterialTopics/MaterialTopicListPage";
import LandingPage from "./pages/LandingPage";
import TestGameUser from "./pages/TestGame/TestGameUser";
import TestListPage from "./pages/TestPages/TestListPage";
import TestPage from "./pages/TestPages/TestPage";

export const routes = [
    {
        path: '/',
        element: LandingPage
    },
    {
        path: '/login',
        element: Login
    },
    {
        path: '/register',
        element: Register
    },
    {
        path: '/userDashboard',
        element: UserDashboard
    },    
    {
        path: '/tests',
        element: TestListPage
    },    
    {
        path: '/test',
        element: TestPage
    },    
    {
        path: '/test/:id',
        element: TestPage
    },
    {
        path: '/testGameUser',
        element: TestGameUser
    },    
    {
        path: '/courses',
        element: CourseListPage
    },
    {
        path: '/course',
        element: CoursePage
    },
    {
        path: '/course/:id',
        element: CoursePage
    },
    {
        path: '/topics',
        element: TopicListPage
    },
    {
        path: '/topic',
        element: TopicPage
    },
    {
        path: '/topic/:id',
        element: TopicPage
    },
    {
        path: '/materials',
        element: MaterialTopicListPage
    },
    {
        path: '/materialTopic',
        element: MaterialTopicPage
    },
    {
        path: '/materialTopic/:id',
        element: MaterialTopicPage
    }   
   
]