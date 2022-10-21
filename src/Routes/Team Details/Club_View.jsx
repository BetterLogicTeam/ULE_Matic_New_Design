import React, { useState, useEffect } from 'react'
import Footer from '../../Containers/Footer/Footer'
import Navbar from '../../Containers/Navbar/Navbar'
import { API } from '../../Redux/actions/API'
import default_image from '../../Assets/tree/black.png'
import active_user from '../../Assets/tree/green.png'
import inactive_user from '../../Assets/tree/red.png'
var bol = true

function Club_View() {
  const user = localStorage?.getItem('user')
  let ress = JSON.parse(user)
  let uId = ress?.uid
  // const [userdata, setuserdata] = new useState([])
  const [Idnumer, setIdnumer] = useState(uId)
  const [arrValue, setArrValue] = useState([])
  const [loader, setloader] = useState(false)
  const [PackgaeValue, setPackageValue] = useState(1)

  const [userdata, setuserdata] = new useState([
    {
      name: 'User',
      id: '364734',
      registration_date: '31 Dec 2020',
      status: 'Active',
      total_left: '0',
      total_left_active: '0',
      left_business: '0',
      package_amount: '2500',
      topup_date: '31 Dec 2020',
      package: '',
      total_right: '0',
      total_right_active: '0',
      right_business: '0',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
    {
      name: '',
      id: '',
      registration_date: '',
      status: '',
      total_left: '',
      total_left_active: '',
      left_business: '',
      package_amount: '',
      topup_date: '',
      package: '',
      total_right: '',
      total_right_active: '',
      right_business: '',
    },
  ])

  const [value, setValue] = useState('');
  const handleSelect = (e) => {
    console.log(e);
    setValue(e)
  }
  console.log("setValue==>", value);
  const referral_API = async () => {
    setloader(true)

    try {
      // let ress = JSON?.parse(user);
      // let uId = ress?.uid;
      // let status = ress?.status
      console.log("PackgaeValue", PackgaeValue);
      if (Idnumer != null && Idnumer != undefined && Idnumer != '0' && Idnumer != '') {
        let responce = await API?.post('/matrix_tree', {
          uid: Idnumer,
          usersession_uid: '1',
          package: PackgaeValue,
        })
        responce = responce?.data?.data?.recordset

        console.log('Res_API', responce)
        let arr = []
        responce?.forEach((item, index) => {
          arr?.push({
            name: item.fname,
            id: item.uid,
            registration_date: item?.activationdate,
            status: item.activationdate ? 'Active' : 'UnActive',
            total_left: item.totalleft,
            total_left_active: item.totalleftActive,
            left_business: item.lbv,
            package_amount: item.packageamount,
            topup_date: item.activationdate,
            package: item.package,
            total_right: item.totalright,
            total_right_active: item.totalrightActive,
            right_business: item.rbv,
            sponser: item.sid,
            // date: item?.dd
          })
        })

        setuserdata(arr)
        if (bol) {
          setArrValue([...arrValue, arr[0].id])
          bol = false
        }
      }
    } catch (e) {
      // console.log("Error While calling Referrer API", e);
    }
    setloader(false)
  }
  function addValue(value) {
    if (arrValue.indexOf(value) === -1) {
      setArrValue([...arrValue, value])
    }

    // setArrValue([...arrValue,value])
    // arrValue.push(value)
    // arrValue.push(value)
  }
  console.log('what is arrValue', arrValue)
  var a
  function popoutvalue() {
    if (arrValue.length == 1 || arrValue.length == 0) {
      arrValue.pop()
      arrValue.unshift(userdata[0].id)
    } else {
      a = arrValue.splice(arrValue.length - 2, 1)
      setIdnumer(a[0])
      console.log('what is popout value', a[0])
    }
  }

  console.log('what is state data', userdata[0]?.id)
  console.log('what is id number', Idnumer)

  useEffect(() => {
    referral_API()
  }, [Idnumer])
  // React.useEffect(() => {
  //     return (() => {
  //         let team_info_div = document.querySelector('.team-info');
  //         let team_info_div_data = document.querySelectorAll('.team-info p')
  //         let user_img = document.querySelectorAll('.user-img');
  //         for (let x = 0; x < 15; x++) {
  //             user_img[x].addEventListener('mouseover', () => {
  //                 team_info_div_data[0].innerHTML += userdata[x].registration_date;
  //                 team_info_div_data[1].innerHTML += userdata[x].status;
  //                 team_info_div_data[2].innerHTML += userdata[x].total_left;
  //                 team_info_div_data[3].innerHTML += userdata[x].total_left_active;
  //                 team_info_div_data[4].innerHTML += userdata[x].left_business;
  //                 team_info_div_data[5].innerHTML += userdata[x].package_amount;
  //                 team_info_div_data[6].innerHTML += userdata[x].topup_date;
  //                 team_info_div_data[7].innerHTML += userdata[x].package;
  //                 team_info_div_data[8].innerHTML += userdata[x].total_right;
  //                 team_info_div_data[9].innerHTML += userdata[x].total_right_active;
  //                 team_info_div_data[10].innerHTML += userdata[x].right_business;

  //                 team_info_div.classList.remove('d-none');
  //                 team_info_div.setAttribute('style', `top:${user_img[x].getBoundingClientRect().top + 50}px; left:${user_img[x].getBoundingClientRect().left + 50};`);
  //             })
  //             user_img[x].addEventListener('mouseout', () => {
  //                 team_info_div_data[0].innerHTML = 'Registration Date :';
  //                 team_info_div_data[1].innerHTML = 'Status :';
  //                 team_info_div_data[2].innerHTML = 'Total Left :';
  //                 team_info_div_data[3].innerHTML = 'Total Left Active :';
  //                 team_info_div_data[4].innerHTML = 'Left Business :';
  //                 team_info_div_data[5].innerHTML = 'Packgae Amount :';
  //                 team_info_div_data[6].innerHTML = 'Topup Date: ';
  //                 team_info_div_data[7].innerHTML = 'Packgae : ';
  //                 team_info_div_data[8].innerHTML = 'Total Right : ';
  //                 team_info_div_data[9].innerHTML = 'Total Right Active : ';
  //                 team_info_div_data[10].innerHTML = 'Right Business : ';
  //                 team_info_div.classList.add('d-none');
  //             })
  //         }
  //     })
  // }, [])

  return (
    <div>
      <Navbar />
      {/* <!----======body section start=====----> */}
      <div className="page-wrapper">
        <div className="page-content">
          {/* <!--breadcrumb--> */}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Auto Club View</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:;">
                      <i className="bx bx-home-alt"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Team Details / Auto Club View
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="search-box">
                <form action="#" className="form-horizontal ng-pristine ng-valid" method="post" role="form">
                  <div className="form-wrapper">
                    <select
                      className="p-2 my-2 mx-3 profile-border bg-color col-10 col-md-10 col-lg-7"
                      style={{ color: 'white' }}

                      id="level"
                      onChange={(e) => {
                        setPackageValue(e.target.value)
                      }}
                    >
                      {/* <option value="0">All Auto Club</option> */}
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

                    <input
                      type="button"
                      name="to_date"
                      value="Submit"
                      onClick={() => {
                        referral_API()
                      }}

                      className="btn btn-sm btn-danger submit_btn"
                    />

                    {/* <input type="submit" value="SUBMIT" id="Search" 
                    className="btn btn-sm btn-danger submit_btn" /> */}
                    {/* <!-- <button id="#home"  type="button" className="btn btn-sm btn-danger topmargin float_rt">Home</button> --> */}
                    {/* <!-- <button onclick="goBack()" type="button" className="btn btn-sm btn-danger topmargin float_rt">Go BACK</button> --> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 row justify-content-center">
              <div style={{ padding: '0px' }}>
                <div>
                  <div className="row bg-theme bg-theme4">
                    <div className="card card-1" style={{ padding: '0px' }}>
                      <div id="tree" className="treeview" style={{ margin: '40px auto' }}>
                        <div className="treemember">
                          <div className="dropdown">
                            {/* <button className="dropbtn">
                              <img
                                src="assets/images/tree/1.png"
                                className="abc"
                                width="50"
                                height="50"
                                style={{ margin: '0px 80px', cursor: 'pointer', border: '2px solid green' }}
                              />
                            </button> */}
                            <button className="dropbtn">
                              <img
                                src={
                                  userdata[0].package >= 1
                                    ? active_user
                                    : userdata[0].package == 0 || null
                                      ? inactive_user
                                      : default_image
                                }
                                onClick={() => (setIdnumer(userdata[0].id), addValue(userdata[0].id))}
                                className="abc"
                                style={{ margin: '0px 80px', cursor: 'pointer', border: '2px solid green' }}
                                width="50"
                                height="50"
                              />
                            </button>
                            <div className="span" style={{ color: 'rgb(255, 255, 255)' }}>
                              {userdata[0]?.name} <br />
                              {userdata[0]?.id}
                            </div>
                          </div>
                        </div>
                        <div className="connecter1">
                          <img src="assets/images/tree/line1.png" style={{ width: '480px', height: '33px' }} />
                        </div>
                        <div className="tree_row">
                          <div className="row_2_child">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <img
                                  src={
                                    userdata[1].id == ''
                                      ? default_image
                                      : userdata[1].package >= 1
                                        ? active_user
                                        : userdata[1].package == 0 || null
                                          ? inactive_user
                                          : default_image
                                  }
                                  onClick={() => (setIdnumer(userdata[1].id), addValue(userdata[1].id))}
                                  className="abc"
                                  style={{ margin: '0px 80px', cursor: 'pointer', border: '2px solid green' }}
                                  width="50"
                                  height="50"
                                />
                              </button>
                              <div className="span" style={{ color: 'rgb(255, 255, 255)' }}>
                                {userdata[1]?.name} <br />
                                {userdata[1]?.id}
                              </div>
                            </div>
                          </div>
                          <div className="row_2_child">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <img
                                  src={
                                    userdata[2].id == ''
                                      ? default_image
                                      : userdata[2].package >= 1
                                        ? active_user
                                        : userdata[2].package == 0 || null
                                          ? inactive_user
                                          : default_image
                                  }
                                  onClick={() => (setIdnumer(userdata[2].id), addValue(userdata[2].id))}
                                  className="abc"
                                  style={{ margin: '0px 80px', cursor: 'pointer', border: '2px solid green' }}
                                  width="50"
                                  height="50"
                                />
                              </button>
                              <div className="span" style={{ color: 'rgb(255, 255, 255)' }}>
                                {userdata[2]?.name} <br />
                                {userdata[2]?.id}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tree_row" style={{ height: '34px' }}>
                          <div className="row_2_child" style={{ height: '34px' }}>
                            <img src="assets/images/tree/line2.png" style={{ width: '253px', height: '32px' }} />
                          </div>
                          <div className="row_2_child" style={{ height: '34px' }}>
                            <img src="assets/images/tree/line2.png" style={{ width: '253px', height: '32px' }} />
                          </div>
                        </div>
                        <div className="tree_row">
                          <div className="row_3_child">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <img
                                  src={
                                    userdata[3].id == ''
                                      ? default_image
                                      : userdata[3].package >= 1
                                        ? active_user
                                        : userdata[3].package == 0 || null
                                          ? inactive_user
                                          : default_image
                                  }
                                  onClick={() => (setIdnumer(userdata[3].id), addValue(userdata[3].id))}
                                  className="abc"
                                  style={{ margin: '0px 80px', cursor: 'pointer', border: '2px solid green' }}
                                  width="50"
                                  height="50"
                                />
                              </button>
                              <div className="span" style={{ color: 'rgb(255, 255, 255)' }}>
                                {userdata[3]?.name} <br />
                                {userdata[3]?.id}
                              </div>
                            </div>
                          </div>
                          <div className="row_3_child">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <img
                                  src={
                                    userdata[4].id == ''
                                      ? default_image
                                      : userdata[4].package >= 1
                                        ? active_user
                                        : userdata[4].package == 0 || null
                                          ? inactive_user
                                          : default_image
                                  }
                                  onClick={() => (setIdnumer(userdata[4].id), addValue(userdata[4].id))}
                                  className="abc"
                                  style={{ margin: '0px 80px', cursor: 'pointer', border: '2px solid green' }}
                                  width="50"
                                  height="50"
                                />
                              </button>
                              <div className="span" style={{ color: 'rgb(255, 255, 255)' }}>
                                {userdata[4]?.name} <br />
                                {userdata[4]?.id}
                              </div>
                            </div>
                          </div>
                          <div className="row_3_child">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <img
                                  src={
                                    userdata[5].id == ''
                                      ? default_image
                                      : userdata[5].package >= 1
                                        ? active_user
                                        : userdata[5].package == 0 || null
                                          ? inactive_user
                                          : default_image
                                  }
                                  onClick={() => (setIdnumer(userdata[5].id), addValue(userdata[5].id))}
                                  className="abc"
                                  style={{ margin: '0px 80px', cursor: 'pointer', border: '2px solid green' }}
                                  width="50"
                                  height="50"
                                />
                              </button>
                              <div className="span" style={{ color: 'rgb(255, 255, 255)' }}>
                                {userdata[5]?.name} <br />
                                {userdata[5]?.id}
                              </div>
                            </div>
                          </div>
                          <div className="row_3_child">
                            <div className="dropdown">
                              <button className="dropbtn">
                                <img
                                  src={
                                    userdata[6].id == ''
                                      ? default_image
                                      : userdata[6].package >= 1
                                        ? active_user
                                        : userdata[6].package == 0 || null
                                          ? inactive_user
                                          : default_image
                                  }
                                  onClick={() => (setIdnumer(userdata[6].id), addValue(userdata[6].id))}
                                  className="abc"
                                  style={{ margin: '0px 80px', cursor: 'pointer', border: '2px solid green' }}
                                  width="50"
                                  height="50"
                                />
                              </button>
                              <div className="span" style={{ color: 'rgb(255, 255, 255)' }}>
                                {userdata[6]?.name} <br />
                                {userdata[6]?.id}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-info d-none position-fixed text-white col-10 col-lg-6 col-md-7 col-xl-4 col-xxl-3 px-2 py-3 br-1">
                <h6 className="border_bottom m-0 sponser">Sposer:</h6>
                <div className="d-flex flex-row justify-content-between align-items-start">
                  <div
                    className="d-flex flex-column pt-2 align-items-start justify-content-start"
                    style={{ width: '50%' }}
                  >
                    <p className="bg-b m-0 p-1">Registration Date :</p>
                    <p className="m-0 p-1">Status :</p>
                    <p className="bg-b m-0 p-1">Total Forum A Active :</p>
                    <p className="m-0 p-1">Total Forum A Active :</p>
                    <p className="bg-b m-0 p-1">Forum A Business :</p>
                    <p className="m-0 p-1">Packgae Amount :</p>
                  </div>
                  <div
                    className="d-flex flex-column pt-2 align-items-start border_start justify-content-start"
                    style={{ width: '50%' }}
                  >
                    <p className="bg-b m-0 p-1">Topup Date:</p>
                    <p className="m-0 p-1">Packgae :</p>
                    <p className="bg-b m-0 p-1">Total Forum B Active :</p>
                    <p className="m-0 p-1">Total Forum B Active :</p>
                    <p className="bg-b m-0 p-1">Forum B Business :</p>
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

export default Club_View
