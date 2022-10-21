import { useEffect, useState } from "react";
import Table from '../../Components/Table/Table'
import Table_Buttons from '../../Components/Table_Buttons/Table_Button'
import { API } from '../../Redux/actions/API'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'

function Daily_Yield_Reward() {

    const [referralApi, setreferralApi] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)

    const referral_API = async () => {
        try {

            const user = localStorage?.getItem("user");
            let ress = JSON?.parse(user);
            let uId = ress?.uid;

            let responce = await API?.get(`roiIncome?id=${uId}`)
            responce = responce?.data?.data;

            console.log("Res", responce);
            let arr = []
            responce?.forEach((item, index) => {

                arr?.push({
                    sr: item.RowNumber,
                    id: `${item?.uid} `,
                    // token: `${item?.plan_amount} `,
                    income_usd: `${item?.plan_amount} $`,
                    // date:moment(item?.edate).format("M/D/YYYY h:m:s A")
                    date: item?.edate

                });



            }
            )
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


    var [roi_income, set_roi_income] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'sr' },
            { Header: 'From ID', accessor: 'id' },
            // { Header: 'Package(USD)', accessor: 'token' },
            { Header: 'Income', accessor: 'income_usd' },
            { Header: 'Date & Time', accessor: 'date' }]

    });
    return (
        <div>
            <Navbar />
            {/* <!----======body section start=====----> */}
            <div className="page-wrapper">
                <div className="page-content">
                    {/* <!--breadcrumb--> */}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Activation Daily yield</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">All Reward / Activation Daily yield</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    {/* <!--end breadcrumb--> */}
                    <div className="table-responsive">
                        <Table
                            data={[...currentPost]}
                            columns={roi_income.cols}
                        />
                        {/* <table cellpadding="0" cellspacing="0" className="table align-middle mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th>S.No</th>
                                <th>From ID</th>
                                <th>Income</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>100 </td>
                                <td>123 USD</td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>100 </td>
                                <td>123 USD</td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>100 </td>
                                <td>123 USD</td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>
                        </tbody>
                    </table> */}
                    </div>
                    <div className="pagination-box">
                        <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} />
                        {/* <ul>
                        <li className="page-start disabled"><a href="javascript:void(0);">First</a></li>
                        <li className="page-last "><a href="javascript:void(0);">Prev</a></li>
                        <li className="page-number on " data-page="1"><a href="javascript:void(0);">1</a></li>
                        <li className="page-next "><a href="javascript:void(0);">Next</a></li>
                        <li className="page-end disabled"><a href="javascript:void(0);">Last</a></li>
                    </ul> */}
                    </div>
                    {/* <!--end row--> */}
                </div>
            </div>
            {/* <!----======body section end=====----> */}
            <Footer />
        </div>
    )
}

export default Daily_Yield_Reward