import moment from "moment";
import { useEffect, useState } from "react";
import Table from '../../Components/Table/Table'
import Table_Buttons from '../../Components/Table_Buttons/Table_Button'
import { API } from "../../Redux/actions/API";
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'

function Auto_Club_Reward() {

    const [referralApi, setreferralApi] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [listPerpage, setlistPerpage] = useState(10)
    const [PackgaeValue, setPackageValue] = useState(0);


    const referral_API = async () => {
        try {

            const user = localStorage?.getItem("user");
            let ress = JSON?.parse(user);
            let uId = ress?.uid;


            let responce = await API?.get(`poolIncome?id=${uId}&package=${PackgaeValue}`)
            responce = responce?.data?.data;

            console.log("responce", responce);
            let arr = []
            responce?.forEach((item, index) => {

                arr?.push({
                    sr: index + 1,
                    id: `${item?.uid} `,
                    fromid: `${item?.fromid} `,

                    level: `${item?.level} `,
                    package: `${item?.remark} `,

                    income_usd: `${item?.income} `,
                    date: item.ee
                    // date: item?.edate


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






    var [matching_level_income, set_matching_level_income] = new useState({
        cols: [
            { Header: 'S.No', accessor: 'sr' },
            // { Header: 'User ID', accessor: 'id' },
            { Header: 'From ID', accessor: 'fromid' },

            { Header: 'Level', accessor: 'level' },
            { Header: 'Remark', accessor: 'package' },

            { Header: 'Income(USD)', accessor: 'income_usd' },
            { Header: 'Date', accessor: 'date' }]
    });
    return (
        <div>
            <Navbar />
            {/* <!----======body section start=====----> */}
            <div className="page-wrapper">
                <div className="page-content">
                    {/* <!--breadcrumb--> */}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Auto Pool Reward</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">All Reward / Auto Pool Reward</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    {/* <!--end breadcrumb--> */}
                    <div className="row" style={{ marginLeft: "10px" }}>
                        <div className="col-md-3">
                            <label>All Auto Club</label>
                            <select className="System" id="level" onChange={(e) => {
                                setPackageValue(e.target.value)
                            }}>
                                <option value="">All Auto Club</option>
                                <option value="1">Auto Club 1</option>
                                <option value="2">Auto Club 2</option>
                                <option value="3">Auto Club 3</option>
                                <option value="4">Auto Club 4</option>
                                <option value="5">Auto Club 5</option>
                                <option value="6">Auto Club 6</option>
                                <option value="7">Auto Club 7</option>
                                <option value="8">Auto Club 8</option>
                                <option value="9">Auto Club 9</option>
                                <option value="10">Auto Club 10</option>
                                <option value="11">Auto Club 11</option>
                                <option value="12">Auto Club 12</option>
                                <option value="13">Auto Club 13</option>
                                <option value="14">Auto Club 14</option>
                                <option value="15">Auto Club 15</option>
                            </select>
                        </div>
                        {/* <!-- <div className="col-md-3">
                        <label>Enter From Date</label>
                        <input type="date" name="from_date" id="from_date" className="System" placeholder="Enter From Date">
                    </div><br><br> -->
                    <!-- <div className="col-md-3">
                        <label>Enter To Date</label>
                        <input type="date" name="to_date" id="to_date" className="System">
                    </div><br><br> --> */}
                        <div className="col-md-3">
                            <input type="submit" name="to_date" onClick={() => {
                                referral_API()
                            }} value="Search" className="btn btn-primary mt_5" />
                        </div>
                    </div>
                    <br />

                    {/* <!--end breadcrumb--> */}
                    <div className="table-responsive">
                        <Table
                            data={[...currentPost]}
                            columns={matching_level_income.cols}
                        />
                        <Table_Buttons indexOfFirstPage={indexOfFirstPage} indexOfLastPost={indexOfLastPost} setcurrentPage={setcurrentPage} currentPage={currentPage} totalData={referralApi.length} listPerpage={listPerpage} />

                        {/* <table className="table card-table border table-vcenter text-nowrap align-items-center">
                        <thead className="thead-light">
                            <tr>
                                <th>S.No</th>
                            
                                <th>From Id</th>
                                <th>Level</th>
                                <th>Remark</th>
                                <th>Income</th>
                                <th>Date & Time</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>123</td>
                                <td>2</td>
                                <td>Pool-1</td>
                                <td>123 USD</td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>
                            <tr>
                                <td> 2</td>
                                <td>123</td>
                                <td>2</td>
                                <td>Pool-1</td>
                                <td>123 USD</td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>
                            <tr>
                                <td> 3</td>
                                <td>123</td>
                                <td>2</td>
                                <td>Pool-1</td>
                                <td>123 USD</td>
                                <td>10/10/2022 03:32:15</td>
                            </tr>
                        </tbody>
                    </table> */}
                    </div>
                    {/* <!--end row--> */}
                </div>
            </div>
            {/* <!----======body section end=====----> */}
            <Footer />
        </div>
    )
}

export default Auto_Club_Reward