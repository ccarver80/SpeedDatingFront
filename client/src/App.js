import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { CallAPI, API_URL } from "./Components/common";
import { Dashboard, Home, Profile } from "./Components/Pages";
import { Protected } from "./Components/Protected";
import { PublicProfile } from "./Components/Pages/PublicProfile";
export const App = () => {
  return (
    // Add class name to this div to style entire background
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<PublicProfile />} />
        </Route>
      </Routes>
    </div>
  );
};
