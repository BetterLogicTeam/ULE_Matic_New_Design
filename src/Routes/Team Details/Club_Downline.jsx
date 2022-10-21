import { useState, useEffect } from 'react'
import Table from '../../Components/Table/Table'
import Table_Buttons from '../../Components/Table_Buttons/Table_Button'
import moment from 'moment'
// import './Matics_Downline.css'
import { API } from '../../Redux/actions/API'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'

function Club_Downline() {
  const [currentPage, setcurrentPage] = useState(1)
  var [level_details, set_level_details] = new useState({
    cols: [
      { Header: 'S.No', accessor: 'sr' },
      { Header: 'User ID', accessor: 'user_id' },
      { Header: 'Level', accessor: 'level' },
      { Header: 'Auto Club', accessor: 'package' },
      { Header: 'Date', accessor: 'date' },
    ],
    rows: [
      {
        sr: '1',
        user_id: '726340',
        level: '9',
        reg_date: '23/06/2022',
        activation_date: '23/06/2022',
        id_type: 'Inactive',
        package: 'Inactive USD',
      },
      {
        sr: '2',
        user_id: '726340',
        level: '9',
        reg_date: '23/06/2022',
        activation_date: '23/06/2022',
        id_type: 'Inactive',
        package: 'Inactive USD',
      },
      {
        sr: '3',
        user_id: '726340',
        level: '9',
        reg_date: '23/06/2022',
        activation_date: '23/06/2022',
        id_type: 'Inactive',
        package: 'Inactive USD',
      },
      {
        sr: '4',
        user_id: '726340',
        level: '9',
        reg_date: '23/06/2022',
        activation_date: '23/06/2022',
        id_type: 'Inactive',
        package: 'Inactive USD',
      },
    ],
  })
  const [LevelValue, setLevelValue] = useState(0)
  const [referralApi, setreferralApi] = useState([])
  const [PackgaeValue, setPackageValue] = useState(0)

  const referral_API = async () => {
    try {
      const user = localStorage?.getItem('user')
      let ress = JSON?.parse(user)
      let uId = ress?.uid

      let responce = await API?.get(`/matrixDownline?id=${uId}&package=${PackgaeValue}&level=${LevelValue}`)
      responce = responce?.data?.data
      console.log('responce', responce)

      let arr = []
      responce?.forEach((item, index) => {
        arr?.push({
          sr: index + 1,
          user_id: `${item?.uid} `,
          fromid: `${item?.sid} `,
          level: `${item?.leveltype} `,
          package: `${item?.package}`,
          date: item.dd,
        })
      })

      setreferralApi(arr)
    } catch (e) {
      console.log('Error While calling Referrer API', e)
    }
  }

  useEffect(() => {
    referral_API()
  }, [])

  return (
    <div>
      <Navbar />
      {/* <!----======body section start=====----> */}
      <div className="page-wrapper">
        <div className="page-content">
          {/* <!--breadcrumb--> */}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Auto Club Forum</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:;">
                      <i className="bx bx-home-alt"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Team Details / Auto Club Forum
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* <!--end breadcrumb--> */}
          <div className="row" style={{ marginLeft: '10px' }}>
            <div className="col-md-3">
              <label>Select Level</label>
              <select
                className="System"
                id="level"
                onChange={(e) => {
                  setLevelValue(e.target.value)
                }}
              >
                <option value="0">All Levels</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>All Auto Club</label>
              <select
                className="System"
                id="level"
                onChange={(e) => {
                  setPackageValue(e.target.value)
                }}
              >
                <option value="0">All Auto Club</option>
                <option value="1">Auto Club 1</option>
                <option value="2">Auto Club 2</option>
                <option value="3">Auto Club 3</option>
                <option value="4">Auto Club 4</option>
                <option value="5">Auto Club 5</option>
                <option value="6">Auto Club 6</option>
                <option value="7">Auto Club 7</option>
                <option value="8">Auto Club 8</option>
                <option value="8">Auto Club 9</option>
                <option value="8">Auto Club 10</option>
                <option value="8">Auto Club 11</option>
                <option value="8">Auto Club 12</option>
                <option value="8">Auto Club 13</option>
                <option value="8">Auto Club 14</option>
                <option value="8">Auto Club 15</option>
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
              <input
                type="button"
                name="to_date"
                value="Search"
                onClick={() => {
                  referral_API()
                }}
                className="btn btn_clr mt_5"
              />
            </div>
          </div>
          <br />

          {/* <!--end breadcrumb-->  */}
          <div className="table-responsive">
            <Table data={referralApi} columns={level_details.cols} />

            <Table_Buttons
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
              data={{ first_value: '1', last_value: '10', current_value: '5' }}
            />
            {/* <table className="table card-table border table-vcenter text-nowrap align-items-center">
                        <thead className="thead-light">
                            <tr>
                                <th>S.No</th>
                                <th>User ID</th>
                                <th>Level</th>
                                <th>Auto Club</th>
                                <th>Date & Time</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>123</td>
                                <td>1</td>
                                <td>2</td>
                                <td>9/10/2022 7:35:0 PM</td>
                            </tr>
                            <tr>
                                <td> 2</td>
                                <td>123</td>
                                <td>1</td>
                                <td>2</td>
                                <td>9/10/2022 7:35:0 PM</td>
                            </tr>
                            <tr>
                                <td> 3</td>
                                <td>123</td>
                                <td>1</td>
                                <td>2</td>
                                <td>9/10/2022 7:35:0 PM</td>
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

export default Club_Downline
