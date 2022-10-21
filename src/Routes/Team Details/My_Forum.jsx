import React, { useState } from 'react'
import Table_Buttons from '../../Components/Table_Buttons/Table_Button'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'

function My_Forum() {
    const [referralApi, setreferralApi] = useState([])
    const [referralApi_right, setreferralApiRight] = useState([])
  
    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)
    const [currentPage2, setcurrentPage2] = useState(1)
    const [listPerpage2, setlistPerpage2] = useState(10)

    const indexOfLastPost = currentPage * listPerpage
    const indexOfFirstPage = indexOfLastPost - listPerpage
    const indexOfLastPost2 = currentPage2 * listPerpage2
    const indexOfFirstPage2 = indexOfLastPost2 - listPerpage2
    const currentPost = referralApi.slice(indexOfFirstPage, indexOfLastPost)
    const currentPostRight = referralApi_right.slice(indexOfFirstPage2, indexOfLastPost2)
  return (
    <div>
<Navbar />
{/* <!----======body section start=====----> */}
        <div className="page-wrapper">
            <div className="page-content">
                {/* <!--breadcrumb--> */}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">My Forum</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Team Details / My Forum</li>
                            </ol>
                        </nav>
                    </div>

                </div>
                {/* <!--end breadcrumb--> */}
                <div className="row">
                    <div className="col-md-6">
                        <div className="table-responsive">
                            <table className="table card-table border table-vcenter text-nowrap align-items-center">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S.No</th>
                                        <th>ID</th>
                                        <th>Package</th>
                                        <th>Reg Date & Time</th>
                                        <th>Remark</th>
                                        <th>Activation Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination-box">
                            <ul>
                                <li className="page-start disabled"><a href="javascript:void(0);">First</a></li>
                                <li className="page-last "><a href="javascript:void(0);">Prev</a></li>
                                <li className="page-number on " data-page="1"><a href="javascript:void(0);">1</a></li>
                                <li className="page-number " data-page="1"><a href="javascript:void(0);">2</a></li>
                                <li className="page-next "><a href="javascript:void(0);">Next</a></li>
                                <li className="page-end disabled"><a href="javascript:void(0);">Last</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="table-responsive">
                            <table className="table card-table border table-vcenter text-nowrap align-items-center">
                                <thead className="thead-light">
                                    <tr>
                                        <th>S.No</th>
                                        <th>ID</th>
                                        <th>Package</th>
                                        <th>Reg Date & Time</th>
                                        <th>Remark</th>
                                        <th>Activation Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>625029</td>
                                        <td>0 USD</td>
                                        <td>23/09/2022 12:47 PM</td>
                                        <td>Inactive</td>
                                        <td>23/09/2022 12:47 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination-box">
            <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} />
                       
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

export default My_Forum