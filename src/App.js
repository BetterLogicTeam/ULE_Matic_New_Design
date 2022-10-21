import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Index_main from "./Components/Index_main";
import Login_main from "./Components/Login/Login";
// import Login from "./Components/Login/Login";
import Register_main from "./Components/Register_main";
import Registration_with_BNB from "./Components/Registration_with_BNB";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Profile from "./Containers/Profile/Profile";
import ActivateHistory from "./Routes/Activation/ActivateHistory";
import RegistrationHistory from "./Routes/Activation/RegistrationHistory";
import Activation_bnb from "./Routes/Activation/Activation_bnb";
import Activation_matic from "./Routes/Activation/Activation_matic";
import Contract_Address from "./Routes/Address/Contract_Address";
import Self_Address from "./Routes/Address/Self_Address";
import Augmented_Reward from "./Routes/All Reward/Augmented_Reward";
import Auto_Club_Reward from "./Routes/All Reward/Auto_Club_Reward";
import Daily_Yield_Reward from "./Routes/All Reward/Daily_Yield_Reward";
import Direct_Referral_Reward from "./Routes/All Reward/Direct_Referral_Reward";
import Forum_Reward from "./Routes/All Reward/Forum_Reward";
import Registration_Direct_Reward from "./Routes/All Reward/Registration_Direct_Reward";
import Registration_Quarterly_Reward from "./Routes/All Reward/Registration_Quarterly_Reward";
import Withdrawal_BNB from "./Routes/History/Withdrawal_BNB";
import Withdrawal_history from "./Routes/History/Withdrawal_history";
import Withdrawal_Matic from "./Routes/History/Withdrawal_Matic";
import Club_Downline from "./Routes/Team Details/Club_Downline";
import Club_View from "./Routes/Team Details/Club_View";
import Forum_Direct from "./Routes/Team Details/Forum_Direct";
import Forum_View from "./Routes/Team Details/Forum_View";
import My_Forum from "./Routes/Team Details/My_Forum";
import My_Referral from "./Routes/Team Details/My_Referral";
import My_Team from "./Routes/Team Details/My_Team";
import Home from "./Routes/Home/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* <Route /> */}
          <Route exact path="/" element={<Index_main />} />
          <Route exact path="/Login_main" element={<Login_main />} />
          <Route exact path="/Register_with_Matic" element={<Register_main />} />
          <Route exact path="/Registration_with_BNB" element={<Registration_with_BNB />} />



          {/* <Route exact path='Dashboard'> */}
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Activation_bnb" element={<Activation_bnb />} />
          <Route exact path="/Activation_matic" element={<Activation_matic />} />
          <Route exact path="/ActivateHistory" element={<ActivateHistory />} />
          <Route exact path="/RegistrationHistory" element={<RegistrationHistory />} />
          <Route exact path="/Self_Address" element={<Self_Address />} />
          <Route exact path="/Contract_Address" element={<Contract_Address />} />
          <Route exact path="/Augmented_Reward" element={<Augmented_Reward />} />
          <Route exact path="/Auto_Club_Reward" element={<Auto_Club_Reward />} />
          <Route exact path="/Daily_Yield_Reward" element={<Daily_Yield_Reward />} />
          <Route exact path="/Direct_Referral_Reward" element={<Direct_Referral_Reward />} />
          <Route exact path="/Forum_Reward" element={<Forum_Reward />} />
          <Route exact path="/Registration_Direct_Reward" element={<Registration_Direct_Reward />} />
          <Route exact path="/Registration_Quarterly_Reward" element={<Registration_Quarterly_Reward />} />
          <Route exact path="/Withdrawal_BNB" element={<Withdrawal_BNB />} />
          <Route exact path="/Withdrawal_Matic" element={<Withdrawal_Matic />} />
          <Route exact path="/Withdrawal_history" element={<Withdrawal_history />} />
          <Route exact path="/Club_Downline" element={<Club_Downline />} />
          <Route exact path="/Club_View" element={<Club_View />} />
          <Route exact path="/Forum_Direct" element={<Forum_Direct />} />
          <Route exact path="/Forum_View" element={<Forum_View />} />
          <Route exact path="/My_Forum" element={<My_Forum />} />
          <Route exact path="/My_Referral" element={<My_Referral />} />
          <Route exact path="/My_Team" element={<My_Team />} />
          <Route exact path="/Profile" element={<Profile />} />
          {/* </Route> */}
          {/* <Route /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
