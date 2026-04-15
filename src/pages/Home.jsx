import { useState, useEffect } from "react";
import { sendMessage } from "../services/dataService";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

const Home = () => {

  const [formData, setFormData] = useState({
    name: "Profile Viewer",
    email: "profileviewer@email.com",
    message: "Hi Sandile, someone viewed your portfolio.",
  });

  useEffect (() => {
    const submitMessage = async () => {
      try {
        sendMessage(formData);
        console.log("Portfolio viewer notification sent.");
        setFormData({ name: "", email: "", message: "" });
      } catch(error) {
        console.log("Error sending message: ", error); 
      }
    }

    submitMessage();
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;