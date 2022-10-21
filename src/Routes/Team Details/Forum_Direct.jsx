// import React from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'
import { useEffect, useState } from "react";
import Table from '../../Components/Table/Table'
import Table_Buttons from '../../Components/Table_Buttons/Table_Button'
import { API } from "../../Redux/actions/API";

function Forum_Direct() {
    const [referralApi, setreferralApi] = useState([])
    const [referralApi_right, setreferralApiRight] = useState([])

    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)
    const referral_API = async () => {
        try {

            const user = localStorage?.getItem("user");
            let ress = JSON.parse(user);
            let uId = ress?.uid;

            let responce = await API?.get(`directLegBusiness?id=${uId}`)
            let dataaa = responce?.data.data;
            console.log("responce", dataaa);

            let arr = []
            dataaa.forEach((item, index) => {
                arr?.push({
                    sr: item.rowNumber,
                    investment: item?.selfbv,
                    user_id: item?.uid,
                    team_business: item?.teambv,
                    group_business: item?.gbv

                });
            })

            setreferralApi(arr)

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


    var [direct_leg_business, set_direct_leg_business] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'sr' },
            { Header: 'User ID', accessor: 'user_id' },
            { Header: 'Investment', accessor: 'investment' },
            { Header: 'Team Business', accessor: 'team_business' },
            { Header: 'Group Business', accessor: 'group_business' }

        ]
    });
    return (
        <div>
            <Navbar />
            {/* <!----======body section start=====----> */}
            <div className="page-wrapper">
                <div className="page-content">
                    {/* <!--breadcrumb--> */}
                    <div className="page-breadcrumb  d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Leg Business</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Team Details / Leg Business</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    {/* <!--end breadcrumb-->
                <!--end breadcrumb--> */}
                    <div className="table-responsive">
                        <Table
                            data={currentPost}
                            columns={direct_leg_business.cols}
                        />


                        <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} />
                    </div>
                    {/* <!--end row--> */}
                </div>
            </div>
            {/* <!----======body section end=====----> */}
            <Footer />
        </div>
    )
}

export default Forum_Direct