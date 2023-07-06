import React from "react";
import Header from "../Header/Header.js";

import NavTab from "./NavTab/NavTab.js";
import AboutProject from "./AboutProject/AboutProject.js";
import Techs from "./Techs/Techs.js";
import AboutMe from "./AboutMe/AboutMe.js";
import Portfolio from "./Portfolio/Portfolio.js";

import Footer from "../Footer/Footer.js";

const Main = () => {
  return (
    <>
      <Header style={{ default: false }} />
      <main className="main">
        <NavTab />

        <AboutProject />

        <Techs />

        <AboutMe />

        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Main;
