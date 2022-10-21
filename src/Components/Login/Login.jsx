import React, { useEffect, useState } from 'react';
import { loadWeb3 } from "../../api";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Confirm from '../Confirm';
import '../Login_main.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import Web3 from "web3";
import { loadWeb4 } from '../../api2';
import { API } from '../../Redux/actions/API';

var bol = false;
function Login_main({ notify }) {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false)
  const [uid, setuid] = useState();
  const [openLogin, setOpenLogin] = useState(false);
  const [address, setaddress] = useState('');
  const [connected, setconnected] = useState('MetaMask is not connected..!..Wait...')

  const callapi = async () => {
    setloader(true)

    if (uid.length > 6) {
      try {
        console.log("logindata_Address",)
        console.log("uid", uid);
        let res = await API.get(`/login?id='${uid}'`);
        console.log("logindata", res.data.data)
        if (res.data.data !== 0) {

          toast.success('Login Successfully')
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate('/Home')
        } else {
          toast.error("Something went wrong ! ");

        }
      } catch (e) {
        console.log("e", e);
      }

    } else {
      try {
        console.log("uid", uid);
        let res = await API.get(`/login?id=${uid}`);
        console.log("logindata", res.data.data)
        if (res.data.data !== 0) {

          toast.success('Login Successfully')
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate('/Home')
        } else {
          toast.error("Something went wrong ! ");

        }
      } catch (e) {
        console.log("e", e);
      }

    }
    setloader(false)

  }
  var NetId

  const ConnectToMetaMask = async () => {

    setloader(true)

    const web3 = window.web3;
    window.web3 = new Web3(window.ethereum);

    await window.web3.eth.getChainId((err, netId) => {

      NetId = netId
    }
    )

    console.log("netId", NetId);
    let acc
    if (NetId == 56) {
      acc = await loadWeb4();

    } else {
      acc = await loadWeb3();

    }


    if (acc == 'No Wallet') {
      notify('No Wallet')
    }
    else if (acc == 'Wrong Network') {
      notify('Wrong Network')
    }
    else {


      let res = await axios.post('https://ulematic-live-api.herokuapp.com/CheckRegisterUser', {
        "accountnumber": acc
      })


      console.log("CheckRegiter", res.data.data);

      if (res.data.data.result == "Free Registered. Please Pay payment !!") {
      
        if (NetId == 56) {
          navigate('/Registration_with_BNB')
    
        } else {
          navigate('/Register_with_Matic')
        
    
        }
      }else if(res.data.data.result == "Already Registered !!"){
      
        let res = await API.get(`/login?id='${acc}'`);
        console.log("logindata", res.data.data)
        if (res.data.data !== 0) {
          toast.success('Login Successfully')
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate('/Home')
        } else {
          toast.error("Something went wrong ! ");

        }
      }

      setuid(acc)

      setaddress(acc)
      setconnected('MetaMask is connected... Ready To Go')
    }
    setloader(false)

  }

  useEffect(() => {
    ConnectToMetaMask()
  }, [])
  
  return (
    <div className='row m-0 justify-content-center align-items-center' style={{ height: '100vh' }}>

      {openLogin && <Confirm handleLogin={callapi} setRegistered={setOpenLogin} />}
      {/* {loader == true ? <Spinner /> : <></>} */}
      <div className=' col-md-4 col-lg-3  mainForm'>
        <div className="main_form">

          <img src="logo.png" width="150px" alt="" />
          <h4 className='hh mb-2'>Login</h4>
          <p className='peera'>Automatic login if you have Tron wallet:</p>
          {connected == 'MetaMask is not connected..!..Wait...' ? <p className='peera2' style={{ color: 'red' }}>{connected}</p> : <p className='peera2 pt-3' style={{ color: 'green' }}>{connected}</p>}

          <div className="batan">
            <div className="btn left-btn-styl loginbtn text-de lg-btn" onClick={ConnectToMetaMask}>Automatic Login</div>
            <input className='btn left-btn-styl text-de lg-btn' name='signin' defaultValue={uid} placeholder='Please enter ID or Metamask address' onChange={(e) => {
              setuid(e.target.value)
            }} />
            <button className="btn left-btn-styl loginbtn text-de lg-btn" onClick={() => {
              setOpenLogin(true)
            }}>Login</button>

            <button className="btn left-btn-styl loginbtn text-de lg-btn" onClick={() => {
              navigate('/')
            }}>Go To Home</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login_main