import React from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'

function Withdrawal_history() {
    
  return (
    <div>
<Navbar />
{/* <!----======body section start=====----> */}
        <div className="page-wrapper">
            <div className="page-content">
                {/* <!--breadcrumb--> */}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Withdrawal History</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">History /  Withdrawal History</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* <!--end breadcrumb--> */}
                <div className="table-responsive">
                    <table  cellpadding="0" cellspacing="0" className="table align-middle mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th>S.No</th>
                                <th>Crypto Mode</th>
                                <th>Withdrawal USD</th>
                                <th>USD</th>
                                <th>ULE</th>
                                <th>TXN</th>
                                <th>Paid Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Bnb/Matic</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td><a href="#"><img className='img-ip-1' src='assets/images/icons/square-check-regular.svg' alt='' /> View Txn</a></td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>  
                            <tr>
                                <td>2</td>
                                <td>Bnb/Matic</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td><a href="#"><img className='img-ip-1' src='assets/images/icons/square-check-regular.svg' alt='' /> View Txn</a></td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>  
                            <tr>
                                <td>3</td>
                                <td>Bnb/Matic</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td><a href="#"><img className='img-ip-1' src='assets/images/icons/square-check-regular.svg' alt='' /> View Txn</a></td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>  
                            <tr>
                                <td>4</td>
                                <td>Bnb/Matic</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td><a href="#"><img className='img-ip-1' src='assets/images/icons/square-check-regular.svg' alt='' /> View Txn</a></td>
                                <td>10/10/2022 03:32:15</td>
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
                {/* <!--end row--> */}
            </div>
        </div>
        {/* <!----======body section end=====----> */}
        <Footer />
    </div>
  )
}

export default Withdrawal_history