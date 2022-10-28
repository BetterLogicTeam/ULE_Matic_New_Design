import React from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'
import './History.css'
import { Dropdown } from 'react-bootstrap'

import { useState, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import Web3 from "web3";
import { ethers } from "ethers";
import { Withdraw_Abi_Matix_5050, Withdrwa_Address_Matix_5050 } from '../../Utils/contract'
import { loadWeb3 } from '../../api'
import { API } from '../../Utils/API';
import Spinner from '../../Components/Spinner/Spinner';
const webSupply = new Web3("https://bsc-dataseed1.binance.org/")




function Withdrawal_Matic_5050() {
    const user = localStorage.getItem("user");
    let [depositeAmount, setDepositeAmount] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [tronAdd, setTronAdd] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [isLoadingTrans, setLoadingTrans] = useState(false);
    const [Value_Cal, setValue_Cal] = useState()
    const [BtnDisable, setBtnDisable] = useState(false)
    const [Hash, setHash] = useState()

    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const metamask = async () => {
        let isConnected = false;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                isConnected = true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
            }
            if (isConnected === true) {
                const web3 = window.web3;
                let accounts = await web3.eth.getAccounts();
                if (account !== accounts[0]) {
                    setAccount(accounts[0]);
                }

                let chain = await web3.eth.getChainId();
                setChainId(chain);
                if (chain === 303) {
                    // handleLogin2(accounts[0]);
                }
                window.ethereum.on("accountsChanged", async function (accounts) {
                    if (account !== accounts[0]) {
                        setAccount(accounts[0]);
                    }

                    let chain = await web3.eth.getChainId();
                    setChainId(chain);
                    if (chain === 303) {
                        // handleLogin2(accounts[0]);
                    }
                });
            }
        } catch (error) {
            console.log("error message", error?.message);
        }
    };
    const [rate, setRate] = useState(0);
    const getLiveRate = async () => {
        try {
            console.log("depositeAmount", depositeAmount);
            const res = await API.get(`/live_rate`);
            let res1 = 1 / res?.data.data[0].usdperunit;
            console.log("res1", res1);
            setRate(res1);
            console.log("setRate", res1)
        } catch (e) {
            console.log("error", e);
        }
    };

    let mainAccount = "";

    var nonce = 2; // some random number
    const [accountAddress, setAccountAddress] = useState("");
    const [trxtBalance, setTrxBalance] = useState("0");
    const [TokenValue, setTokenValue] = useState("0");

    // console.log(trxtBalance);

    const getBlnce = async () => {
        try {
            let ress = JSON.parse(user);
            let uId = ress?.user_id;
            const res = await API.get(`/get_betawallet?id=${uId}`);
            console.log("RESSSS", res);
            setTrxBalance(
                res?.data?.data[0]?.NetBalOtherIncome ? res?.data?.data[0]?.NetBalOtherIncome : 0
            );
            console.log("setTrxBalance", res?.data?.data[0]?.NetBalOtherIncome);
            setUserInfo(res?.data?.data[0].address);

            console.log("uSERAddress", res?.data?.data[0].address);
            console.log("trxtBalance", trxtBalance)
        } catch (e) {
            console.log("error", e);
        }
    };


    useEffect(() => {
        setTimeout(() => {
            // Ethereum();
            getBlnce();
        }, 2000);
        getLiveRate();
        metamask();
    }, []);

    const Withdraw_toke = async () => {
        setLoadingTrans(true);

        let CONTRACT_ADDRESS = "0x14B1e30738B30c2372BF4aD65620aF4348426872";
        let privateKey = process.env.REACT_APP_PRIVATE_KEY_MATIC_5050;

        
        var nonce = 2; // some random number
        const web3 = window.web3;
        const acc = await loadWeb3()
        console.log("acc", acc);

        setLoadingTrans(true)
        try {
            if (acc == userInfo) {
                let id = localStorage.getItem("user");

                console.log("rate", rate);
                let multilplyValue = rate;
                
                let AmountBNB = depositeAmount * multilplyValue * 0.90;

                AmountBNB = AmountBNB.toString()
                let AmountToken = webSupply.utils.toWei(AmountBNB);

                let ress = JSON.parse(id);
                let uId = ress?.user_id;


                let res_Condition = await axios.post('https://ulematic-live-api.herokuapp.com/withdrawlConditionActivation', {
                    "uid": uId,
                    "amount": depositeAmount,
                    "tokenamount": depositeAmount

                })

               // if (res_Condition.data.data == "Success") {
                if(1>0){
                    let contractof = new webSupply.eth.Contract(Withdraw_Abi_Matix_5050, Withdrwa_Address_Matix_5050);

                    // var ethers = require('ethers')
                    let contract = CONTRACT_ADDRESS //withdrawcontract
                    let user = userInfo //user_address 
                    console.log("contract", contract);
                    console.log("user", user);


                    //const RPC = "https://bsc-dataseed1.binance.org";
                    const RPC = "https://polygon-rpc.com";
                    const provider = new ethers.providers.JsonRpcProvider(RPC)
                    const blockNumber = await provider.getBlockNumber();

                    const nonce = (await provider.getBlock(blockNumber)).timestamp;
                    //console.log("nonce-timestamp:", nonce)

                    let hash = ethers.utils.solidityKeccak256(["string", "string", "uint256", "uint256"],
                        [contract.toLowerCase(), user.toLowerCase(), nonce, AmountToken.toString()]);
                    // console.log("hash:", hash)

                    const signingKey = new ethers.utils.SigningKey(privateKey);
                    let deployTx = signingKey.signDigest(hash);

                    const signature = ethers.utils.joinSignature(deployTx);
                    // console.log("Signature:", signature);

                    await contractof.methods.userTOKENWithdraw(AmountToken, nonce, signature).send({
                        from: userInfo,
                        gasPrice: await window.web3.eth.getGasPrice(),
                        // gasPrice: "20000000000"

                    },
                        async function (error, hash) {
                            if (!error) {
                                // console.log("🎉 The hash of your transaction is: ", hash);
                                // console.log("uid", uId, "address", userInfo?.EthAddress, "amount", AmountBNB, "tokenvalue", AmountToken, "txn", hash);

                                let Final_Res = await axios.post('https://ulematic-live-api.herokuapp.com/save_withdraw_Activation', {
                                    "uid": uId,
                                    "address": userInfo,
                                    "amount": depositeAmount,
                                    "tokenvalue": depositeAmount,
                                    "txn": hash,
                                    "paymenttype": "MATIC"

                                })
                                
                               
                                // console.log("Final_Res", Final_Res.data.data);

                                setLoadingTrans(false)
                                toast.success("Withdraw SuccessFull")

                            } else {
                                console.log("❗Something went wrong while submitting your transaction:", error)
                            }
                        })

                    setLoadingTrans(false)

                } else {
                    toast.error(res_Condition.data.data)
                    setLoadingTrans(false)

                }
            } else {
                toast.error("Account Mismatch")
                setLoadingTrans(false)


            }

        } catch (e) {
            setLoadingTrans(false)
            console.log("Erroe while call Withdraw Fuction", e);

        }
    }
    return (
        <div>
            <Navbar />
            {/* <!----======body section start=====----> */}
            <div className="page-wrapper">
                <div className="page-content">
                {isLoadingTrans == true ? <Spinner /> : <></>}
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <div className="modal-dialog">
                                <div className="modal-content exchange_width">
                                    <div className="modal-header exchange_hd">
                                        <h1>Withdrawal Actiavtion Matic</h1>
                                        {/* <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                Select Withdrawal
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-2">Reg. Withdrawal</Dropdown.Item>
                                                <Dropdown.Item href="#/action-1">Activation Withdrawal </Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                    </div>
                                    <div className="modal-body">
                                        <div className="box box-default table-wrapper ng-pristine ng-valid ng-valid-maxlength" ng-submit="withDrawalAmount()">
                                            <div className="panel-body">
                                                {/* <span id="metamaskConnection" style={{ color: "red" }}>wallet is not connected..!..Wait...</span> */}
                                                <div className="row my_Set">
                                                    <div className="col-md-5">
                                                        <label>Wallet Net USD Value</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control ctn-ip" value={trxtBalance} readOnly={true} />

                                                    </div>
                                                </div>
                                                {/* <div className="row my_Set">
                                                    <div className="col-md-5">
                                                        <label>ULE Amount </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control ctn-ip mb-20 ng-pristine ng-valid ng-empty ng-valid-maxlength" id="amount" placeholder="000" maxlength="10" />
                                                    </div>
                                                </div> */}

                                                <div className="row mrset my_Set">
                                                    <div className="col-md-5">
                                                        <label>Enter USD Amount</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control ctn-ip" value={depositeAmount} onChange={(e) => setDepositeAmount(e.target.value)} placeholder=" " />
                                                    </div>
                                                </div>
                                                <div className="row mrset my_Set">
                                                    <div className="col-md-5">
                                                        <label>ULE Amount</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control ctn-ip" value={rate ? (rate * depositeAmount) : 0} />
                                                    </div>
                                                </div>
                                                <div className="row text-center">
                                                    <div className="col-md-5"></div>
                                                    <div className="col-md-3" id="divsubmit">
                                                        <button className="btn btn-success withdraw_btn" onClick={() => Withdraw_toke()}>
                                                            {
                                                                isLoadingTrans ?
                                                                    <>
                                                                        <div class="spinner-border" role="status">
                                                                            <span class="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </>
                                                                    : "Withdrawal"

                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--end row--> */}
                    <br />
                    <br />
                </div>
            </div>
            {/* <!----======body section end=====----> */}
            <Footer />
        </div>
    )
}

export default Withdrawal_Matic_5050