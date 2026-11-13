import "./index.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router";
import { toast } from "sonner";
import AboutScreens from "./screens/about-screens";
import ListScreens from "./screens/about-screens/List";
import WeatherScreens from "./screens/about-screens/Weather";
import { Button } from "./components/ui/button";

function App() {

  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchData2 = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        console.log("response", response);
        toast.success("success");
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
      });
  };

   useEffect(() => {
  console.log("response", fetchData());
  console.log("fetchData2", fetchData2());
   }, []);

  return (
    <div className="flex min-h-screen gap-4 font-bold bg-slate-100 text-black dark:bg-slate-950 dark:text-white transition-colors">
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 flex-row items-center justify-around border-b border-slate-200 bg-white p-4 md:inset-y-0 md:left-0 md:right-auto md:h-screen md:w-64 md:flex-col md:items-start md:justify-start md:gap-4 md:border-b-0 md:border-r dark:bg-zinc-900 dark:border-zinc-800">
        <Link to={"/home"} className="text-blue-600 dark:text-blue-400 hover:underline">Home</Link>
        <Link to={"/about"} className="text-blue-600 dark:text-blue-400 hover:underline">Increment and Decrement</Link>
        <Link to={"/list"} className="text-blue-600 dark:text-blue-400 hover:underline">List of Users</Link>
        <Link to={"/weather"} className="text-blue-600 dark:text-blue-400 hover:underline">Weather forecast</Link>
        <div className="hidden md:block w-full pb-4">
          <Button onClick={toggleTheme} variant="outline" className="w-full">
            {isDark ? "☀️ Light theme " : "🌙 Dark theme"}
          </Button>
        </div>

      </nav>
      <main className="flex-1 pt-20 md:ml-64 md:pt-0">
        <Routes>
          <Route path="/home" element={
            <div className="text-right font-bold text-2xl md:text-4xl">
              Home Page
            </div>
          } />
          <Route path="/about" element={<AboutScreens />} />
          <Route path="/list" element={<ListScreens />} />
          <Route path="/weather" element={<WeatherScreens />} />
        </Routes>
        
      </main>
    </div>
  ); 
}
export default App;
