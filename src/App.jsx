import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* =======================
   THEME TOGGLE
======================= */
const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <motion.button
    className="fixed top-6 right-6 z-50 p-3 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg text-xl"
    onClick={() => setDarkMode(!darkMode)}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {darkMode ? "☀️" : "🌙"}
  </motion.button>
);

/* =======================
   HERO SECTION
======================= */
const Hero = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
    <div className="text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold mb-4"
      >
        Ehsan Shaikh
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-4xl mb-6"
      >
        Frontend / Full-Stack Web Developer
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto mb-10 text-lg"
      >
        Pursuing BSc IT • Real-world production projects • Open to Internship & Junior Roles • India
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <a href="#projects" className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold">
          View Projects
        </a>
        <a href="#contact" className="px-8 py-4 border-2 border-white rounded-full font-semibold">
          Contact Me
        </a>
      </motion.div>
    </div>
  </section>
);

/* =======================
   ABOUT
======================= */
const About = () => (
  <section className="py-24 bg-gray-50 dark:bg-gray-800 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        className="text-4xl font-bold mb-10"
      >
        About Me
      </motion.h2>
      <p className="text-lg leading-relaxed">
        I’m a passionate Frontend & Full-Stack Developer currently pursuing BSc IT.
        I’ve built multiple production-level platforms including booking systems,
        e-commerce websites and automation-focused applications with strong UI/UX.
      </p>
    </div>
  </section>
);

/* =======================
   SKILLS
======================= */
const Skills = () => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Tailwind",
          "Node.js",
          "MongoDB",
          "Git & GitHub",
        ].map((skill) => (
          <div
            key={skill}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl font-semibold"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* =======================
   PROJECTS
======================= */
const Projects = () => (
  <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-14">Projects</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          "DriverSathi – Logistics Platform",
          "Good Time Properties – Villa Booking",
          "Book Your Villa – Rental Platform",
          "Zapcart – E-commerce Website",
          "Zaykafast – Food Ordering App",
          "E-Sports – Tournament Platform",
        ].map((project) => (
          <motion.div
            key={project}
            whileHover={{ scale: 1.03 }}
            className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-3">{project}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Real-world project built with modern UI, animations and scalable architecture.
            </p>
            <a
              href="https://github.com/Zapcart"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 font-semibold"
            >
              View on GitHub →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* =======================
   CONTACT
======================= */
const Contact = () => (
  <section id="contact" className="py-24 px-6">
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
      <p className="mb-6">
        Let’s build something amazing together 🚀
      </p>
      <div className="flex justify-center gap-6">
        <a href="https://github.com/Zapcart" className="font-semibold">GitHub</a>
        <a href="mailto:your@email.com" className="font-semibold">Email</a>
        <a href="https://wa.me/91XXXXXXXXXX" className="font-semibold">WhatsApp</a>
      </div>
    </div>
  </section>
);

/* =======================
   APP
======================= */
export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="font-poppins bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
