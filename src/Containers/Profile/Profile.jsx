import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

function Profile() {
  return (
    <div>
<Navbar />
{/* <!----======body section start=====----> */}
        <div className="page-wrapper">
            <div className="page-content">
                {/* <!--breadcrumb--> */}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Profile</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Activation / Profile</li>
                            </ol>
                        </nav>
                    </div>
              </div>
                {/* <!--end breadcrumb--> */}
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="profile_item">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Enter ID</label>
                                    <input type="email" name="email" id="from_date" className="form-control" placeholder="Enter ID" />
                                </div>
                                <div className="col-md-12">
                                    <label>Enter Password</label>
                                    <input type="password" name="email" id="from_date" className="form-control" placeholder="Enter Password" />
                                </div>
                                <div className="col-md-12">
                                    <div className="connect_metamask">
                                        <a href="javaScript:void(0);">
                                            <img src="assets/images/metamask-icon.png" />
                                            Connect Metamask
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="submit_btn2">
                                        <button type="button" className="btn">Submit</button>
                                    </div>
                                </div>
                            </div>
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

export default Profile