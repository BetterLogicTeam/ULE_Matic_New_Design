import React from "react";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { loadWeb3 } from "../api.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenAddress, tokenAbi } from "../Utils/token";
import { contractAddress, contractAbi } from "../Utils/contract";
import  Spinner from "../Components/Spinner/Spinner";
import { toast } from "react-toastify";
import { API } from "../Redux/actions/API.js";
function Register_main({ notify }) {
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  let [matic, setmatic] = useState("");
  let [ule, setule] = useState("");
  let [uid, setuid] = useState("");
  const [address, setaddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectPosition, setselectPosition] = useState(1)
  const [isVisible, setisVisible] = useState(false)
  const [isVisible1, setisVisible1] = useState(false)

  const [isVisible2, setisVisible2] = useState(false)
  const [connected, setconnected] = useState(
    "MetaMask is not connected..!..Wait..."
  );
  const [SID, setSID] = useState("")
  const [Position_Ref, setPosition_Ref] = useState("")

  const callapi = async () => {
    setloader(true);

    console.log('position', uid)

    let res = await API.post('/registration_v1', {
      sid: uid,
      accountnumber: address,
      position: selectPosition,
      amount: 10,
      paymentType: "MATIC",
      traxn: address,
      // traxn: "0x20938baa39acbdc75b1e6b192a1f4a9782d353c69ea25c80db09a89205d37125"
    })

    console.log("Res", res.data);
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

    

  }
    else  {
      toast.error('Account Already Resgistered with this ID')
      navigate('/Login_main')

    }
    // setloader(false)
  };
  const callLoginApi = async () => {
    // isLoading(true)
    console.log("address", address);
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
      toast.error("Something went wrong ! ");
      setloader(false);
    }
    setloader(false);
  };
  const ConnectToMetaMask = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      notify("No Wallet");
    } else if (acc == "Wrong Network") {
      notify(" Wrong Network Please Connect Polygon Network");
    } else {
      let res = await axios.post('https://ulematic-live-api.herokuapp.com/CheckRegisterUser', {
        "accountnumber": acc
      })


      console.log("CheckRegiter", res.data.data);

      if (res.data.data.result == "Free Registered. Please Pay payment !!") {
        setisVisible2(true)
      }
      setaddress(acc);
      setconnected("MetaMask is connected... Ready To Register");
    }
  };
  const cotractCall = async () => {
    setloader(true);
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      notify.error("No Wallet");
    } else if (acc == "Wrong Network") {
      notify.error("Wrong Network Please Connect Polygon Network");
    } else {
      setaddress(acc);
      setconnected("MetaMask is connected... Ready To Register");
      console.log("Check_data");

      try {
//         let res = await API.get(
//           `/login?id='${address}'`
//         );
//         if (res.data.data !== 0) {
//           localStorage.setItem("isAuthenticated", true);
//           localStorage.setItem("user", JSON.stringify(res.data.data));
          
// notify.success("Account Already Resgistered with this ID");
//           navigate("/Dashboard/Home");
//         } else {
          let contract = await new window.web3.eth.Contract(
            contractAbi,
            contractAddress
          );
          // console.log('what is  contract ', contract)

          let token = await new window.web3.eth.Contract(
            tokenAbi,
            tokenAddress
          );
          // console.log('what is  token', token)
          let balance = await token.methods.balanceOf(acc).call();
          balance = window.web3.utils.fromWei(balance);
          // ule=1
          console.log("balance", balance);
          if (balance > ule) {
            ule = ule.toString();
            console.log("what is contractvall ule", ule);

            ule = window.web3.utils.toWei(ule);
            // console.log("ule", ule);
          //  matic = 100000000000
            matic = matic.toString();
            matic = window.web3.utils.toWei(matic);
            const approveBlock = window.web3.eth.getBlock("latest");
            let approveCall = await token.methods
              .approve(contractAddress, ule)
              .send({
                from: acc,
                gasLimit: approveBlock.gasLimit,
                gasPrice: await window.web3.eth.getGasPrice(),
              })
              .on("receipt", (receipt) => {
                console.log("hash", receipt.transactionHash);
              });
            console.log("what is  approveCall", approveCall);
            toast.success("Approved");

            let sellCall = await contract.methods
              .UlebuyRouter(ule)
              .send({
                from: acc,
                value: matic,
                gasPrice: await window.web3.eth.getGasPrice(),
              })
              .on("receipt", (receipt) => {
                console.log("hash1", receipt.transactionHash);
                toast.success("Transection Succesfull");
                Register_Hash( receipt.transactionHash);
              });
          } else {
            toast.error("Insufficient Fund");
          }
        // }
      } catch (err) {
        console.log("error while calling fuction sell", err);
      }
    }
    setloader(false);
  };
  const callMaticUrliApi = async () => {
    let res = await API.get(
      `/live_rate_matic`
    );
    setmatic(Number(1 / res.data.data[0].usdperunit) * 10);
    console.log("matic", (1 / res.data.data[0].usdperunit) * 10);
  };
  const callUleApi = async () => {
    let res = await API.get(`/live_rate`);
    setule(Number(1 / res.data.data[0].usdperunit) * 10);
    console.log("ULE", );
    console.log("ULEMatic", 1 / res.data.data[0].usdperunit);
  };

  let Userid = localStorage.getItem('NewUserID')

  const Register_Hash = async (hash) => {
    try {
      let acc = await loadWeb3()
      setloader(true)

      let res = await API.post('/UpdateRegisterHash', {

        "uid": Userid,
        "accountnumber": acc,
        "traxn": hash
      }
      )

      console.log("Register_Hash", res);
      setTimeout(() => {
        callLoginApi(acc)
        setloader(false)
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







  const ReferralAddress = async () => {
    const user = localStorage.getItem("user");

    let ress = JSON.parse(user);
    let uId = ress?.user_id;
    console.log("UID", uId);
    try {

        let URL = window.location.href;

        // console.log("LAST", URL);

        if (URL.includes("referrallink")) {
            // setcheckreffarl(true)
            let pathArray = URL.split('?');
            let UserID = pathArray[pathArray.length - 1]

            // console.log("LAST",UserID);
            UserID = UserID.split('=')
            UserID = UserID[UserID.length - 2]
            let urllast = UserID.split('&');
            let SID=urllast[urllast.length - 2]
            console.log("SID",SID);
            setuid(SID)
            // setSID(SID)
            let Postion = URL.split('=')
            Postion=Postion[Postion.length - 1]
            if(Postion=="Left"){
              setselectPosition(1)
            }else if(Postion  =="Right"){
              setselectPosition(2)
              setPosition_Ref(Postion)
            }
            console.log("LAST",Postion);
       
          
            


            // let urllast = UserID[UserID.length - 2]
            // console.log("LAST",urllast);

            // let n = urllast.split('=')
            // setposition(n[n.length - 1])


        } else {

        }



    } catch (e) {
        console.log("Erroe Whille Referral Fuction Call", e);
    }
}

useEffect(() => {

    ReferralAddress()
}, []);






  useEffect(() => {
    // Register_Hash()
    // console.log('position', selectPosition)
    setloader(true);
    ConnectToMetaMask();
    callUleApi();
    callMaticUrliApi();

    setloader(false);
    setIsLoading(false);
  }, []);

  return (
    <div
      className="row m-0 justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {loader == true ? <Spinner /> : <></>}
      <div className=" col-md-6 col-lg-3   mainForm">
        <div className="main_form p-5">
          <h4 className="hh mb-3">Registration With Matic</h4>
          <p className="peera">Automatic login if you have MetaMask wallet:</p>

          <img src="logo.png" width="150px" alt="" />
          {connected == "MetaMask is not connected..!..Wait..." ? (
            <p className="peera2 pt-3" style={{ color: "red" }}>
              {connected}
            </p>
          ) : (
            <p className="peera2 pt-3" style={{ color: "green" }}>
              {connected}
            </p>
          )}

          <div className="batan">
            <button
              className="btn left-btn-styl loginbtn text-de lg-btn"
              onClick={() => Register_check() }
            >
              Register
            </button>
            {
                isVisible1 ?
                  <div id="myModal " class="mypop Register_model">
                    <div
                      class="modal-content5 boxset set_transfort2"
                      id="model-add"
                      style={{ marginTop: '-246px', position: 'fixed' }}
                    >
                      <h4 className=" text-dark fs-5 my-3 color text-white">Enter Upline ID</h4>
                      <input
                        type={'number'}
                        className="btn left-btn-styl text-de lg-btn"
                        defaultValue={uid}
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
                      style={{ marginTop: '-346px', position: 'fixed',zIndex:'-1' }}
                    >
                      <h4 className=" text-dark fs-5 my-3 color text-white">Referral Confirmation</h4>
                      <p>Your Current Referral ID is {uid}</p>

                      <select className="boxset" name="position" defaultValue={selectPosition}  onClick={(e) => setselectPosition(e.target.value)}>
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
                      style={{ marginTop: '-209px', position: 'fixed', width: "23.5%" }}
                    >
                      <h4 style={{ color: 'white' }}>Payment here</h4>
                      <div className=" my-2 rate_div">
                        <p className=" p-0  m-0">MATIC</p>{' '}
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

            {/* <div className=" w-100 h-100 d-none justify-content-center align-items-center  position-absolute  modelRegister">
              <div
                className="  bord border-dark py-3 px-5 flex-column justify-content-center align-items-center d-flex"
                style={{ marginLeft: "-4%" }}
              >
                <h4 className=" text-dark fs-5 my-3" id="pop-id">
                  Enter Upline ID
                </h4>
                <input
                  type={"number"}
                  className="boxset"
                  onChange={(e) => {
                    setuid(e.target.value);
                  }}
                />
                <div className=" mt-4">
                  <button
                    className="btn left-btn-styl loginbtn text-de lg-btn px-3 mx-2"
                    onClick={() => {
                      if (uid.length > 0) {
                        let modelRegister = document.querySelector(".bordd");
                        let modelRegisterR = document.querySelector(".bord");

                        modelRegister.classList.remove("d-none");
                        modelRegister.classList.add("d-flex");
                        modelRegisterR.classList.remove("d-flex");
                        modelRegisterR.classList.add("d-none");
                      }
                    }}
                  >
                    OK
                  </button>
                  <button
                    className="btn left-btn-styl loginbtn text-de lg-btn px-3 mx-2 "
                    onClick={() => {
                      let modelRegister =
                        document.querySelector(".modelRegister");
                      modelRegister.classList.remove("d-flex");
                      modelRegister.classList.add("d-none");
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
              <div
                className=" bordd border-dark py-3 px-5 flex-column justify-content-center align-items-center d-none"
                style={{ marginLeft: "-4%" }}
              >
                <h4 className=" text-light fs-5 my-3" id="pop-id">
                  Referral Confirmation
                </h4>
                <p>Your Current Referral ID is {uid}</p>
                <div className=" d-flex flex-row align-items-center justify-content-center my-2">
                  <p className=" p-0  m-0">Matic</p>{" "}
                  <input
                    className="input1 mx-2 text-light"
                    defaultValue={matic}
                    value={matic}
                    disabled
                    type={"number"}
                  />
                  <p className=" p-0  m-0">ULE</p>{" "}
                  <input
                    className="input1 mx-2"
                    defaultValue={ule}
                    value={ule}
                    disabled
                    type={"number"}
                  />
                </div>
                <select className="boxset" name="position">
                  <option value={1}>Left</option>
                  <option value={2}>Right</option>
                </select>
                <div className=" mt-4">
                  <button
                    className="btn bt loginbtn px-1 mx-1"
                    onClick={async () => {
                      let position =
                        document.getElementsByName("position")[0].value;
                      await cotractCall(position);

                      let modelRegister =
                        document.querySelector(".modelRegister");
                      let modelRegisterR = document.querySelector(".bord");
                      modelRegisterR.classList.remove("d-none");
                      modelRegisterR.classList.add("d-flex");

                      let modelRegisterRR = document.querySelector(".bordd");
                      modelRegisterRR.classList.remove("d-flex");
                      modelRegisterRR.classList.add("d-none");

                      modelRegister.classList.remove("d-flex");
                      modelRegister.classList.add("d-none");
                    }}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    Proceed
                  </button>
                  <button
                    className="btn bt loginbtn "
                    onClick={() => {
                      let modelRegister = document.querySelector(".bordd");
                      let modelRegisterR = document.querySelector(".bord");

                      modelRegister.classList.remove("d-flex");
                      modelRegister.classList.add("d-none");
                      modelRegisterR.classList.remove("d-none");
                      modelRegisterR.classList.add("d-flex");
                    }}
                  >
                    No I want to change ID
                  </button>
                </div>
              </div>
            </div> */}
            <input
              className="btn left-btn-styl text-de lg-btn"
              placeholder="Please enter ID or Metamask address"
              onChange={(e) => {
                setuid(e.target.value);
              }}
            />
            <div
              className="btn left-btn-styl loginbtn text-de lg-btn"
              onClick={() => {
                callLoginApi();
              }}
            >
              Connect to Wallet
            </div>
            <button
              className="btn left-btn-styl loginbtn text-de lg-btn"
              onClick={() => {
                navigate("/Login_main");
              }}
            >
              Login
            </button>
            <button
              className="btn left-btn-styl loginbtn text-de lg-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              Go To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register_main;
