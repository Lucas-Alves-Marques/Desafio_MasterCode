import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login.jsx';
import Main from "./Components/Main/Main.jsx";

function App() {

  return (

    <BrowserRouter>

      <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App;
