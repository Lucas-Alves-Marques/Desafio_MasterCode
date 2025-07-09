import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login.jsx';
import Main from "./Components/Main/Main.jsx";
import DashBoards from "./Components/Dashboards/Dashboards.jsx";
import { DatabaseProvider } from './DataBase/DataBase';
import User from "./Components/Forms/User/User.jsx";
import CustomerService from "./Components/Forms/CustomerService/CustomerService.jsx";

function App() {

  return (

    <DatabaseProvider>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/dashboards" element={<DashBoards />} />
          <Route path="/edit/users" element={<User />} />
          <Route path="/edit/customerser" element={<CustomerService />} />

        </Routes>

      </BrowserRouter>

    </DatabaseProvider>

  )
}

export default App;
