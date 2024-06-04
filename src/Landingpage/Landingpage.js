import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import uset_img from "../image/uset_img.svg";
import info27 from "../image/svg-image-27.svg";
import svg31viewicon from "../image/svg-image-31.svg";
import bluecircle from "../image/blue-blur.webp";
import icon1 from "../image/icon3.svg";
import logo from "../image/line.svg";
import banner1 from '../image/dh-banner11.svg';
import banner2 from '../image/dh-banner2.svg';
import welcome_benner_card from "../image/1969222.svg"
import svg_wallet_img from "../image/svg-image-23.svg"
import imgsvg24 from "../image/svg-image-24.svg"
import axios from "axios";
import poket_img from "../image/line.svg";
import plashtfiny from "../image/gold-blur.png";
import { useLogin } from "@thirdweb-dev/react";
import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; import { useParams } from 'react-router-dom';

import Registration from "../component/Registration";
const Landingpage = () => {
  const registrationRef = useRef(null); // Reference to the Registration component
  const wallet_address = useAddress()
  const [showButton, setShowButton] = useState(true);
  const [data, setdata] = useState({});
  let { id } = useParams();
  const [userID, setuserID] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const walletElement = document.querySelector(".tw-connect-wallet");
    if (walletElement) {
      // If .tw-connect-wallet is present, hide the button
      setShowButton(false);
    } localStorage.clear();
  }, [showButton]);
  useEffect(() => {
    getdat()
  }, []);
  const getdat = async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let bodyContent = new FormData();

    let response = await axios.get("https://https://dollerhouse111.onrender.com/profit/alltotal-profit", {
      method: "GET",
      body: bodyContent,
      headers: headersList
    });

    let data = await response
    setdata(data);
  }
  console.log("datadatadatadatadata", data);
  const [previewID, setPreviewID] = useState("");
  const [profileData, setprofileData] = useState({});
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    localStorage.setItem("UserID", event.target.value);
  };
  const { contract } = useContract(
    "0xefbC742bce081ed4323eaD401af7C6304a91D286"
  );


  const handleSearch = () => {
    navigate("/dashboard");
  };

  const { data: Parent, isLoading: isParentLoading } = useContractRead(
    contract,
    "Parent",
    [wallet_address]
  );

  const [UserID, SetUserId] = useState("")
  const GetUserId = async (wallet_address) => {
    try {
      const response = await axios.get(
       `https://dollerhouse111.onrender.com/user/get-user?wallet_id=${wallet_address}`
      );
      console.log(response?.data?.data?.user_id)
      setuserID(response?.data?.data?.user_id);
      setprofileData(response.data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (wallet_address === undefined) {
      setuserID(null);
      setprofileData({});
    } else {
      GetUserId(wallet_address)
    }
  }, [wallet_address])


  const handleSearchDashboard = async () => {
    navigate("/dashboard");
  }
  const scrollToRegistration = () => {
    registrationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function removeAndReplaceMiddleCharacters(str) {
    if (typeof str !== "string" || str.length <= 30) {
      return str;
    }
    const before = str.substring(0, 7);
    const after = str.substring(35); // Remove 30 characters and take the rest
    const replacedMiddle = ".".repeat(5); // Replace 30 characters with 5 asterisks
    return before + replacedMiddle + after;
  }

  const modifiedAddress = removeAndReplaceMiddleCharacters("0x85bd9e2907d4d2cc80f3852e1a123bea8f4d226d");

  const handleCopyReferralLink2 = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = `0x85bd9e2907d4d2cc80f3852e1a123bea8f4d226d`;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    console.log("Copied");
    // Use react-toastify to display a toaster notification
    toast.success("text copied to clipboard!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const saveId = () => {
    localStorage.setItem("UserID", userID);
  }

  return (
    <div id="scrollToTopBtn" className="landingpage_main">
      <ToastContainer />
      <div className="container">
        <div className="main_top_logo">
          <div className="logos_landing">
            <span>
              <img src={logo} alt="logos" className="logolanding" />
            </span>
          </div>

          <div className="smart_chains">
            <div className="smart_chain_1">
              <spna>
                <img
                  src={icon1}
                  alt="smart_chain"
                  className="smart_chain_icon"
                />
              </spna>
              <p>Smart Chain</p>
            </div>

            {/* <div className="connect_btn mobile-connect-button"> */}
            {/* <button> <Link to="/dashboard">Dashboard </Link></button> */}

            {/* </div> */}
          </div>
        </div>
        <div
          className="register_in"
          style={{
            backgroundImage: `url(${plashtfiny})`,
            backgroundSize: "cover",
            justifyContent: 'space-around'
          }}
        >
          <div className="register_right" style={{
            transform: "scaleX(-1)"
          }}>
            <img src={poket_img} alt="pocket_img" className="poket_img" />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {userID === null || userID === undefined ? <div className="register_left w-100">
              <h1 className="text-center"> Welcome to Dollar House </h1>
              <br />
              <div className="join_bth d-block m-auto mt-4">
                <ConnectWallet className="d-block m-auto" />
                <br />
                <button onClick={scrollToRegistration} className="wath_tut d-block m-auto">
                  Join Doller House
                </button>
              </div>
            </div> :
              <div className="register_left w-100">
                <div className="id_user right_text d-block m-auto w-100 ">
                  <div className="d-flex align-items-end mt-4 " >
                    <div className=" ">
                      <img
                        className="user_logo ml-0"
                        src={profileData?.data?.picture || uset_img}
                        alt="uset_img"
                        minwidth={130}
                      />
                      {profileData?.data?.profile !== null ? (
                        <h1>
                          {profileData?.data?.profile.username}
                        </h1>
                      ) : (
                        <h1>User Name</h1>
                      )}
                      {/* <h4 className="text-light m-0">User Name</h4> */}
                    </div>
                    <div className="cursor-pointer profile_user_id table_id" >
                      ID {userID}
                    </div>
                  </div>
                </div>
                <p>
                  {wallet_address} is a member of  dollerhouse
                </p>
                <div className="join_bth">
                  <ConnectWallet className="my-2" />
                  <button className="my-2">
                    <Link onClick={saveId} to="/dashboard" className="wath_tut">
                      Return to you account
                    </Link>
                  </button>
                </div>
              </div>
            }
          </div>
          <div className="register_right">
            <img src={poket_img} alt="pocket_img" className="poket_img" />
          </div>
        </div>
        <div ref={registrationRef}>
          <Registration id={id} />
        </div>
        <div className="doller_house_owl_crousel">
          <div className="container">
            <div id="demo" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={banner1} alt="welcome_benner_card" className="welcome_benner_card" />

                  <img src={banner2} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card2" />

                  <img src={welcome_benner_card} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card3" />
                </div>
                <div class="carousel-item">
                  <img src={banner2} alt="welcome_benner_card" className="welcome_benner_card" />

                  <img src={banner1} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card2" />

                  <img src={welcome_benner_card} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card3" />
                </div>
                <div class="carousel-item">
                  <img src={welcome_benner_card} alt="welcome_benner_card" className="welcome_benner_card" />

                  <img src={banner2} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card2" />

                  <img src={banner1} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Account_preview">
          <div className="account_title">
            <h1>Account preview</h1>
            <p>
              Look up any Dollar House member account in preview mode. Enter ID to
              preview or click Demo to view a random account.
            </p>
          </div>

          <div className="wallwte_input">
            <div className="wall_left w-100">
              <p>Enter User ID</p>

              <div className="previw_input_btn ">
                <input
                  type="number"
                  onChange={handleChange}
                  className="account_input"
                  val=""
                />
                <a href="#scrollToTopBtn">
                  {" "}
                  <button onClick={handleSearch}>Preview</button>
                </a>
              </div>
            </div>
            {/* <div className="wall_right">
              <p>Don’t know any ID?</p>
              <button><Link to="/dashboard">Check demo</Link></button>
            </div> */}
          </div>
        </div>

        <div className='recent activity'>
          <div className='container'>
            <div className='forsage_title'>
              <h2>Recent Activity</h2>
              <span className='forsage_info2 px-1'>
                <img src={info27} alt='Info' className='Info27' />
              </span>
            </div>

            <div className='platfroms'>
              <div className='row'>
                <div className='col-lg-12'>
                  {/* <div className='menber_totla_title'> */}
                  {/* <h3>Members total <span className='forsage_info2'>  </span> </h3> */}

                  {/* <h4>{data?.data?.totaluser || 0}</h4>
                    <p><span className='toparrow'><i className="fa fa-long-arrow-up" aria-hidden="true"></i></span>{data?.data?.totaluserLast24h || 0}</p> */}
                  {/* </div> */}
                  <div className='link_section_all'>
                    <h3>Doller House Contracts</h3>

                    <div className='link_contracts'>
                      <span className="text-light" >{modifiedAddress}
                        <span onClick={handleCopyReferralLink2} className='files'><i className="fa fa-files-o" aria-hidden="true"></i></span>
                        <a href="https://mumbai.polygonscan.com/address/0x85bd9e2907d4d2cc80f3852e1a123bea8f4d226d" className='linkIcon'><i className="fa fa-link" aria-hidden="true"></i></a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="need_help_section">
          <h1>Need help with using the platform?</h1>
          <p>Get qualified support from Dollar House experts via online chat</p>
          <Link to="https://t.me/dollerhouse"> <button className="contact_suppo">Contact support</button> </Link>

          {/* <img src={bluecircle} alt="bluecircle" className="bluecircle" /> */}
        </div>

        {/* <div className="copy_right">
          <div className="copy_left">
            <p>© 2023 All Rights Reserved</p>
            <p>Documents</p>
          </div>

          <div className="social_media">
            <i className="fa fa-telegram" aria-hidden="true"></i>
            <i className="fa fa-youtube-play" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </div>
        </div> */}

        <div className="footer">
          <h4>Dollarhouse.All Rights Reserved.2024</h4>
          <div className="social_icon">
            <p><i class="fa fa-instagram" aria-hidden="true"></i></p>
            <p> <Link to="https://t.me/dollerhouse"><i class="fa fa-telegram" aria-hidden="true"></i></Link></p>
            <p><i class="fa fa-twitter" aria-hidden="true"></i></p>
          </div>

          <div className="copy_right_containt">
            <p>
              Trading cryptocurrencies carries a high level of risk, and may not be suitable for all investors. Before deciding to trade cryptocurrency, you should carefully consider
              your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore
              you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with cryptocurrency trading, and seek advice from an
              independent financial advisor. Any opinions, news, research, analyses, prices, or other information contained on this website is provided as general market commentary,
              and does not constitute investment advice. The CUNetwork will not accept liability for any loss or damage, including without limitation to, any loss of profit, which may
              arise directly or indirectly from use of or reliance on such information. All opinions expressed on this site are owned by the respective writer and should never be considered
              as advice in any form. The CUNetwork makes no representation or warranties as to the accuracy and or timelines of the information contained herein. A qualified
              professional should be consulted before making any financial decisions.</p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Landingpage;
