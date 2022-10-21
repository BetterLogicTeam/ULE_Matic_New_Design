import React, { useEffect, useRef, useState } from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'
import { AiOutlineCopy } from 'react-icons/ai'
import { toast } from 'react-toastify'
// import CopyToClipboard from "react-copy-to-clipboard";

function Contract_Address() {
    const [copySuccess, setCopySuccess] = useState('')
    const [copyTest, setcopyTest] = useState(false)


    useEffect(() => {
        copyTest ? toast.success("Copied") : <></>
        setTimeout(() => {
            setcopyTest(false)
        }, 10);
    }, [copyTest])
    return (
        <div>
            <Navbar />
            {/* <!----======body section start=====----> */}
            <div className="page-wrapper">
                <div className="page-content">
                    {/* <!--breadcrumb--> */}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Contract Address</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Address / Contract Address</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    {/* <!--end breadcrumb-->
                <!--end breadcrumb--> */}
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <h4 className="text-white" style={{ marginTop: "100px", color: "white" }}>
                                    Contract Address&nbsp;:&nbsp;<span style={{ fontSize: "large" }}><a href="https://polygonscan.com/address/0x463c85c1f3059f790e74b85d98b9ea211261011a" className="text-white" target="_blank"> 0x463c85c1f3059f790e74b85d98b9ea211261011a</a></span>
                                    {/* <CopyToClipboard text={`0x463c85c1f3059f790e74b85d98b9ea211261011a`}
                                        onCopy={() => setcopyTest(true)}  >
                                        <AiOutlineCopy />
                                    </CopyToClipboard> */}

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

export default Contract_Address