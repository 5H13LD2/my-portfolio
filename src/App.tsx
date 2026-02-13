import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main
        className={`transition-all duration-300 ease-in-out ${
          isMobile ? "pt-0" : ""
        }`}
      >
        <Home />
      </main>
      <div className={`${isMobile ? "" : "ml-96"}`}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
