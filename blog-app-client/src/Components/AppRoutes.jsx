import {BrowserRouter, Route, Routes} from "react-router-dom";
import Blog from "./Blog.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Blog/>}></Route>
                <Route path="/SignIn" element={<SignIn/>}></Route>
                <Route path="/SignUp" element={<SignUp/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}