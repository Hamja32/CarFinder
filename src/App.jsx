import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}

      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
