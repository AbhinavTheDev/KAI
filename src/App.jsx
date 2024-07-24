import "./App.css";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Utilities } from "./components/index";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <main>
        {/* Passing openModal and closeModal functions to components which takes place of outlet  */}
        <Outlet context={{ openModal, closeModal }} />
        {/* <Outlet context={{ openModal, closeModal }} /> */}
      </main>
      {/* conditional rendering to check modal is open or closed  */}
      {isModalOpen && (
        <Utilities isOpen={isModalOpen} closeModal={closeModal} />
      )}
      <Footer />
    </>
  );
}
