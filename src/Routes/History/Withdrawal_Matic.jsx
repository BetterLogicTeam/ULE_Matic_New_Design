import React from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'
import './History.css'
import {Dropdown} from 'react-bootstrap'

function Withdrawal_Matic() {

    return (
        <div>
            <Navbar />
            {/* <!----======body section start=====----> */}
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <div className="modal-dialog">
                                <div className="modal-content exchange_width">
                                    <div className="modal-header exchange_hd">
                                        <h1>Withdrawal Matic</h1>
                                        <Dropdown>
                                            <Dropdown.Toggle  id="dropdown-basic">
                                               Select Withdrawal
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-2">Reg. Withdrawal</Dropdown.Item>
                                                <Dropdown.Item href="#/action-1">Activation Withdrawal </Dropdown.Item>
                                            
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="modal-body">
                                        <form className="box box-default table-wrapper ng-pristine ng-valid ng-valid-maxlength" ng-submit="withDrawalAmount()">
                                            <div className="panel-body">
                                                <span id="metamaskConnection" style={{ color: "red" }}>wallet is not connected..!..Wait...</span>
                                                <div className="row my_Set">
                                                    <div className="col-md-5">
                                                        <label>Wallet Net USD Value</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-control ctn-ip ng-pristine ng-untouched ng-valid ng-binding ng-not-empty" ng-model="p.netbal_staketoken" id="netbal_staketoken">38.3300</label>
                                                    </div>
                                                </div>
                                                <div className="row my_Set">
                                                    <div className="col-md-5">
                                                        <label>ULE Amount </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control ctn-ip mb-20 ng-pristine ng-valid ng-empty ng-valid-maxlength" id="amount" placeholder="000" maxlength="10" />
                                                    </div>
                                                </div>
                                                <div className="row mrset my_Set">
                                                    <div className="col-md-5">
                                                        <label>Matic Amount</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control ctn-ip" id="tokenvalue1" placeholder="000 " />
                                                    </div>
                                                </div>
                                                <div className="row mrset my_Set">
                                                    <div className="col-md-5">
                                                        <label>Enter USD Amount</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control ctn-ip" id="tokenvalue1" placeholder=" " />
                                                    </div>
                                                </div>
                                                <div className="row text-center">
                                                    <div className="col-md-5"></div>
                                                    <div className="col-md-3" id="divsubmit">
                                                        <button className="btn btn-success withdraw_btn" type="submit" onclick="return withdrawAmount_v1();" id="btnother">Withdrawal</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

export default Withdrawal_Matic