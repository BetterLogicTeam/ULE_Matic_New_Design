import React, { useState } from 'react'
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';
import { HashLink } from 'react-router-hash-link';
// import "./Login_main.css"
import "./Index_main.css"
import { Link, link } from "react-router-dom"
import { useEffect, useRef } from "react";
import logo from "../Assets/logo.png"
import AOS from 'aos';
import 'aos/dist/aos.css';

function Index_main() {

   const [modalShow, isModalShow] = useState("fqa1")
   const [isColor, setIscolor] = useState("Home")

   useEffect(() => {
      AOS.init({
         duration: 2000,

         once: false,
         mirror: false
      })
   })
   return (
      <div className="">
         <div className="wrapper-one" >
            {/* <div className="btn-mobile-menu">
          <div className="hamburger">
             <span className="line"></span>
             <span className="line"></span>
             <span className="line"></span>
          </div>
       </div> */}
            <div className="logo-composition">
               <div className="circle-1"></div>

               <div className="circle-2"></div>
               <div className="circle-3"></div>
               <div className="circle-4"></div>
               <div className="scale"></div>
               <div className="scale-2"></div>
               <div className="global"></div>

            </div>
            <header className="header-main" >
               <div className="header-main-top" >
                  <div className="user-link-wrap" >
                     <ul className="user-link-list" >
                        <li className="user-link-item animated fadeInRight loginbutton" >
                           <Link to="/Login_main"> <a href="login.html" className="btn btn-transparent">Login</a></Link>
                        </li>
                        <div className="dropdown" >
                           <a className=" dropdown-toggle btn btn-gradient" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" > Register </a>

                           <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                              <li >
                                 <Link to="/Registration_with_BNB">

                                    <a className="dropdown-item" href="#"> <img src="BNB.png" alt="" width="25%" /> BNB </a>
                                 </Link>
                              </li>
                              <li >
                                 <Link to="/Register_with_Matic">

                                    <a className="dropdown-item" href="#">
                                       <img src="polygon.png" alt="" width="30%" />
                                       MATIC
                                    </a>
                                 </Link>
                              </li>

                           </ul>
                        </div>

                     </ul>
                  </div>
                  <div className="logo-wrap" >
                     <a href="indexbc14.html?a=home" className="logo" >
                        <img src={logo} className="img-fluid" alt="" width="162px" />
                     </a>
                  </div>
               </div>
               <div className="header-aside" >
                  <ul className="lang-flag-list" >

                     <li>
                     </li>
                  </ul>
                  <div className="page-navigation-wrap" >
                     <div className="count-page-wrap" >
                        <div className="count-page" >
                           <span className="num-page" >1</span>
                           <span className="total-page" >7</span>
                        </div>
                     </div>

                     <ul className="page-navigation nav-page" >
                        <li className="page-navigation__item" >
                           <a href="#screen-1" className="page-navigation__link"></a>
                        </li>
                        <li className="page-navigation__item" data-menuanchor="screen-2">
                           <a href="#screen-2" className="page-navigation__link"></a>
                        </li>
                        <li className="page-navigation__item" data-menuanchor="screen-3">
                           <a href="#screen-3" className="page-navigation__link"></a>
                        </li>
                        <li className="page-navigation__item" data-menuanchor="screen-4">
                           <a href="#screen-4" className="page-navigation__link"></a>
                        </li>
                        <li className="page-navigation__item" data-menuanchor="screen-5">
                           <a href="#screen-5" className="page-navigation__link"></a>
                        </li>
                        <li className="page-navigation__item" data-menuanchor="screen-6">
                           <a href="#screen-6" className="page-navigation__link"></a>
                        </li>
                        <li className="page-navigation__item" data-menuanchor="screen-7">
                           <a href="#screen-7" className="page-navigation__link"></a>
                        </li>
                     </ul>
                  </div>

                  <div className="scroll-down-label">
                     <div className="scroll-down"><i className="arrow-icon"></i>Scroll</div>
                  </div>
               </div>
               <nav className="main-menu-nav" >
                  <ul className="main-menu nav-page">
                     <li id="Home" className={isColor === "Home" ? "main-menu__item animated fadeInUp active" : "main-menu__item animated fadeInUp"} data-menuanchor="screen-1" onClick={() => setIscolor("Home")}>
                        <a href="#screen-1" className="main-menu__link">
                           <span className="main-menu__icon menu--icon1"></span>
                           <span className="main-menu__label">Home</span>
                        </a>
                     </li>
                     <li data-menuanchor="screen-2" id="About Us" onClick={() => setIscolor("About Us")} className={isColor === "About Us" ? "main-menu__item animated fadeInUp active" : "main-menu__item animated fadeInUp"}>
                        <a href="#screen-2" className="main-menu__link">
                           <span className="main-menu__icon menu--icon2"></span>
                           <span className="main-menu__label">About Us</span>
                        </a>
                     </li>
                     <li data-menuanchor="screen-3" id="Why Choose Us" onClick={() => setIscolor("Why Choose Us")} className={isColor === "Why Choose Us" ? "main-menu__item animated fadeInUp active" : "main-menu__item animated fadeInUp"}>
                        <a href="#screen-3" className="main-menu__link">
                           <span className="main-menu__icon menu--icon3"></span>
                           <span className="main-menu__label">Why Choose Us</span>
                        </a>

                     </li>
                     <li data-menuanchor="screen-4" id="How To Start" onClick={() => setIscolor("How To Start")} className={isColor === "How To Start" ? "main-menu__item animated fadeInUp active" : "main-menu__item animated fadeInUp"}>
                        <a href="#screen-4" className="main-menu__link">
                           <span className="main-menu__icon menu--icon4"></span>
                           <span className="main-menu__label">How To Start</span>
                        </a>
                     </li>
                     <li data-menuanchor="screen-5" id="Faq" onClick={() => setIscolor("Faq")} className={isColor === "Faq" ? "main-menu__item animated fadeInUp active" : "main-menu__item animated fadeInUp"}>
                        <a href="#screen-5" className="main-menu__link">
                           <span className="main-menu__icon menu--icon5"></span>
                           <span className="main-menu__label">Faq</span>
                        </a>
                     </li>
                     <li data-menuanchor="screen-6" id="Support" onClick={() => setIscolor("Support")} className={isColor === "Support" ? "main-menu__item animated fadeInUp active" : "main-menu__item animated fadeInUp"}>
                        <a href="#screen-6" className="main-menu__link">
                           <span className="main-menu__icon menu--icon7"></span>
                           <span className="main-menu__label">Support</span>
                        </a>
                     </li>
                  </ul>
               </nav>
            </header>
            <main id="fullpage" className="wrap-content fullpage-wrapper  scroll-height"  >
               <section className=" section-1 " id="screen-1" style={{ paddingTop: '0px' }} >
                  <div className="section-bg-text" >ULE MATICX</div>
                  <div className="container">
                     {/* <div className=""> */}
                     <div className="offer-main" >
                        <div className="title-main-wrap " >
                           <h1 className="title-main ms-md-5"
                           ><span >ULE Is A Multi-Chain Decentralised MEME Token That Aims To Fill Your Life With Fun Everyday! PLATFORM</span></h1>
                           <p className="vertical-text" > ONLY</p>
                        </div>
                        <div className="subtitle-main" >
                           <div className="text-decor align--right" >
                              <div className="el-text el-text-1" ></div>
                              <div className="el-text el-text-2" ></div>
                           </div>
                           <p className="text-p" >ULE Tokens are pegged to WYZ coins and are compatible with the dependable ecosystems of TRC 20, BNB, Polygon, Solana, and WRC 20 chains. Become a part of our community and enjoy UleTube, UleLive, Ulecks, Ulefy, and many other applications that can fill your everyday life with unlimited fun.

                           </p>
                        </div>
                        <div className="section-button" >
                           <a href="indexcca3.html?a=signup" className="btn btn-green" >Get Started</a>
                        </div>
                     </div>
                     {/* </div> */}
                  </div>

               </section>
               <div className="statistic-list-wrap " >
                  <div className="container" >
                     <div className='row' >
                        <div className='col-lg-10' >

                           <ul className="statistic-list mt-3 mt-5" >
                              <li className="statistic-list-unit  " >
                                 <div className="statistic-box " >
                                    <div className="statistic-box__value " >

                                       <i className="fa fa-calendar-check-o statistic-box__icon" aria-hidden="true" ></i>
                                       <span style={{ fontSize: '19px' }}>2114</span>
                                       <span > days </span>
                                    </div>
                                    <div className="statistic-box__title">Project Working</div>
                                 </div>
                              </li>
                              <li className="statistic-list-unit">
                                 <div className="statistic-box">
                                    <div className="statistic-box__value">

                                       <i className="fa fa-user-plus statistic-box__icon" aria-hidden="true"></i>                                 925193
                                    </div>
                                    <div className="statistic-box__title">Total accounts</div>
                                 </div>
                              </li>
                              <li className="statistic-list-unit">
                                 <div className="statistic-box">
                                    <div className="statistic-box__value">

                                       <i className="fa fa-database statistic-box__icon" aria-hidden="true"></i>
                                       <span
                                          className="symbol-current">$</span>
                                       9540
                                    </div>
                                    <div className="statistic-box__title">Total Deposits</div>
                                 </div>
                              </li>
                              <div className="statistic-list-unit">
                                 <div className="statistic-box">
                                    <div className="statistic-box__value">

                                       <i className="fa fa-pie-chart statistic-box__icon" aria-hidden="true"></i>
                                       <span
                                          className="symbol-current">$</span>
                                       1005
                                    </div>
                                    <div className="statistic-box__title">Total Withdraws</div>
                                 </div>
                              </div>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
               <section className=" section-2 " data-anchor="screen-2" id="screen-2" >
                  <div className="container" >
                     <div className="section-content" >
                        <div className="section-title-wrap" >
                           <div className="text-decor align--left left--light" >
                              <div className="el-text el-text-2" ></div>
                              <div className="el-text el-text-1" ></div>
                           </div>
                           <h2 className="section-title" >Help your introduced community members reach new level of crypto earnings experience with ULE.

                           </h2>
                        </div>
                        <div className="about-block" >
                           <div className="section-subtitle" >AFFILIATE PROGRAM
                           </div>

                           <div className="section-button" >
                              <a href="#" className="btn btn-green d-flex justify-content-center align-items-center" >Get Started</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
               <section className=" section-3" data-anchor="screen-3" id="screen-3"  >
                  <div className="container" >
                     <div className="section-content" >
                        <div className="plans-content-main" >
                           <div className="plan-list-wrap " >
                              <div className="plans-list" >
                                 <div className="plans-list-item" >
                                    <div className="plan-card4" >
                                       <div className="el-card-top" ><span ></span></div>
                                       <div className="square square-top" ></div>
                                       <div className="square square-bottom" ></div>
                                       <div className="plan-card-top" >
                                          <i className="fa fa-cogs icon_fa" aria-hidden="true" ></i>
                                          <h4 className="heading" ><b>Stable Passive Income</b></h4>
                                          <p >Once you find a new member, you get a 15 % direct affiliate commission alongwith 7 types of other benefits during all time of his duration of every activated membership.</p>

                                       </div>

                                    </div>
                                 </div>
                                 <div className="plans-list-item" >
                                    <div className="plan-card1" >
                                       <div className="el-card-top" ><span></span></div>
                                       <div className="square square-top" ></div>
                                       <div className="square square-bottom" ></div>
                                       <div className="plan-card-top" >
                                          <i className="fa fa-database icon_fa" aria-hidden="true" ></i>
                                          <h4 className="heading" ><b>Daily Yeild</b></h4>
                                          <p >From the defi eco-system member joined will get daily yeild of 0.3% for regular 1000 days without any hussel.</p>

                                       </div>


                                    </div>
                                 </div>
                                 <div className="plans-list-item" >
                                    <div className="plan-card" >
                                       <div className="el-card-top" ><span></span></div>
                                       <div className="square square-top" ></div>
                                       <div className="square square-bottom" ></div>
                                       <div className="plan-card-top" >
                                          <i className="fa fa-shield icon_fa" aria-hidden="true" ></i>
                                          <h4 className="heading" ><b>Support Approach</b></h4>
                                          <p >From the defi eco-system member joined will get daily yeild of 0.3% for regular 1000 days without any hussel.</p>

                                       </div>

                                    </div>
                                 </div>

                                 <div className="plans-list-item">
                                    <div className="plan-card2">
                                       <div className="el-card-top"><span></span></div>
                                       <div className="square square-top"></div>
                                       <div className="square square-bottom"></div>
                                       <div className="plan-card-top">
                                          <i className="fa fa-briefcase icon_fa" aria-hidden="true"></i>
                                          <h4 className="heading"><b>Reliable Community</b></h4>
                                          <p>Your introduced community members will get the best crypto eco-system with use cases based on defi, e-commerce, gaming, trading, music & so on.</p>

                                       </div>

                                    </div>
                                 </div>

                                 <div className="plans-list-item">
                                    <div className="plan-card2">
                                       <div className="el-card-top"><span></span></div>
                                       <div className="square square-top"></div>
                                       <div className="square square-bottom"></div>
                                       <div className="plan-card-top">
                                          <i className="fa fa-laptop icon_fa" aria-hidden="true"></i>
                                          <h4 className="heading"><b>ULE Sunrise</b></h4>
                                          <p>The Uprising - ULE Tokens ULE Tokens are pegged to the price of WYZth coin on WRC-20 "WY Chain" . 5,000 CRORE tokens have been created and pegged to the multi-chain WY blockchain .</p>

                                       </div>

                                    </div>
                                 </div>

                                 <div className="plans-list-item">
                                    <div className="plan-card2">
                                       <div className="el-card-top"><span></span></div>
                                       <div className="square square-top"></div>
                                       <div className="square square-bottom"></div>
                                       <div className="plan-card-top">
                                          <i className="fa fa-pie-chart icon_fa" aria-hidden="true"></i>
                                          <h4 className="heading"><b>ULE Sunset</b></h4>
                                          <p>The Edge - Adopt the power of WY-Defi to the next level. Details will be revealed after 33 months on how to sun-set this token, tokenomics and incentives with pegged WYZ coins.</p>

                                       </div>

                                    </div>
                                 </div>



                              </div>
                           </div>
                           <div className="form-calc-wrap">
                              <div className="section-title-wrap">
                                 <div className="text-decor align--left left--light">
                                    <div className="el-text el-text-2"></div>
                                    <div className="el-text el-text-1"></div>
                                 </div>
                                 <h2 className="section-title">Why Choose Us</h2>
                              </div>


                           </div>
                           {/* <!-- <img src="assets/img/what_token.png" width="100%"> --> */}

                        </div>
                     </div>
                  </div>
               </section>
               <section className=" section-4" data-anchor="screen-4" id="screen-4" >
                  <div className="container" >
                     <div className="section-content paddin"  >
                        <div className="section-title-wrap  d-flex aligin-items-center" >
                           <div className="text-decor align--left left--light" >
                              <div className="el-text el-text-2" ></div>
                              <div className="el-text el-text-1" ></div>
                           </div>
                           <h2 className="section-title  pt-2" >How To Start</h2>
                           <br />
                           <br />
                        </div>
                        <div className="referrals-block" >
                           <div className="row" >

                              <div className="plans-list-item" >
                                 <div className="plan-card4" >
                                    <div className="el-card-top" ><span></span></div>
                                    <div className="square square-top" ></div>
                                    <div className="square square-bottom" ></div>
                                    <div className="plan-card-top " >
                                       <i className="fa fa-life-ring icon_fa" aria-hidden="true" ></i>
                                       <p className="heading" >FIND A MEMBER FOR GROWING ULE COMMUNITY.</p>

                                    </div>

                                 </div>
                              </div>
                              <div className="plans-list-item" >
                                 <div className="plan-card1" >
                                    <div className="el-card-top" ><span></span></div>
                                    <div className="square square-top" ></div>
                                    <div className="square square-bottom" ></div>
                                    <div className="plan-card-top" >
                                       <i className="fa fa-users icon_fa" aria-hidden="true" ></i>

                                       <p className="heading" >YOUR MEMBER ACTIVATE A CONTRACT ON DEFI WITH ULE ECO-SYSTEM.</p>

                                    </div>


                                 </div>
                              </div>
                              <div className="plans-list-item"  >
                                 <div className="plan-card" >
                                    <div className="el-card-top" ><span></span></div>
                                    <div className="square square-top" ></div>
                                    <div className="square square-bottom" ></div>
                                    <div className="plan-card-top" >
                                       <i className="fa fa-tachometer icon_fa" aria-hidden="true" ></i>
                                       <p className="heading" >YOU RECEIVE A COMMISSION UNDER COMMUNITY GROWTH MEMBERSHIP.</p>

                                    </div>

                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
               <section className=" section-5" data-anchor="screen-5" id="screen-5" >
                  <div className="container">
                     <div className="section-content">
                        <div className="section-title-wrap">
                           <div className="text-decor align--left left--light">
                              <div className="el-text el-text-2"></div>
                              <div className="el-text el-text-1"></div>
                           </div>
                           <h2 className="section-title">
                              FREQUENTLY ASKED QUESTIONS
                           </h2>
                        </div>
                        <div className="tabs faq-tabs">
                           <ul className="tabs__caption faq-tabs-nav">
                              <li className={modalShow == "fqa1" ? "active tabs-nav-item" : "tabs-nav-item"} onClick={() => isModalShow("fqa1")}>GENERAL QUESTIONS
                              </li>
                              <li className={modalShow == "fqa2" ? "active tabs-nav-item" : "tabs-nav-item"} onClick={() => isModalShow("fqa2")}>INVESTMENT QUESTIONS</li>
                           </ul>
                           {
                              modalShow == "fqa2" ? (
                                 <div className="tabs__content faq-tabs-content plan-list-wrap" id="fqa2">
                                    <div className="el-top-right"></div>
                                    <span className="el-top-1"></span>
                                    <span className="el-top-2"></span>
                                    <ul className="accordion accordion-faq">
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4>What does the future look like for ULE Tokens?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>ULE Token developers have envisioned a wholesome future for the ULE Tokens. While there are already a number of applications for ULEs, their uses are only set to grow in the near future. The ULE community will have its own NFT marketplace and metaverse. The ULEverse will allow ULEians to buy/sell digital properties, take part in digital get-togethers and enjoy various real-life activities in the digital world. Being based on the WYZ blockchain, ULEs will also support web3 applications and dApps.
                                             </p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4>Is it safe to invest in ULE Tokens?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>WYzth and its shareholders allocate capital in reserves which are reviewed on a quarterly basis. This liquidity cushion is above and beyond the total market capitalization of ULE tokens to provide further stability to the ULE ecosystem and assurance to our users. Moreover, since ULE Tokens are based on the blockchain technology, all of your transactions are recorded and immutable.
                                             </p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4>What is Sunset in regards to ULE Tokens?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>The Sunset in ULE Tokens refers to the saturation of the ULEian community. As realistic as anyone can be, everything has a life. What starts, has to end. Though that is the law of nature, it is not necessarily a bad thing for ULEians. When the sun sets on the ULEian community, all of your ULE Tokens will be exchanged for WYZ coins of the equivalent value.
                                             </p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4>What is the ULEfluencer fund?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>The ULEfluencer fund is a specialised dedicated fund that aims to support upcoming and aspiring influencers. All the donations received by the ULEfluencer fund are used to provide the right tools and donations to the aspiring influencers who need it the most.
                                             </p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4>If there a risk of money loss?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>The risk always is, as in any other business sphere. Our specialists constantly analyze currency rate changes in order to provide the maximal profits and minimize the risks.
                                             </p>
                                          </div>
                                       </li>
                                    </ul>
                                    <span className="el-bottom"></span>
                                 </div>
                              ) : (
                                 <div className="tabs__content faq-tabs-content active plan-list-wrap" id='fqa1'>
                                    <div className="el-top-right"></div>
                                    <span className="el-top-1"></span>
                                    <span className="el-top-2"></span>
                                    <ul className="accordion accordion-faq">
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4> Is ULE a token or a cryptocurrency?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>ULE is a digital token that is based on the WYZ cryptocurrency. The major difference between a token and a crypto currency is that while tokens have a limited supply at any given time, crypto currencies can be minted and have an infinite supply depending on their core programming.
                                             </p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4> How many ULEs are there in the market currently?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>Currently, there are 5,000 Crore ULEs in circulation today. More can be pegged depending on the demand and supply of the ULE Tokens.
                                             </p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4>What determines the price of ULE Tokens?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>ULE Tokens can be used to make online purchases from well-known brands, stream music, podcasts, movies, tv shows, and much more. Since ULE Tokens support multiple blockchains, you can use ULEs to hedge your position or earn quick profits through arbitraging.
                                             </p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4>What crypto coins can be used to get ULE Tokens?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>You can buy ULE Tokens using TRC-20, BnB, Polygon, Solana and WRC-20 coins. Do keep in the mind that different swapping platforms support different crypto currencies. Hence, you need to check if the swapping platform you wish to use supports the crypto currency you wish to swap for ULE Tokens.
                                             </p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="square square-top"></div>
                                          <div className="square square-bottom"></div>
                                          <div className="accordion-title">
                                             <span className="accordion-title-arrow"></span>
                                             <h4>Can you help me with the different swap platforms I can use to get ULE Tokens?
                                             </h4>
                                          </div>
                                          <div className="question-block">
                                             <p>You can use the following swap platforms to change your TRC-20, BnB, Polygon, Solana and WRC-20 coins to ULE Tokens: SunSwap, PancakeSwap, WyzthSwap, QuickSwap, and RaydiumSwap.
                                             </p>
                                          </div>
                                       </li>
                                    </ul>
                                    <span className="el-bottom"></span>
                                 </div>
                              )
                           }
                           {/* */}
                           {/* */}

                        </div>
                     </div>
                  </div>
               </section>
               <section className=" section-7" data-anchor="screen-6" id="screen-6" >
                  <div className="container">
                     <div className="section-content">
                        <div className="section-title-wrap">
                           <div className="text-decor align--left left--light">
                              <div className="el-text el-text-2"></div>
                              <div className="el-text el-text-1"></div>
                           </div>
                           <h2 className="section-title">Support</h2>
                        </div>
                        <div className="support-content">
                           <div className="row">
                              <div className="col-lg-7 order-lg-2 ">
                                 <ul>
                                    <li className="contacts-support-item">
                                       <div className="contacts-support-item__inner">
                                          <i className="contacts-support-item__icon email--icon"></i>
                                          <div className="contacts-support-item__title"><span>E-mail</span></div>
                                          <div className="contacts-support-item__value"><a href="cdn-cgi/l/email-protection.html#cdbeb8bdbda2bfb98da6a2bdaea8b9ace3aea2a0"><span className="__cf_email__">info@maticx.live</span></a>
                                          </div>
                                       </div>
                                    </li>
                                 </ul>
                                 <div className="payment-logo-list">
                                    <ul>
                                       <li><a href="https://www.facebook.com/ULE-Community-113662044683677"><i className="fa fa-facebook-square" aria-hidden="true"></i> Facebook</a></li>
                                       <li><a href="https://t.me/ulecommunity"><i className="fa fa-telegram" aria-hidden="true"></i> Telegram</a></li>
                                       <li><a href="https://www.instagram.com/ule.community/"><i className="fa fa-instagram" aria-hidden="true"></i> Instagram</a>
                                       </li>
                                       <li><a href="https://twitter.com/UleCommunity"><i className="fa fa-twitter-square" aria-hidden="true"></i> Twitter</a></li>

                                    </ul>
                                 </div>
                              </div>
                              <div className="col-lg-5 ">

                                 <form

                                    className="form-contacts"
                                    method="post">
                                    <input type="hidden" name="form_id" value="16650718292466" /><input type="hidden" name="form_token" value="ae0b261e312c4e567f6a862c687b8a9b" />
                                    <input type="hidden" name="a" value="support" />
                                    <input type="hidden" name="action" value="send" />
                                    <label className="form-contacts__label label-form">
                                       <input type="text" className="form-contacts__input input-form js-focus" name="name" value=""
                                          placeholder="Your name" />
                                    </label>
                                    <label className="form-contacts__label label-form">
                                       <input type="email" className="form-contacts__input input-form js-focus" placeholder="E-mail" name="email" value=""
                                       />
                                    </label>
                                    <div className="form-contacts__label label-form">
                                       <textarea className="form-contacts__textarea input-form js-focus" name="message"
                                          placeholder="Message"></textarea>
                                    </div>
                                    <div className="form-contacts__button">
                                       <button type="submit" className="btn btn-green">Send</button>
                                    </div>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </main>
         </div>

      </div>
   )
}

export default Index_main