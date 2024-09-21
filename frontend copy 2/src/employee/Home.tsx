// import React from "react";
import Navbar from './navbar.tsx';
import Users from './Users.tsx';
// import {Routes, Route,} from "react-router-dom";
// import UserCreate from "./UsersCreate.tsx";
// import { BrowserRouter } from "react-router-dom";
// import UsersUpdate from "./UsersUpdate.tsx";

function Home() {
    return (
        <>
            <Navbar />
            <Users/>
            {/* <Routes>
                <Route path="/" element={<Users/>} />
                <Route path="/employee/create" element={<UserCreate/>} />
                <Route path="/employee/update/:id" element={<UsersUpdate/>} />
            </Routes> */}
        </>
    )
}

export default Home