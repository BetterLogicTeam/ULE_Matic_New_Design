import React, { useState, useRef, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { API } from '../../Redux/actions/API'
import Chart from 'react-apexcharts'
import './Dashboard.css'
// import logo from "assets/images/ule.png"
import Total_Earning from '../../Components/Total Earning/Total Earning'

function Dashboard() {
  const [withdrawal, setWithdrawal] = useState()
  const [netBalance, setNetBalance] = useState()
  const [id, setID] = useState()
  const [leftReffTotal, setLeftReffTotal] = useState()
  const [leftDownTotal, setLeftDownTotal] = useState()
  const [leftReff, setLeftReff] = useState()
  const [totalIncom, setTotalIncome] = useState()
  const [leftReffAct, setLeftReffAct] = useState()
  const [leftDownAct, setLeftDownAct] = useState()
  const [rightReffTotal, setRightReffTotal] = useState()
  const [rightDownTotal, setRightDownTotal] = useState()
  const [rightReff, setRightReff] = useState()
  const [rightReffAct, setRightReffAct] = useState()
  const [rightDownAct, setRightDownAct] = useState()
  const [investment, setInvestment] = useState()
  const [leftBuss, setLeftBuss] = useState()
  const [rightBuss, setRightBuss] = useState()
  const [referral, setReferral] = useState()
  const [registration_directIncome, setregistration_directIncome] = useState()
  const [registration_roi_income, setregistration_roi_income] = useState()
  const [activation_roi_income, setactivation_roi_income] = useState()
  const [activation_direct_income, setactivation_direct_income] = useState()
  const [activation_binary_income, setactivation_binary_income] = useState()
  const [pool_income, setpool_income] = useState()
  const [MaxIncome, setMaxIncome] = useState()
  const [EarnAmount, setEarnAmount] = useState()
  const [income, setIncome] = useState()
  const [userid, setUserid] = useState(0)

  // const [withdrawal, setWithdrawal] = useState()
  // const [netBalance, setNetBalance] = useState()

  const Incom_per = async () => {
    if (MaxIncome <= 0) {
      setIncome(0);
    }
    else {
      setIncome(((EarnAmount / MaxIncome) * 100).toFixed(0));
    }
  }

  useEffect(() => {
    // setloader(true)
    Incom_per()
    // setloader(false)
  }, [])

  console.log("income=>", income);

  const DashboardAPI = async () => {
    let user = localStorage.getItem('user')
    let ress = JSON.parse(user)
    let uId = ress?.uid
    setUserid(uId)
    try {
      let res = await API.get(`/get_betawallet?id=${uId}`)
      res = res.data.data[0]
      console.log(' res', res)

      setMaxIncome(res.MaxIncome)
      setEarnAmount(res.EarnAmount)
      setregistration_directIncome(res.registration_directIncome)
      setregistration_roi_income(res.registration_roi_income)
      setactivation_roi_income(res.activation_roi_income)
      setactivation_direct_income(res.activation_direct_income)
      setactivation_binary_income(res.activation_binary_income)
      setpool_income(res.pool_income)

      setID(res.totalInvestment)
      setLeftReffTotal(res.left_direct)
      setLeftDownTotal(res.LeftTotalDownline)
      setLeftReff(res.left_direct)
      setLeftReffAct(res.LeftActive)
      setLeftDownAct(res.LeftActiveDownline)
      setRightReffTotal(res.right_direct)
      setRightDownTotal(res.RightTotalDownline)
      setRightReff(res.right_direct)
      setRightReffAct(res.RightActive)
      setRightDownAct(res.RightActiveDownline)
      setInvestment(res.TokenInUSD)
      localStorage.setItem('ID', res.totalincome)
      setTotalIncome(res.totalincome)
      setWithdrawal(res.withdrawal)
      setNetBalance(res.netbal)
      setLeftBuss(res.LeftDownBusiness)
      setRightBuss(res.RightDownBusiness)
      setReferral(res.registration_directIncome)
    } catch (e) {
      console.log('Error While Fatch Dashboard API', e)
    }
  }

  useEffect(() => {
    // setloader(true)
    DashboardAPI()
    // setloader(false)
  }, [])

  // console.log("resdesh", dash);

  const IDHERE = localStorage.getItem('ID')
  let [earning, setearning] = new useState({
    series: [IDHERE],
    options: {
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '60%',
            colors: '#293450',
          },
          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: '#000',
            strokeWidth: '90%',
            opacity: 0.1,
            margin: 5,
          },
          dataLabels: {
            name: {
              offsetY: 0,
              color: '#fff',
              fontSize: '1.5rem',
            },
            value: {
              show: false,
            },
          },
        },
      },
      fill: {
        type: 'solid',
      },
      colors: ['#ffffff'],
      stroke: {
        dashArray: 4,
      },
      labels: [IDHERE],
    },
  })

  const [copySuccess, setCopySuccess] = useState('')
  const textAreaRef = useRef(null)

  function copyToClipboard(e) {
    textAreaRef.current.select()
    document.execCommand('copy')
    e.target.focus()
    // setCopySuccess('Copied !');
  }

  const [copySuccess1, setCopySuccess1] = useState('')
  const textAreaReflink = useRef(null)

  function copyToClipboardlink(e) {
    textAreaReflink.current.select()
    document.execCommand('copy')
    e.target.focus()
    // setCopySuccess('Copied !');
  }

  return (
    <div>
      <Navbar />
      {/* <!----======body section start=====----> */}
      <div className="page-wrapper dashboard_home">
        <div className="page-content">
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-6">
              <div className="row">
                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="card radius-10 ip-dash-1">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div>
                          <h4 className="mb-0">All Income</h4>
                        </div>
                      </div>
                      <div className="mt-1 mb_1">
                        <div className="income_name">
                          <h4>Registration Direct Reward</h4>
                          <h4>$ {registration_directIncome} </h4>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-white" style={{ width: '44%' }}></div>
                        </div>
                      </div>
                      <div className="mt-1 mb_1">
                        <div className="income_name">
                          <h4>Registration Quarterly Reward</h4>
                          <h4>$ {registration_roi_income}</h4>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-white" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div className="mt-1 mb_1">
                        <div className="income_name">
                          <h4>Activation Daily yield</h4>
                          <h4>$ {activation_roi_income} </h4>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-white" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      {/* <div className="mt-1 mb_1">
                     <div className="income_name">
                       <h4>Augmented Reward</h4>
                       <h4>{activation_roi_income} $</h4>
                     </div>
                     <div className="progress">
                       <div className="progress-bar bg-white" style={{ width: '70%' }}></div>
                     </div>
                   </div> */}
                      <div className="mt-1 mb_1">
                        <div className="income_name">
                          <h4>Activation Direct Reward </h4>
                          <h4>$ {activation_direct_income} </h4>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-white" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div className="mt-1 mb_1">
                        <div className="income_name">
                          <h4>Forum Reward</h4>
                          <h4>$ {activation_binary_income}</h4>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-white" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div className="mt-1 mb_1">
                        <div className="income_name">
                          <h4>Auto Pool Reward</h4>
                          <h4>$ {pool_income}</h4>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-white" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="progress-wrapper">
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="card radius-10 ip-dash-1">
                    <div id="">
                      <Total_Earning data={{}} opt={earning}>
                        <div id=""></div>
                      </Total_Earning>
                    </div>
                    {/* </div>
                    </div> */}
                    <div className="card-footer border-0 bg-transparent pb_1 ip-progress">
                      <div className="row align-items-center text-center">
                        <div className="col">
                          <h5 className="mb-0">$ {withdrawal}</h5>
                          <small className="extra-small-font">Total Withdrawal</small>
                        </div>
                        <div className="col border-end">
                          <h5 className="mb-0">$ {netBalance} </h5>
                          <small className="extra-small-font">Net Balance</small>
                        </div>
                      </div>
                    </div>

                    <div className="progress-wrapper ">
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--end row--> */}
            </div>

            <div className="col-12 col-lg-6 col-xl-6">
              <div className="row">

                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="card radius-10 overflow-hidden">
                    <div className="card-body">
                      <h4>My Package</h4>
                      <h4>$ {id}</h4>
                      {/* <!-- <p className="mb-0">Active Participate<span className="float-end">500k</span></p> --> */}
                    </div>
                    <div className="progress-wrapper">
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="card radius-10">
                    <div className="card-body">
                      <h4>Team Business</h4>
                      <div className="Left_Right2 business-ip">
                        <h6>
                          {leftBuss}
                          <br />
                          Left
                        </h6>
                        <h6>
                          {rightBuss}
                          <br />
                          Right
                        </h6>
                      </div>
                      {/* <!-- <div id="bounce-rate"></div> --> */}
                    </div>
                    <div className="progress-wrapper">
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="card radius-10">
                    <div className="card-body">
                      <h4>Team Size</h4>
                      <div className="Left_Right2">
                        <div className="Left_Right">
                          <h6>Total :{leftDownTotal}</h6>
                          <h6>Active :{leftDownAct}</h6>

                          <h6>
                            Left
                            {/* {leftReff} */}
                          </h6>
                        </div>
                        <div className="Left_Right1">
                          <h6>Total :{rightDownTotal}</h6>
                          <h6>Active :{rightDownAct}</h6>
                          <h6>
                            Right
                            {/* {rightReff} */}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="progress-wrapper">
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="card radius-10">
                    <div className="card-body">
                      <h4>My Referral</h4>
                      <div className="Left_Right2">
                        <div className="Left_Right">
                          <h6>Total :{leftReffTotal}</h6>
                          <h6>Active :{leftReffAct}</h6>

                          <h6>
                            Left
                            {/* {leftReff} */}
                          </h6>
                        </div>
                        <div className="Left_Right1">
                          <h6>Total :{rightReffTotal}</h6>
                          <h6>Active :{rightReffAct}</h6>
                          <h6>
                            Right
                            {/* {rightReff} */}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="progress-wrapper">
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>




                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="card radius-10">
                    <div className="card-body">
                      <h4>Affiliate Link Forum A</h4>
                      <div className="copy_btn_set">
                        <div className="wdg-box bxset primary">
                          <input
                            type="text"
                            className="wdg-input-box"
                            id="myInput"
                            readonly=""
                            ref={textAreaReflink}
                            value={`https://www.ulematicx.live/Register_with_Matic?referrallink=${userid}&position=Left`}
                          />
                          <div className="fast-msg-box"></div>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="wdg-actions copy_btn_set2">
                          <button type="button" className="copy_btn_set3" onClick={copyToClipboardlink}>
                            <span style={{ fontSize: '15px' }}>
                              copy
                              {copySuccess1}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="progress-wrapper">
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6 col-xl-6">
                  <div className="card radius-10">
                    <div className="card-body">
                      <h4>Affiliate Link Forum B</h4>
                      <div className="copy_btn_set">
                        <div className="wdg-box bxset primary">
                          <input
                            type="text"
                            className="wdg-input-box"
                            id="myInput"
                            readonly=""
                            ref={textAreaRef}
                            value={`https://www.ulematicx.live/Register_with_Matic?referrallink=${userid}&position=Right`}
                          />
                          <div className="fast-msg-box"></div>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="wdg-actions copy_btn_set2">
                          <button type="button" className="copy_btn_set3" onClick={copyToClipboard}>
                            <span style={{ fontSize: '15px' }}>
                              copy
                              {copySuccess}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="progress-wrapper">
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--end row--> */}
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="col-md-12">
                  <div className="prgs">
                    <img
                      src=""
                      id="dynamicwidth"
                      style={{ marginLeft: (((EarnAmount / MaxIncome) * 100).toFixed(2)) + '%' }}
                    />

                    <div id="myProgress">
                      <div
                        id="myBar"
                        style={{ width: (((EarnAmount / MaxIncome) * 100).toFixed(2)) + '%', backgroundColor: 'green' }}
                      ></div>
                    </div>
                  </div>
                  <div style={{ fontSize: 'medium', color: '#fff' }}>
                    Your total rewards earned {EarnAmount} USD out of {MaxIncome} USD (Your rewards earned{' '}
                    {((EarnAmount / MaxIncome) * 100).toFixed(2)}
                    {/* {income} */}
                    % out of 300% of your investment )
                  </div>

                  <br />
                </div>
              </div>
            </div>

            {/* <!--end row--> */}
          </div>
        </div>
        {/* <!-- <div style="height:4rem"></div> --> */}
        {/* <!----======body section end=====----> */}
        <Footer />
      </div>
    </div >
  )
}

export default Dashboard
