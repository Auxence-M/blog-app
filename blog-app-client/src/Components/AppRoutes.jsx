import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Blog from "./Blog.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import HomePage from "./HomePage.jsx";
import BlogDetail from "./BlogDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Blog></Blog>,
        children: [
            {index:  true, element: <HomePage />},
            {path: "/blogs/:id", element: <BlogDetail />},
        ]
    },
    {path: "/SignIn", element: <SignIn />},
    {path: "/SignUp", element: <SignUp />},
])

export default function AppRoutes() {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}