import React from "react";
import AboutSection from "../components/about";
import Breadcrumb from "../components/breadcrumb";
import Featured from "../components/featured";
import Layout from "../Layout";

const About = () => {
  return (
    <Layout>
      <Breadcrumb pageTitle='About' />
      <AboutSection />
      <Featured />
    </Layout>
  );
};

export default About;
