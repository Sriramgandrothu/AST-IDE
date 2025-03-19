"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Code, Globe, Zap, Lightbulb, Layers, Share2 } from 'lucide-react'

export default function AboutPage() {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: false, amount: 0.3 })

    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], [0, -100])

    // Refs for each section
    const htmlRef = useRef(null)
    const cssRef = useRef(null)
    const jsRef = useRef(null)

    const htmlInView = useInView(htmlRef, { once: true, amount: 0.5 })
    const cssInView = useInView(cssRef, { once: true, amount: 0.5 })
    const jsInView = useInView(jsRef, { once: true, amount: 0.5 })

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white overflow-hidden">

            {/* Hero section */}
            <section className="relative pt-20 pb-16 px-4 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                </motion.div>

                <div className="container mx-auto max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.3,
                            }}
                            className="inline-block mb-6 p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full"
                        >
                            <Code size={40} className="text-primary" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-3xl sm:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
                        >
                            About AST's Web Compiler
                        </motion.h1>

                        <motion.p
                             className="text-gray-400 text-center p-3 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            A powerful tool designed for developers to compile and share HTML, CSS, and JavaScript code instantly.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2,
                                },
                            },
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        {[
                            {
                                icon: <Globe className="h-8 w-8 text-purple-400" />,
                                title: "Web Development Made Easy",
                                description: "Build and test your web projects in real-time with instant feedback and previews.",
                            },
                            {
                                icon: <Zap className="h-8 w-8 text-primary" />,
                                title: "Lightning Fast Compilation",
                                description: "Experience instant compilation with our optimized engine built for performance.",
                            },
                            {
                                icon: <Share2 className="h-8 w-8 text-blue-400" />,
                                title: "Share Your Creations",
                                description: "Generate shareable links to collaborate with teammates or showcase your work.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                            >
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 3D rotating code blocks */}
            <section className="py-20 px-4 relative">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Power of Web Technologies</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Our compiler brings together the three core technologies of the web to help you build amazing projects.
                        </p>
                    </motion.div>

                    {/* HTML Section */}
                    <motion.div
                        ref={htmlRef}
                        className="flex flex-col md:flex-row items-center gap-8 mb-24"
                        initial={{ opacity: 0, x: -100 }}
                        animate={htmlInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            className="flex-1 order-2 md:order-1"
                            initial={{ opacity: 0 }}
                            animate={htmlInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold mb-4 text-orange-400">HTML</h3>
                            <h4 className="text-xl mb-4">The Structure</h4>
                            <p className="text-gray-300 mb-6">
                                HTML (HyperText Markup Language) is the backbone of any webpage. It provides the structure and semantics
                                that make web content accessible and meaningful.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Semantic elements for better accessibility",
                                    "Universal browser support",
                                    "Easy to learn and implement",
                                    "Foundation for SEO optimization",
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={htmlInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                        className="flex items-start gap-2"
                                    >
                                        <Lightbulb className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="flex-1 order-1 md:order-2 p-1 bg-gradient-to-br from-orange-500/20 to-orange-300/10 rounded-lg w-full"
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={htmlInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-2 text-xs text-gray-400">index.html</div>
                                </div>
                                <div className="code-editor-container max-h-[400px] overflow-y-auto ">
                                    <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-words">
                                        <code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Awesome Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Site</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section class="hero">
      <h2>Build Amazing Websites</h2>
      <p>Start your journey today!</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>
  
  <script src="app.js"></script>
</body>
</html>`}</code>
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* CSS Section */}
                    <motion.div
                        ref={cssRef}
                        className="flex flex-col md:flex-row items-center gap-8 mb-24"
                        initial={{ opacity: 0, x: 100 }}
                        animate={cssInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, rotateY: -90 }}
                            animate={cssInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex-1 order-1 p-1 bg-gradient-to-br from-blue-500/20 to-blue-300/10 rounded-lg w-full"
                        >
                            <div className="bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-2 text-xs text-gray-400">styles.css</div>
                                </div>
                                <div className="code-editor-container max-h-[400px] overflow-y-auto">
                                    <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-words">
                                        <code>{`/* Global styles */
:root {
  --primary: #3490dc;
  --secondary: #ffed4a;
  --dark: #2d3748;
  --light: #f7fafc;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: var(--dark);
  background: var(--light);
  margin: 0;
  padding: 0;
}

/* Header styles */
header {
  background: var(--primary);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
}

/* Hero section */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 2rem;
}

/* Responsive design */
@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    gap: 0.5rem;
  }
}`}</code>
                                    </pre>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex-1 order-2"
                            initial={{ opacity: 0 }}
                            animate={cssInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">CSS</h3>
                            <h4 className="text-xl mb-4">The Style</h4>
                            <p className="text-gray-300 mb-6">
                                CSS (Cascading Style Sheets) brings your web pages to life with colors, layouts, and animations. It
                                transforms the basic structure into visually appealing designs.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Create responsive designs for all devices",
                                    "Implement beautiful animations and transitions",
                                    "Maintain consistent branding across your site",
                                    "Separate design from content for better maintenance",
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={cssInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                        className="flex items-start gap-2"
                                    >
                                        <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* JavaScript Section */}
                    <motion.div
                        ref={jsRef}
                        className="flex flex-col md:flex-row items-center gap-8"
                        initial={{ opacity: 0, x: -100 }}
                        animate={jsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            className="flex-1 order-2 md:order-1"
                            initial={{ opacity: 0 }}
                            animate={jsInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold mb-4 text-yellow-400">JavaScript</h3>
                            <h4 className="text-xl mb-4">The Functionality</h4>
                            <p className="text-gray-300 mb-6">
                                JavaScript brings interactivity and dynamic behavior to web pages. It allows you to create complex
                                applications that respond to user actions in real-time.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Create interactive user interfaces",
                                    "Manipulate data and content dynamically",
                                    "Communicate with servers and APIs",
                                    "Build full-scale web applications",
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={jsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                        className="flex items-start gap-2"
                                    >
                                        <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="flex-1 order-1 md:order-2 p-1 bg-gradient-to-br from-yellow-500/20 to-yellow-300/10 rounded-lg w-full"
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={jsInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-2 text-xs text-gray-400">app.js</div>
                                </div>
                                <div className="code-editor-container max-h-[400px] overflow-y-auto">
                                    <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-words">
                                        <code>{`// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const heroSection = document.querySelector('.hero');
const navLinks = document.querySelectorAll('nav a');

// Theme toggling functionality
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Save preference to localStorage
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update button text
  themeToggle.textContent = isDarkMode 
    ? 'Switch to Light Mode' 
    : 'Switch to Dark Mode';
});

// Smooth scrolling for navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Fetch data from API
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    
    // Process and display the data
    displayData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Initialize the application
function init() {
  // Check for saved theme preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Switch to Light Mode';
  }
  
  // Load initial data
  fetchData();
}

