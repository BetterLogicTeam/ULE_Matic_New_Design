import React from 'react'
import { FaTelegram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
// import './BNB.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { tokenAddress, tokenAbi } from '../Utils/token'
import { contractAddress, contractAbi, contractAbiBNB, contractAddressbnb } from '../Utils/contract'
import Spinner from '../Components/Spinner/Spinner'
import './Login_main.css'
import { toast } from 'react-toastify'
import { loadWeb4 } from '../api2.js'
import { API } from '../Redux/actions/API'

export default function Registration_with_BNB({ notify }) {
  const [loader, setloader] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  let [matic, setmatic] = useState(' ')
  let [ule, setule] = useState(' ')
  let [uid, setuid] = useState('')
  const [address, setaddress] = useState('')
  const [selectPosition, setselectPosition] = useState(1)
  const [isVisible, setisVisible] = useState(false)
  const [isVisible1, setisVisible1] = useState(false)

  const [isVisible2, setisVisible2] = useState(false)
  const [connected, setconnected] = useState('MetaMask is not connected..!..Wait...')

  const callapi = async () => {
    setloader(true)

    console.log('position', selectPosition)

    let res = await API.post('/registration_v1', {
      sid: uid,
      accountnumber: address,
      position: selectPosition,
      amount: 10,
      paymentType: "BNB",
      traxn: address,
      // traxn: "0x20938baa39acbdc75b1e6b192a1f4a9782d353c69ea25c80db09a89205d37125"
    })

    console.log("Res", res);
    if (res.data.data.result == "waiting") {
      toast.success('Registered Successfully')
      console.log(res.data)
      setisVisible(false)
      setisVisible2(true)
      localStorage.setItem('NewUserID', res.data.data.outputuid)
      setloader(false)

    } else if( res.data.data.result  =='Sponser ID is not  exists !!!'){
      toast.error('Sponser ID is not  exists !!!')
      setloader(false)
  
  
      
    } else if(res.data.data.result  == 'Please Select Position !!!'){
      toast.error('Please Select Position !!!')
      setloader(false)
  
      
  
    } else {
      toast.error('Account Already Resgistered with this ID')
      navigate('/Login_main')

    }

  }
  const callLoginApi = async () => {

    let res = await API.get(`/login?id='${address}'`)
    console.log('login_data', res)
    if (res.data.data !== 0) {
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('user', JSON.stringify(res.data.data))
      toast.success('Login Successfully')
      navigate("/Home");
    } else {
      toast.error('Something went wrong ! ')
    }
    setloader(false)

  }
  const ConnectToMetaMask = async () => {
    let acc = await loadWeb4()
    if (acc == 'No Wallet') {
      notify('No Wallet')
    } else if (acc == 'Wrong Network') {
      notify('Wrong Network')
    } else {
      let res = await axios.post('https://ulematic-live-api.herokuapp.com/CheckRegisterUser', {
        "accountnumber": acc
      })


      console.log("CheckRegiter", res.data.data);

      if (res.data.data.result == "Free Registered. Please Pay payment !!") {
        setisVisible2(true)
      }
      setaddress(acc)
      setconnected('MetaMask is connected... Ready To Register')
    }
  }
  const cotractCall = async () => {
    setloader(true)
    let acc = await loadWeb4()
    if (acc == 'No Wallet') {
      toast.error('No Wallet')
    } else if (acc == 'Wrong Network') {
      toast.error('Wrong Network')
    } else {
      setaddress(acc)
      setconnected('MetaMask is connected... Ready To Register')
      
      ule = ule.toString()
      // ule =1
      
      
      ule = window.web3.utils.toWei(ule)
      matic = matic.toString()
      // matic = 100000000000
      
      
      matic = window.web3.utils.toWei(matic)
      // console.log("Check_Register");
      console.log("Check_Register",ule);
      console.log("Check_Register",matic);
      try {
        let contract = await new window.web3.eth.Contract(contractAbiBNB, contractAddressbnb)
        let token = await new window.web3.eth.Contract(tokenAbi, tokenAddress)
        let approveCall = await token.methods.approve(contractAddressbnb, ule).send({ from: acc })
        toast.success('Approved')
        let sellCall = await contract.methods.UlebuyRouter(ule).send({ from: acc, value: matic })
        toast.success('Transection Succesfull')
        sellCall = sellCall.transactionHash
        Register_Hash(sellCall)
        setloader(false)


      } catch (err) {
        console.log('error while calling fuction sell', err)
        setloader(false)

      }
    }
  }
  const callMaticUrliApi = async () => {
    let res = await axios.get(`https://ulematic-live-api.herokuapp.com/live_rate_bnb`)
    setmatic(Number(res.data.data[0].usdperunit) * 10)
    console.log('BNB', Number(res.data.data[0].usdperunit) * 10)
  }
  const callUleApi = async () => {
    let res = await axios.get(`https://ulematic-live-api.herokuapp.com/live_rate_Ule_bnb`)
    setule((Number(res.data.data[0].usdperunit)) * 10)
    console.log('ULE', res.data.data[0].usdperunit)
  }
  let Userid = localStorage.getItem('NewUserID')

  const Register_Hash = async (hash) => {
    try {

      let acc = await loadWeb4()
      let res = await API.post('/UpdateRegisterHash', {

        "uid": Userid,
        "accountnumber": acc,
        "traxn": hash
      }
      )

      console.log("Register_Hash",res);
      setloader(true);

      setTimeout(() => {
        callLoginApi(acc)
        // setloader(false);
      }, 60000);
    } catch (e) {
      console.log("Erreo while call ing Register_Hash API", e);
    }
  }
  
  const Register_check=async()=>{
    try{
      setloader(true);
      let res = await API.get(
        `/login?id='${address}'`
      );
      console.log("login_data", res);
      if (res.data.data !== 0) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        toast.success("Login Successfully");
        navigate("/Home");
      } else {
        setisVisible1(true)

        // toast.error("Something went wrong ! ");
        setloader(false);
      }


    }catch(e){

      console.log("Error while calling Check Registration Fuction",e);
    }
  }

  useEffect(() => {
    // Register_Hash()
    setloader(true)
    ConnectToMetaMask()
    callUleApi()
    callMaticUrliApi()

    setloader(false)
    setIsLoading(false)
  }, [])
  return (
    <div>
      <div className="row m-0 justify-content-center align-items-center" style={{ height: '100vh' }}>
        {loader == true ? <Spinner /> : <></>}
        <div className=" col-md-6 col-lg-3  mainForm">
          <div className="main_form">
            <h4 className="hh ">Registration With BNB</h4>
            <p className="peera">Automatic login if you have MetaMask wallet:</p>

            <img src="bnblogo.png" width="150px" alt="" />
            {connected == 'MetaMask is not connected..!..Wait...' ? (
              <p className="peera2" style={{ color: 'red' }}>
                {connected}
              </p>
            ) : (
              <p className="peera2" style={{ color: 'green' }}>
                {connected}
              </p>
            )}

            <div className="batan">
              <button
                className="btn left-btn-styl loginbtn text-de lg-btn"
                onClick={() => Register_check()}
              >
                Register
              </button>


              {/* <div className=" w-100 h-100 d-none justify-content-center align-items-center  position-absolute  modelRegister">
                <div className="  bord bord1 border-dark py-3 px-5 flex-column justify-content-center align-items-center d-flex main_form mainForm">
                  <h4 className=" text-dark fs-5 my-3 color">Enter Upline ID</h4>
                  <input
                    type={'number'}
                    className="btn left-btn-styl text-de lg-btn"
                    onChange={(e) => {
                      setuid(e.target.value)
                    }}
                  />
                  <div className=" mt-4">
                    <button
                      className="btn left-btn-styl loginbtn text-de lg-btn px-3 mx-2"
                      onClick={() => setisVisible(true)}

                    >
                      OK
                    </button>
                    <button
                      className="btn left-btn-styl loginbtn text-de lg-btn px-3 mx-2 "
                      onClick={() => {
                        let modelRegister = document.querySelector('.modelRegister')
                        modelRegister.classList.remove('d-flex')
                        modelRegister.classList.add('d-none')
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>

              </div> */}
              {
                isVisible1 ?
                  <div id="myModal " class="mypop Register_model">
                    <div
                      class="modal-content5 boxset set_transfort2"
                      id="model-add"
                      style={{ marginTop: '-346px', position: 'fixed' }}
                    >
                      <h4 className=" text-dark fs-5 my-3 color text-white">Enter Upline ID</h4>
                      <input
                        type={'number'}
                        className="btn left-btn-styl text-de lg-btn"
                        onChange={(e) => {
                          setuid(e.target.value)
                        }}
                      />
                      <div className=" mt-4">
                        <button
                          className="btn left-btn-styl loginbtn text-de lg-btn px-3 mx-2"
                          onClick={() => (setisVisible(true),setisVisible1(false))}

                        >
                          OK
                        </button>
                        <button
                          className="btn left-btn-styl loginbtn text-de lg-btn px-3 mx-2 "
                          onClick={() => {
                            let modelRegister = document.querySelector('.modelRegister')
                            modelRegister.classList.remove('d-flex')
                            modelRegister.classList.add('d-none')
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>

                  :
                  <></>
              }


              {
                isVisible ?
                  <div id="myModal " class="mypop Register_model">
                    <div
                      class="modal-content5 boxset set_transfort2"
                      id="model-add"
                      style={{ marginTop: '-346px', position: 'fixed' }}
                    >
                      <h4 className=" text-dark fs-5 my-3 color text-white">Referral Confirmation</h4>
                      <p>Your Current Referral ID is {uid}</p>

                      <select className="boxset" name="position" onClick={(e) => setselectPosition(e.target.value)}>
                        <option value="1">Left</option>
                        <option value="2">Right</option>
                      </select>
                      <div className=" mt-4">
                        <button
                          className="btn left-btn-styl loginbtn text-de lg-btn px-1 mx-1 mt-2 proc"
                          style={{ marginBottom: '10px' }}
                          onClick={() => callapi()}
                          // onClick={async () => {

                          //   let position = document.getElementsByName('position')[0].value
                          //   await cotractCall(position)

                          //   let modelRegister = document.querySelector('.modelRegister')
                          //   let modelRegisterR = document.querySelector('.bord')
                          //   modelRegisterR.classList.remove('d-none')
                          //   modelRegisterR.classList.add('d-flex')

                          //   let modelRegisterRR = document.querySelector('.bordd')
                          //   modelRegisterRR.classList.remove('d-flex')
                          //   modelRegisterRR.classList.add('d-none')

                          //   modelRegister.classList.remove('d-flex')
                          //   modelRegister.classList.add('d-none')
                          // }}
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <div class="spinner-border text-secondary" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          )}
                          Proceed
                        </button>
                        {/* <br /> */}
                        <button
                          className="btn left-btn-styl loginbtn text-de lg-btn"
                          onClick={() => setisVisible(false)  }
                        >
                          No I want to change ID
                        </button>
                      </div>

                      {/* <div class="maticRate" style={{ marginLeft: '-9%' }}>
                        <div>
                          <span style={{ color: 'white' }}>BNB</span>
                          <input
                            type="number"
                            style={{ color: 'white' }}

                            name="number"
                            readonly=""
                            className=' lg-btn w-75'
                          />
                        </div>
                      </div> */}

                    </div>
                  </div>


                  :
                  <></>

              }
              {
                isVisible2 ?
                  <div id="myModal " class="mypop ">
                    <div
                      class="modal-content boxset set_transfort2"
                      id="model-add"
                      style={{ marginTop: '-209px', position: 'fixed', width: "23.5%"}}
                    >
                      <h4 style={{ color: 'white' }}>Payment here</h4>
                      <div className=" my-2 rate_div">
                        <p className=" p-0  m-0">BNB</p>{' '}
                        <input className="input1 mx-2 reg-ip" defaultValue={matic} value={matic} disabled type={'number'} />
                        <p className=" p-0  m-0">ULE</p>{' '}
                        <input className="input1 mx-2 reg-ip" defaultValue={ule} value={ule} disabled type={'number'} />
                      </div>
                      {/* <div class="maticRate" style={{ marginLeft: '-9%' }}>
                        <div>
                          <span style={{ color: 'white' }}>BNB</span>
                          <input
                            type="number"
                            style={{ color: 'white' }}

                            name="number"
                            readonly=""
                            className=' lg-btn w-75'
                          />
                        </div>
                      </div> */}
                      <div style={{ display: 'flex', marginLeft: '2%', marginTop: '1rem' }}>
                        <button
                          class="btn   lg-btn"
                          style={{ color: 'white', width: '50%' }}
                          onClick={() => cotractCall()}

                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div class="spinner-border text-secondary" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <>Submit</>
                          )}
                        </button>

                        <a
                          href="#"
                          class="btn closeBtn lg-btn"
                          style={{
                            width: '50%',
                            marginLeft: '2%',
                            fontSize: '14px',
                            color: 'white',
                            height: '40px',
                            paddingTop: '5px;',
                          }}
                          onClick={()=>setisVisible2(false)}
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>


                  :
                  <></>
              }
              <input
                className="btn left-btn-styl text-de lg-btn"
                placeholder="Please enter ID or Metamask address"
                onChange={(e) => {
                  setuid(e.target.value)
                }}
              />
              <div
                className="btn left-btn-styl loginbtn text-de lg-btn"
                onClick={() => {
                  callLoginApi()
                }}
              >
                Connect to Wallet
              </div>
              <button
                className="btn left-btn-styl loginbtn text-de lg-btn"
                onClick={() => {
                  navigate('/Login_main')
                }}
              >
                Login
              </button>
              <button
                className="btn left-btn-styl loginbtn text-de lg-btn"
                onClick={() => {
                  navigate('/')
                }}
              >
                Go To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
