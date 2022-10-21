import React from 'react'
import { useState, useEffect } from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'
import { API } from '../../Redux/actions/API'

function Self_Address() {
    const [address, setaddress] = useState()
    const user = localStorage?.getItem('user')
    let ress = JSON.parse(user)
    let uId = ress?.uid

    const userAddress = async () => {
        let res = await API.get(`wallet_address?id=${uId}`);
        res = res?.data?.data;
        setaddress(res)
    }

    useEffect(() => {
        userAddress()
    }, [])

    return (
        <div>
            <Navbar />
            {/* <!----======body section start=====----> */}
            <div className="page-wrapper">
                <div className="page-content">
                    {/* <!--breadcrumb--> */}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Self Address</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Address / Self Address</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    {/* <!--end breadcrumb--> */}
                    {/* <!--end breadcrumb--> */}
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <h4 className="text-white" style={{ marginTop: "100px", color: "white" }}>
                                    Wallet Address&nbsp;:&nbsp;<span style={{ fontSize: "large" }}><a href="#" className="text-white">{address || "Connect Wallet"}</a></span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    {/* <!--end row--> */}
                </div>
            </div>
            {/* <!----======body section end=====----> */}
            <Footer />
        </div>
    )
}

export default Self_Address