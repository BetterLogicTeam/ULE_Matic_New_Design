import React, { useState, useEffect } from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'
// import { PagePath, Table, Table_Buttons } from "../../Components";
import Table_Buttons from '../../Components/Table_Buttons/Table_Button'
import { API } from '../../Redux/actions/API'
import moment from "moment";

function ActivateHistory() {
    const [referralApi, setreferralApi] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)


    const referral_API = async () => {
        try {

            const user = localStorage?.getItem("user");

            let ress = JSON.parse(user);
            let uId = ress?.uid;


            let responce = await API?.get(`activationHistory?id=${uId}`)
            // let responce = await API?.get(`https://ulematic-live-api.herokuapp.com/login?id=778899`)
            let dataaa = responce?.data.data;
            console.log("responce", dataaa);

            let arr = []
            dataaa?.forEach((item, index) => {
                // console.log("item", item);


                arr?.push({
                    sr: index + 1,
                    uid: item.uid,
                    package_amount: item?.packageamount,
                    remark: item?.remark,
                    type: item.type,
                    txn: item?.txn,
                    date: moment(item?.edate).format("M/D/YYYY h:m:s A")
                });



            }
            )
            console.log("arr", arr);

            setreferralApi(arr)
            console.log("referralApi", referralApi);
        } catch (e) {
            console.log("Error While calling Referrer API", e);
        }
    }

    useEffect(() => {
        referral_API()
    }, [])


    const indexOfLastPost = currentPage * listPerpage;
    const indexOfFirstPage = indexOfLastPost - listPerpage;
    const currentPost = referralApi.slice(indexOfFirstPage, indexOfLastPost)


    var [activate_history, set_activate_history] = new useState({
        cols: [
            { Header: '#', accessor: 'sr' },
            { Header: 'User_ID', accessor: 'uid' },

            { Header: 'Package Amount', accessor: 'package_amount' },
            { Header: 'Remark', accessor: 'remark' },
            { Header: 'TXN', accessor: 'txn' },
            { Header: 'Date', accessor: 'date' }],
        rows: [
            { sr: '1', package_amount: '100 USD', reamrk: 'Activate', txn: 'View txn', date: '20-05-2022' },
            { sr: '2', package_amount: '100 USD', reamrk: 'Upgrade', txn: 'View txn', date: '20-05-2022' },
            { sr: '3', package_amount: '100 USD', reamrk: 'Upgrade', txn: 'View txn', date: '20-05-2022' },
        ]
    });
    return (
        <div>
            <Navbar />
            {/* <!----======body section start=====----> */}
            <div className="page-wrapper">
                <div className="page-content">
                    {/* <!--breadcrumb--> */}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Activate History</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Activation / Activate History</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="col-md-12 py-3">
                        {/* <PagePath data={{ page_name: "Activate  History", page_path: "Activation / Activate History" }} /> */}
                        <div className="table-responsive mb-4">
                            <table className="table mb-0">
                                <thead className="thead-light">
                                    <tr>
                                        <th>#</th>
                                        <th>User ID</th>
                                        <th>Package Amount</th>

                                        <th>Remark </th>
                                        <th>Payment Type </th>
                                        <th>Txn</th>
                                        <th>Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody className="thead-light">

                                    {referralApi.map((items) => {
                                        return (
                                            <tr>
                                                <td>{items.sr}</td>
                                                <td>{items.uid}</td>
                                                <td>{items.package_amount} USD</td>

                                                <td>{items.remark}</td>
                                                <td>{items.type}</td>
                                                {items.type == "MATIC" ?
                                                    <td>
                                                        <a href={`https://polygonscan.com/tx/${items.txn}`} target={'_blank'} >View Txn</a>
                                                    </td>
                                                    :
                                                    <td>
                                                        <a href={`https://bscscan.com/tx/${items.txn}`} target={'_blank'} >View Txn</a>
                                                    </td>
                                                }
                                                <td>{items?.date}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>

                            </table>
                        </div>
                        {/* <Table
                        data={currentPost}
                        columns={activate_history.cols}
                    /> */}
                        <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} />

                    </div>
                    {/* <!--end breadcrumb--> */}
                    {/* <div className="table-responsive mb-4">
                    <table cellpadding="0" cellspacing="0" className="table mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>User ID</th>
                                <th>Package Amount</th>
                                
                                <th>Remark </th>
                                <th>Txn</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className="thead-light border">
                            {referralApi.map((items)=>{
                                return (
                                    <tr>
                                    <td>{items.sr}</td>
                                    <td>{items.uid}</td>
                                    <td>{items.package_amount} USD</td>
                                    
                                    <td>{items.remark}</td>
                                    <td>{items.txn}</td>
                                    <td>{items.date}</td>
                                </tr>
                                )
                            })}
                           
                            </tbody>
                         
                    </table>
                </div> */}
                    {/* <div className="table-responsive">
                    <table cellpadding="0" cellspacing="0" className="table align-middle mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>User ID</th>
                                <th>Package Amount</th>
                                
                                <th>Remark </th>
                                <th>Txn</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {referralApi.map((items)=>{
                                return (
                                    <tr>
                                    <td>{items.sr}</td>
                                    <td>{items.uid}</td>
                                    <td>{items.package_amount} USD</td>
                                    
                                    <td>{items.remark}</td>
                                    <td>{items.txn}</td>
                                    <td>{items.date}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div> */}
                    {/* <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} /> */}
                    {/* <div className="pagination-box">
                    <ul>
                        <li className="page-start disabled"><a href="javascript:void(0);">First</a></li>
                        <li className="page-last "><a href="javascript:void(0);">Prev</a></li>
                        <li className="page-number on " data-page="1"><a href="javascript:void(0);">1</a></li>
                        <li className="page-number " data-page="1"><a href="javascript:void(0);">2</a></li>
                        <li className="page-next "><a href="javascript:void(0);">Next</a></li>
                        <li className="page-end disabled"><a href="javascript:void(0);">Last</a></li>
                    </ul>
                </div> */}
                    {/* <!--end row--> */}
                </div>
            </div>
            {/* <!----======body section end=====----> */}
            <Footer />
        </div>
    )
}

export default ActivateHistory