import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Blog from "./Blog.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import HomePage from "./HomePage.jsx";
import BlogDetails from "./BlogDetails.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import BlogsByUser from "./BlogsByUser.jsx";
import CreateBlog from "./CreateBlog.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Blog />,
        children: [
            {index:  true, element: <HomePage />},
            {path: "/blogs/:id", element: <BlogDetails />},
            {path: "/your-posts/:id", element: <PrivateRoutes><BlogsByUser /></PrivateRoutes>},
            {path: "/create", element: <PrivateRoutes><CreateBlog /></PrivateRoutes>},
        ]
    },
    {path: "/sign-in", element: <SignIn />},
    {path: "/sign-up", element: <SignUp />},
]);

export default function AppRoutes() {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}