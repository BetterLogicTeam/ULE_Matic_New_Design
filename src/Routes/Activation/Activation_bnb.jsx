import React from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import logo from '../../assets/activateYello.png';
import click from "../../Assets/click.png"
import { getDownlineReport } from "../../Redux/actions/dailyYield";
// import { API } from "../../Redux/actions/API";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Activation.css';
import { toast } from "react-toastify";
import Web3 from "web3";
import moment from "moment";

import { BiHome } from "react-icons/bi"
import { IoIosArrowForward } from "react-icons/io"
import {
    // contractAddress, contractAbi
    contractAbiBNB, contractAddressbnb
} from "../../Utils/contract";
import {
    tokenAddress, tokenAbi
} from "../../Utils/token";
// import click from "../../assets/click.png"
import { loadWeb4 } from "../../api2";
import axios from "axios";
import "./Activation.css"
import Spinner from '../../Components/Spinner/Spinner';
import { API } from '../../Redux/actions/API';

function Activation_bnb() {
    const user = localStorage.getItem("user");

    const [blnce, setBlnce] = useState(0);
    const [amount, setAmount] = useState("");
    const [isLoadingTrans, setLoadingTrans] = useState(false);
    const [apiDate, setDate] = useState(true);
    const [pending, setPending] = useState(0);
    const [betaWallet, setBetaWallet] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [loader, setloader] = useState(false)
    const [confirm, setConfirm] = useState([]);
    const [rate, setRate] = useState(0);
    const [ratematic, setRateMatic] = useState(0)
    const [balanceUle, setbalanceUle] = useState(0);
    const [TrxBalance, setTrxBalance] = useState(0)



    const getLiveRate = async () => {
        try {
            console.log("in matic");
            const { data: { data } } = await API.get(`/live_rate_Ule_bnb`);
            console.log("res1", data[0])
            let rate = data[0]?.usdperunit
            setRate(rate);
        } catch (e) {
            console.log("error...", e);
        }
    };
    const LiveRateMaticAPI = async () => {
        try {
            let res = await API.get(`/live_rate_bnb`);
            res = res.data.data[0];
            console.log("res111", res);
            let ratematric = res?.usdperunit
            setRateMatic(ratematric);

        } catch (e) {
            console.log("Error While Fatch Dashboard API", e);
        }
    };

    useEffect(() => {
        LiveRateMaticAPI();
    }, []);
    const getBetaWallet = async () => {
        let ress = JSON.parse(user);
        let uId = ress?.user_id;
        console.log("User0", uId);
        try {
            const res = await API.get(`/get_betawallet?id=${uId}`);
            setBetaWallet((res?.data.data[0]));
            console.log("res?.data.data[0]", res?.data.data[0].activatupgradeamnt_trading);
            setLoading(false);
        } catch (e) {
            console.log("error", e);
            setLoading(false);
        }
    };
    const getLiveRate1 = async () => {
        let ress = JSON.parse(user);
        let uId = ress?.user_id;
        try {
            const res = await API.get(`/pending_date?id=${uId}`);
            setDate(res?.data.data[0].edate);
            let date1 = moment(res?.data.data[0].edate)
                .add(15, "minutes")
                .isBefore(moment());
            setDate(date1);
        } catch (e) {
            console.log("error", e);
        }
    };
    const getLiveRate2 = async () => {
        let ress = JSON.parse(user);
        let uId = ress?.user_id;
        try {
            const res = await API.get(`/pending_activation?id=${uId}`);
            setPending(res?.data.data[0]);
        } catch (e) {
            console.log("error", e);
        }
    };
    const getLiveRate3 = async () => {
        let ress = JSON.parse(user);
        let uId = ress?.user_id;
        try {
            const res = await API.get(`/confirm_payment?id=${uId}`);
            setConfirm(res?.data.data);
        } catch (e) {
            console.log("error", e);
        }
    };
    useEffect(() => {
        getBetaWallet();
        getLiveRate();
        getLiveRate1();
        getLiveRate2();
        getLiveRate3();
    }, []);

    const UleBalance = async () => {
        let acc = await loadWeb4()
        let contract = await new window.web3.eth.Contract(tokenAbi, tokenAddress)
        let result = await contract.methods.balanceOf(acc).call()
        // result = parseInt(result)
        result = window.web3.utils.fromWei(result);
        // result = result.toFixed(1)
        setBlnce(result);
        setbalanceUle(result)
        console.log("Balance Ule", result);
        let bNB_balance = await window.web3.eth.getBalance(acc)
        result = parseInt(result)
        bNB_balance = window.web3.utils.fromWei(bNB_balance)
        // bNB_balance = bNB_balance.toFixed(8)
        console.log("Addressss", bNB_balance);
        console.log("Balance_BNB", bNB_balance);
        setTrxBalance(bNB_balance)

    }

    async function handleActivation() {
        let acc = await loadWeb4()
        try {
            setloader(true);



            // let address = dashboard?.walletAddress; //Login User Address
            let address = acc;
            // console.log("ADDRESSSS",address);
            let ress = JSON?.parse(user);
            let uid = ress?.uid;   //Login User Id
            let usdamt = amount; //Package USD Amount
            let token = blnce; //Package ULE Value
            let packid = usdamt;
            // let package = 1;

            // alert(uid);
            let mainadd = acc;

            //   if (parseInt(blnce) < parseInt(parseInt(amount) / rate)) {
            //     alert("Wallet balance insufficient!!!");
            //     setLoadingTrans(false);

            //     return;
            //   }

            // if (parseInt(usdamt) < 100) {
            //   alert("Enter Minimum package amount 100 USD!!!");
            //   setLoadingTrans(false);
            //   return;
            // }

            // if (parseInt(parseInt(usdamt) % 100) != 0) {
            //   alert("Enter package amount in multiple of 100 USD!!!");
            //   setLoadingTrans(false);
            //   return;
            // }

            if (parseInt(usdamt) > 10000) {
                alert("Maximum package amount is 10000 USD");
                setloader(false);
                return false;
            }

            if (mainadd == undefined) {
                alert("Please connect wallet!!!");
                setloader(false);
                return;
            }
            if (address.toUpperCase() != mainadd.toUpperCase()) {
                alert("Wallet address and login miss match");
                setloader(false);
                return;
            }
            if (packid == "0" || packid == "") {
                alert("Please Enter correct package amount!!!");
                setloader(false);
                return;
            }
            let tron_Rate = (amount / 2) * Number(rate);
            tron_Rate = tron_Rate.toString()
            tron_Rate = window.web3.utils.toWei(tron_Rate)
            let ULE_rate = (amount / 2) * Number(ratematic)
            ULE_rate = ULE_rate.toString()
            ULE_rate = window.web3.utils.toWei(ULE_rate)
            // let tron_Rate = 100000000000
            // let ULE_rate = 1


            console.log("tron_Rate", tron_Rate);
            console.log("tron_Rate", ULE_rate);


            try {
                let contract = await new window.web3.eth.Contract(contractAbiBNB, contractAddressbnb)
                let token = await new window.web3.eth.Contract(tokenAbi, tokenAddress)
                const approveBlock = window.web3.eth.getBlock("latest");
                let approveCall = await token.methods.approve(contractAddressbnb, tron_Rate).send({
                    from: acc,
                    gasLimit: approveBlock.gasLimit,
                    gasPrice: await window.web3.eth.getGasPrice(),
                });
                toast.success('Approved')
                let sellCall = await contract.methods.UlebuyRouter(tron_Rate).send({
                    from: acc,
                    value: ULE_rate,
                    gasLimit: approveBlock.gasLimit,
                    gasPrice: await window.web3.eth.getGasPrice(),
                });
                toast.success('Transection Succesfull')
                sellCall = sellCall.transactionHash
                let responce = await axios.post(`https://ulematic-live-api.herokuapp.com/activation`, {
                    "uid": uid,
                    "useraddress": mainadd,
                    "amount": usdamt,
                    "tokenamount": amount,
                    "transaction": sellCall,
                    "PaymentType": "BNB"
                })
                responce = responce?.data?.data;
                console.log("APi_Activation_responce", responce);
                setloader(false);

                //    toast.success('Please Wait while transaction is processing...')

            }
            catch (err) {
                console.log("error while calling fuction sell", err)
                setloader(false);

            }







            //   let tron_Rate = amount*rate;
            //   let ULE_rate=amount*ratematic

            //   // const web3 = window.web3;
            //   ULE_rate = ULE_rate * 1000000000000000000;
            //   tron_Rate = tron_Rate * 1000000;

            //   // tron_Rate=tron_Rate/10000000000000000000;
            //   ULE_rate = parseInt(ULE_rate).toString()

            //   tron_Rate = parseInt(tron_Rate).toString()
            //   console.log("tron_Rate", tron_Rate);

            //   // let tokenAmount = web3.utils.toWei(tron_Rate.toString());
            //   let tokenAmount = tron_Rate
            //   // let contract = new web3.eth.Contract(abi, contractAddressbnb);
            //   let contractToken = await window.tronWeb.contract().at(CONTRACT_ADDRESS);
            //   await contractToken.approve(Widthdraw_Address, ULE_rate).send({}).then((output) => {
            //     console.log("- approve Output:", output, "\n");
            //     toast.success("approve Successful");
            //     // setLoadingTrans(false)

            //   })
            //     .catch((e) => {
            //       toast.error(e.message);
            //       setLoadingTrans(false);
            //     });
            //   let contract = await window.tronWeb.contract().at(Widthdraw_Address);
            //   await contract
            //   .sell(ULE_rate)
            //   .send({
            //     callValue: tron_Rate,
            //     feeLimit: 100000000,
            //   }).then(async (hash) => {
            //     if (hash != "") {
            //       try {

            //    console.log("activation data", uid,mainadd,usdamt,amount,hash);
            //             let responce = await API.post(`/activation`,{
            //               "uid":uid,
            //               "useraddress":mainadd,
            //               "amount":usdamt,
            //               "tokenamount":amount,
            //               "transaction":hash
            //           })
            //           responce = responce?.data?.data;

            //        toast.success('Please Wait while transaction is processing...')
            //       } catch (e) {
            //         console.log("error", e);
            //         setLoadingTrans(false);
            //         toast.error("Something went wrong ! ");
            //       }
            //     }
            //     console.log("Final Output:", hash , "\n");
            //     toast.success("Transaction is complete");
            //     setLoadingTrans(false);



            //   }).catch((e) => {
            //     toast.error(e.message);
            //     setLoadingTrans(false);


            //   })

        } catch (error) {
            console.log("error", error);
            setLoadingTrans(false);

        }
    }
    const getLastTransaction = async () => {
        try {
            let ress = JSON.parse(user);
            let uId = ress?.user_id;
            const res = await API.get(`/verify_last_update_time?id=${uId}`);
            return res?.data?.data ? res?.data?.data : [];
        } catch (e) {
            return [];
        }
    };
    async function handleUpdation() {
        try {
            setLoadingTrans(true);
            setLoadingTrans(false);
            let maxWithdraw = await getLastTransaction();
            // let address = dashboard?.walletAddress; //Login User Address
            let address = await loadWeb4()

            let ress = JSON?.parse(user);
            let uid = ress?.uid;
            let usdamt = amount; //Package USD Amount
            let token = blnce; //Package ULE Value
            let packid = usdamt;
            // console.log("VAlue",amount);

            //   let package = 1;
            if (maxWithdraw.length > 0) {
                alert(
                    "You can make upgrade after 2 hours from your previous Upgrade !"
                );
                setLoadingTrans(false);

                return;
            }
            let mainadd = address;
            if (parseInt(amount) < parseInt(betaWallet?.activatupgradeamnt_trading)) {
                alert(
                    "Your Current Package amount should me more than or equal to Last Package"
                );
                setLoadingTrans(false);

                return;
            }
            //   if (parseInt(TrxBalance) < parseInt(parseInt(amount) / rate)) {
            //     alert("Wallet balance insufficient!!!");
            //     setLoadingTrans(false);

            //     return;
            //   }

            if (parseInt(usdamt) < 100) {
                alert("Enter Minimum package amount 100 USD!!!");
                setLoadingTrans(false);
                return;
            }

            if (parseInt(parseInt(usdamt) % 100) != 0) {
                alert("Enter package amount in multiple of 100 USD!!!");
                setLoadingTrans(false);
                return;
            }

            if (parseInt(usdamt) > 10000) {
                alert("Maximum package amount is 10000 USD");
                setLoadingTrans(false);
                return false;
            }

            if (mainadd == undefined) {
                alert("Please connect wallet!!!");
                return;
            }
            if (address.toUpperCase() != mainadd.toUpperCase()) {
                setLoadingTrans(false);
                alert("Wallet address and login miss match");
                setLoadingTrans(false);
                return;
            }
            if (packid == "0" || packid == "") {
                alert("Please Enter correct package amount!!!");
                setLoadingTrans(false);
                return;
            }


            let tron_Rate = amount * rate;
            tron_Rate = tron_Rate.toString()
            tron_Rate = window.web3.utils.toWei(tron_Rate)
            let ULE_rate = amount * ratematic
            ULE_rate = ULE_rate.toString()
            ULE_rate = window.web3.utils.toWei(ULE_rate)

            // console.log("mainadd",uid);

            try {
                let contract = await new window.web3.eth.Contract(contractAbiBNB, contractAddressbnb)
                let token = await new window.web3.eth.Contract(tokenAbi, tokenAddress)
                let approveCall = await token.methods.approve(contractAddressbnb, ULE_rate).send({ from: address });
                toast.success('Approved')
                let sellCall = await contract.methods.UlebuyRouter(ULE_rate).send({ from: address, value: tron_Rate });
                toast.success('Transection Succesfull')
                sellCall = sellCall.transactionHash
                let responce = await API.post(`/upgradation`, {
                    "uid": uid,
                    "useraddress": mainadd,
                    "amount": usdamt,
                    "tokenamount": amount,
                    "transaction": sellCall,
                    "PaymentType": "BNB"
                })
                responce = responce?.data?.data;
                console.log("APi_Activation_responce", responce);

                //    toast.success('Please Wait while transaction is processing...')

            }
            catch (err) {
                console.log("error while calling fuction sell", err)
            }



        } catch (error) {
            console.log("error", error);
            setLoadingTrans(false);
        }
    }


    useEffect(() => {
        UleBalance()
    }, [])
    return (
        <div>
            <Navbar />

            <div className="page-wrapper">
                {loader == true ? <Spinner /> : <></>}
                <div className="page-content">

                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Activate BNB</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Activation / Activate BNB</li>
                                </ol>
                            </nav>
                        </div>
                    </div>


                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8" style={{ marginTop: '-18rem', paddingBottom: '18rem' }}>
                                <div className="modal-dialog" >
                                    <div className="modal-content size_model">
                                        <div className="modal-header" style={{ paddingBottom: "10px" }}>
                                            <div className="avlbal">
                                                <h2>
                                                    Activate / Upgrade
                                                </h2>
                                                <h5>
                                                    Available ULE Token Balance :
                                                    <span id="tokenbalance" style={{ color: "#fff" }}> {balanceUle}</span><span style={{ color: "#fff" }}> Token</span>
                                                </h5>

                                                <h5 id="exampleModal3Label2">
                                                    Available BNB Balance :
                                                    <span style={{ color: "#fff" }} readonly="" id="getBalance"> {TrxBalance}</span>
                                                    <span style={{ color: "#fff" }}> BNB</span>
                                                </h5>
                                                <h5 id="exampleModal3Label2">
                                                    Previous Package amount :
                                                    <span style={{ color: "#fff" }} readonly="" id="getBalance"> 00000</span>
                                                    <span style={{ color: "#fff" }}> </span>
                                                </h5>
                                                <h5 id="exampleModal3Label2">
                                                    Live Rate :
                                                    <input type="text" className="input_width act-ip" id="txtchangevalue" style={{ color: "black" }} placeholder={`1 ULE = ${rate} USD`} readonly="" />
                                                    <input type="text" className="input_width mob_view act-ip" id="txtchangevalue" style={{ color: "black" }} placeholder={`1 Bnb = ${ratematic} USD`} readonly="" />
                                                </h5>

                                            </div>
                                        </div>
                                        <div className="modal-body">
                                            <div className="popup_net">
                                                <span className="metamaskConnection" style={{ color: "#fff" }}></span>

                                                <div className="addNum">
                                                    <div className="trxnumber">
                                                        <input type="text" value={amount} readonly="" id="txtamount" className="form5" placeholder="Selected Package Amount"

                                                        />
                                                    </div>
                                                    <div className="trxnumber">
                                                        <input type="text" readonly="" id="txtTokenvalue" className="form5" placeholder={(`${(amount / 2)}` * `${Number(ratematic)}` + " " + "BNB")} />
                                                        <span>Bnb Value</span>
                                                    </div>
                                                    <div className="trxnumber">
                                                        <input type="text" value="" readonly="" id="txtTronvalue" className="form5" placeholder={(`${(amount / 2)}` * `${Number(rate)}` + " " + "ULE")} />
                                                        <span>ULE Value</span>
                                                    </div>

                                                    <div className="numbtn">

                                                        <button onClick={() => {
                                                            setAmount(+amount + 100)
                                                        }}
                                                        >+ 100$</button>
                                                        {/* <!-- <button onclick="addactivationValue(250)">+ 250$</button> --> */}
                                                        <button
                                                            onClick={() => {
                                                                setAmount(+amount + 500)
                                                            }}
                                                        >+ 500$</button>
                                                        <button
                                                            onClick={() => {
                                                                setAmount(+amount + 1000)
                                                            }}
                                                        >+ 1000$</button>
                                                        <button className="button" onClick={() => {
                                                            setAmount("")
                                                        }}>Reset</button>
                                                    </div>

                                                    <input type="hidden" id="packageamount" name="name" autocomplete="off" />

                                                </div>

                                                <h5 className="tomenname" style={{ marginTop: "1rem" }}></h5>
                                                <div className="row select_network" >
                                                    <div className="col-md-6 mx-auto">
                                                        <a href="#" onClick={handleActivation}>
                                                            <div className="text-center net_box"

                                                            >
                                                                <img src={click} className="img-fluid" style={{ height: "46px" }} />
                                                                <h4>Upgrade</h4>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Activation_bnb