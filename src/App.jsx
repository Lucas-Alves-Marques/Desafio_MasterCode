import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login.jsx';
import Main from "./Components/Main/Main.jsx";
import DashBoards from "./Components/Dashboards/Dashboards.jsx";
import User from "./Components/Forms/User/User.jsx";
import CustomerService from "./Components/Forms/CustomerService/CustomerService.jsx";
import CustomerSatisf from "./Components/Forms/CustomerSatisfaction/CustomerSatisf.jsx";
import StockQuantity from "./Components/Forms/StockQuantity/StockQuantity.jsx";
import Service from "./Components/Forms/Services/Services.jsx";
import Courses from "./Components/Forms/Courses/Courses.jsx";

function App() {

  return (


      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/dashboards" element={<DashBoards />} />
          <Route path="/edit/users" element={<User />} />
          <Route path="/edit/customerser" element={<CustomerService />} />
          <Route path="/edit/customersat" element={<CustomerSatisf />} />
          <Route path="/edit/stockquant" element={<StockQuantity />} />
          <Route path="/edit/services" element={<Service />} />
          <Route path="/edit/courses" element={<Courses />} />

        </Routes>

      </BrowserRouter>

  )
}

export default App;