// Start the app
init();`}</code>
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Real-world applications */}
            <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-950 relative">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Real-World Applications</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            The combination of HTML, CSS, and JavaScript powers countless applications across the web.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {[
                            {
                                title: "E-commerce Platforms",
                                icon: <Layers className="h-6 w-6" />,
                                description:
                                    "Build online stores with product catalogs, shopping carts, and secure checkout processes.",
                            },
                            {
                                title: "Social Media Applications",
                                icon: <Share2 className="h-6 w-6" />,
                                description: "Create interactive platforms for sharing content, messaging, and connecting with others.",
                            },
                            {
                                title: "Content Management Systems",
                                icon: <Layers className="h-6 w-6" />,
                                description: "Develop systems for creating, managing, and publishing digital content efficiently.",
                            },
                            {
                                title: "Educational Platforms",
                                icon: <Lightbulb className="h-6 w-6" />,
                                description:
                                    "Build interactive learning environments with quizzes, progress tracking, and multimedia content.",
                            },
                            {
                                title: "Portfolio Websites",
                                icon: <Code className="h-6 w-6" />,
                                description: "Showcase your work and skills with beautiful, responsive portfolio websites.",
                            },
                            {
                                title: "Web Applications",
                                icon: <Globe className="h-6 w-6" />,
                                description: "Create powerful applications that run in the browser, from productivity tools to games.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-primary/10"
                            >
                                <div className="mb-4 text-primary">{item.icon}</div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.7 }}
                        className="w-full max-w-5xl mt-12 text-center z-10 pt-8 border-t border-gray-800"
                    >
                        <p className="text-gray-400 text-sm">Made with ❤️</p>
                        <p className="text-gray-300 font-medium mt-1">Team AST</p>
                        <p className="text-gray-400 text-xs mt-3">Developed by Sriram Gandrothu</p>
                        <p className="text-gray-500 text-xs mt-2">© 2025 All Rights Reserved</p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
