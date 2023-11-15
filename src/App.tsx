// Modules/Packages
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Context (Local Data)
import { APIDataContexProvider } from "./context/APIDataContext";

// Pages
import Home from "./pages/Home";
import Info from "./pages/Info";

const App = () => {
    return (
        <APIDataContexProvider>
            <AnimatePresence>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/info' element={<Info />} />
                </Routes>
            </AnimatePresence>
        </APIDataContexProvider>
    )
}

export default App;
