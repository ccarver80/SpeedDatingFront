import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { CallAPI, API_URL } from "./Components/common";
import { Dashboard, Home, Profile } from "./Components/Pages";
import { Protected } from "./Components/Protected";
import { ChatRoom } from "./Components/Pages/ChatRoom";
export const App = () => {
  return (
    // Add class name to this div to style entire background
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatRoom/:id" element={<ChatRoom />} />
        </Route>
      </Routes>
    </div>
  );
};
