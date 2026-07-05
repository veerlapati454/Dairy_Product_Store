import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";

import Home from "./components/Home/Home";
import Pasture from "./components/Pasture/Pasture"
import DairyCase from "./components/Dairycase/Dairycase";
import Craft from "./components/Craft/Craft"
import Standards from "./components/Standards/Standards"
 import Login from "./components/Login/Login";
import UserDashboard from "./components/UserDashboard/UserDashboard"
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
 import ScrollToTop from "./components/ScrollToTop";
import Signup from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFound";
function App() {
  return (
    <HashRouter>
      <ScrollToTop/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pasture" element={<Pasture/>}/>
          <Route path="/dairy-case" element={<DairyCase />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/standards" element={<Standards />} />

                  
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin-dashboard/:view?" element={<AdminDashboard/>}/>
         <Route path="/user-dashboard/:view?" element={<UserDashboard/>}/>
         <Route path="*" element={<NotFound/>}/>

      </Routes>
    </HashRouter>
  );
}

export default App;