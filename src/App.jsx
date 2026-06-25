import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Hero from "./sections/Hero"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"

function App() {

  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <Hero />
    <Skills />
    <Projects />
    <About />
    <Contact /> 
    <Footer />
    

    </div>
  )
}

export default App
