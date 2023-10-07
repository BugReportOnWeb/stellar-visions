import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/info' element={<Info />}/>
        </Routes>
    )
}

export default App;
