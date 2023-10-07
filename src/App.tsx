import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import { AnimatePresence } from "framer-motion";

const App = () => {
    return (
        <AnimatePresence>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/info' element={<Info />} />
            </Routes>
        </AnimatePresence>
    )
}

export default App;
