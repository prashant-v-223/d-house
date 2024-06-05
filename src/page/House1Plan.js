import React, { useEffect, useState } from "react";
import img6 from "../image/svg-image-6.svg";
import img8 from "../image/svg-image-8.svg";
import img4 from "../image/svg-image-4.svg";
import tiffanysedo from "../image/blue-blur.png";
import Navbar from "../component/Navbar";
import img1 from "../image/line.svg";
import { FaRegCopy } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

import PriviewId from "../component/PriviewId";
import UsdtIcon from "../image/tether-usdt-seeklogo1.svg";
import "./style.css";
import svg_wallet_img from "../image/svg-image-23.svg";
import { ethers } from "ethers";
import criclesimg from "../image/cycles.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LiaRecycleSolid } from "react-icons/lia";

import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import Boxs from "./Boxs";

const House1Plan = () => {
  var storedData = localStorage.getItem("userData");
  var userDataReal = JSON.parse(storedData);
  const wallet_address = userDataReal?.data?.wallet_address;
  const navigate = useNavigate();
  const [tableData, setTableData] = useState("");

  const [previewID, setPreviewID] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  // Retrieve data from localStorage

  const { contract } = useContract(
    "0x2740D7d3ac78fA4DAD6c67cA6e02cbFb9104E2C9"
  );
  const { contract: USDTContract } = useContract(
    "0x0ECBBF0D46E13cC4fffdf14AbC39D8332c89Ad8b"
  );

  const numberOfElements = 10; // Change this to the desired number of elements
  const { data: getThePlansCount, isLoading: isPlanCountLoading } =
    useContractRead(contract, "getThePlanCount", [
      wallet_address,
      ethers.utils.parseEther("50"),
    ]);

  const result50 = getThePlansCount;
  const box50 = Number(result50 && result50?._hex);
  const blueElements50 = Array.from({ length: box50 }).map((_, index) => (
    <h3
      key={index}
      className={
        index < box50 ? "forsage_detail_box" : "forsage_blue other_box"
      }
    >
      {index < tableData.length ? tableData[index].user_id : null}{" "}
      {/* Assuming TableData contains the data you want to display */}
    </h3>
  ));
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedtableData = tableData?.slice(startIndex, endIndex);
  const [activeTab, setActiveTab] = useState(1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // You can adjust this number based on your preference

    if (10 <= maxPagesToShow) {
      // If there are fewer pages than the max to show, display all pages
      for (let i = 1; i <= 10; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }
    } else {
      // Display ellipsis and a range of pages around the current page
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(10, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pageNumbers.push(<span key="startEllipsis">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }

      if (endPage < 10) {
        pageNumbers.push(<span key="endEllipsis">...</span>);
        // Display the last two digits
        pageNumbers.push(
          <span
            key={10}
            onClick={() => handlePageChange(10)}
            className={currentPage === 10 ? "active" : ""}
          >
            {10}
          </span>
        );
      }
    }

    return pageNumbers;
  };

  const [data, setData] = useState("");
  const Cycles = data?.length / 4;

  var UserIDReal = localStorage.getItem("UserID");
  var UserID = JSON.parse(UserIDReal);

  const urlParams = new URLSearchParams(window.location.search);
  const planPrice = urlParams.get("plan_price");
  let planName;
  let planName1;
  let planName2;
  if (planPrice == "20") {
    planName = "DH Plan 1";
    planName1 = "level 1";
    planName2 = 5
  } else if (planPrice == "40") {
    planName = "DH Plan 2";
    planName1 = "level 2";
    planName2 = 10
  } else if (planPrice == "100") {
    planName = "DH Plan 3";
    planName1 = "level 3";
    planName2 = 30
  } else if (planPrice == "200") {
    planName = "DH Plan 4";
    planName2 = 60
    planName1 = "level 4";
  } else if (planPrice == "500") {
    planName = "DH Plan 5";
    planName1 = "level 5";
    planName2 = 120
  } else if (planPrice == "1000") {
    planName = "DH Plan 6";
    planName1 = "level 6";
    planName2 = 250
  } else if (planPrice == "2000") {
    planName = "DH Plan 7";
    planName1 = "level 7";
    planName2 = 500
  } else if (planPrice == "4000") {
    planName = "DH Plan 8";
    planName1 = "level 8";
    planName2 = 1000
  }


  const profitDetailsApi = (UserID) => {
    const apiUrl =`https://doller-production.up.railway.app/reward/get?userId=${UserID}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(
          data.data[0].house_reward?.filter((obj) => obj.plan_name == planName)
        );
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
  };

  useEffect(() => {
    profitDetailsApi(UserID);
    GetPlanDetail(UserID);
  }, []);

  const GetPlanDetail = async (UserID) => {
    try {
      const response = await fetch(
       `https://doller-production.up.railway.app/plan/get-plan?userid=${UserID}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataNew = await response.json();
      const apiUrl1 =`https://doller-production.up.railway.app/user/get-user?wallet_id=${dataNew.data.refferal}`;
      fetch(apiUrl1)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("user_id", data.data.user_id);
          localStorage.setItem(
            "UPlineUserID",
            JSON.stringify(data.data.user_id)
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  function calculateTotalHouseRewards(data) {
    let total = 0;
    for (let i = 0; i < data?.length; i++) {
      if (data[i].status !== "missed" && data[i].status !== "missed Reword") {
        total += data[i].house_reward;
      }
    }
    return total;
  }

  const totalHouseRewards = calculateTotalHouseRewards(data);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (invited_member_id) => {
    const textField = document.createElement("textarea");
    textField.innerText = invited_member_id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setCopied(true);
    toast.success("Address copied to clipboard", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleNewIdData = (user_id) => {
    if (user_id !== undefined) {
      localStorage.setItem("UserID", JSON.stringify(user_id));
      window.location.reload();
    }
  };

  const [currentPageCircle, setCurrentPageCircle] = useState(0);
  const itemsPerPageCircle = 4;

  const handleNext = () => {
    const nextPageCircle = currentPageCircle + 1;
    if (nextPageCircle < Math.ceil(data?.length / itemsPerPageCircle)) {
      setCurrentPageCircle(nextPageCircle);
    }
  };

  const handlePrevious = () => {
    const prevPageCircle = currentPageCircle - 1;
    if (prevPageCircle >= 0) {
      setCurrentPageCircle(prevPageCircle);
    }
  };

  const startIndexCircle = currentPageCircle * itemsPerPageCircle;
  const endIndexCircle = Math.min(
    startIndexCircle + itemsPerPageCircle,
    data?.length
  );
  const maindata = data?.slice(startIndexCircle, endIndexCircle);

  return (
    <React.Fragment>
      <div className="container">
        <ToastContainer />
      </div>
      <Navbar />
      
      <div
        className="fixed top-0 right-0 w-full h-full z-0"
        style={{
          backgroundImage: `url("https://busd.forsage.io/blurs/levels/green-blur.png")`,
          backgroundRepeat: "round",
          backgroundSize: 'cover',
          position: "fixed",
          right: "0",
          top: "0",
          width: "100%",
          height: "100%",
      }
        }
      ></div>
      <div className="content">
        <div className="container">
          <div className="forsgae1_main">
            <div className="forsage_title2">
              <div className="preview_card_pogram_title">
                <h3>
                  {" "}
                  <span>Dollar house 1 </span> Plan
                </h3>
                <p>You can view the details of your House 1 Plan </p>
              </div>
            </div>

            <div
              onClick={() => {
                handleNewIdData(localStorage.getItem("UPlineUserID"));
              }}
              className="d-flex w-100 justify-content-center cursor-pointer"
            >
              <div className="forsgae_level_card m-auto d-block d-flex w-100 justify-content-center">
                <h4> Upline Id {localStorage.getItem("UPlineUserID")}</h4>
              </div>
            </div>
            <div className="forsage_prive_center_btn">
              <div className="previews_btn_forsage">
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                  Previous
                </button>
              </div>
              <div className="center_contant_forsage">
                <div className="forsgae_level_card">
                  <div className="level_title mx-3">
                    <h5>{planName1}</h5>
                    <h5 className="text-center">
                      ID {localStorage.getItem("UserID")}
                    </h5>
                    <h5>
                      {planName2}<span className="px-2">USDT</span>
                    </h5>
                  </div>
                  {/* <Boxs box={box50} tableData={tableData} /> */}
                  <div className="circle_priveiw">
                    {Array.from({ length: 4 }).map((_, index) => {
                      const item = maindata && maindata[index]; // Ignore data at index 0
                      if (item && item.status) {
                        return (
                          <h4
                            className={`${item.status
                              ? item.status === "missed"
                                ? "background_cyan"
                                : "background_cyan1"
                              : ""
                              } cursor-pointer bg-[#743b07]`}
                          >
                            {item.user_id}
                            {item.status === "missed" && (
                              <FaArrowUp className="up_arrow" />
                            )}
                            {item.status === "missed Reword" && (
                              <FaArrowUp
                                className="up_arrow"
                                style={{
                                  color: "red",
                                }}
                              />
                            )}
                            {/* {<FaArrowUp className="up_arrow" />} */}
                          </h4>
                        );
                      } else {
                        return (
                          <h4
                            className={`${index === 3 ? "background_cyan" : ""
                              } cursor-pointer bg-[#743b07] `}
                            onClick={() => handleNewIdData(item?.user_id)}
                            key={index}
                          >
                            {item ? item.user_id : ""}
                            {index === 3 && <FaArrowUp className="up_arrow" />}
                          </h4>
                        );
                      }
                    })}
                  </div>

                  <div className="cycle_name px-md-5">
                    <div className="cycle_name_left">
                      <div className="partners">
                        <p>Partners</p>
                        <h5>
                          <span>
                            <img
                              src={img6}
                              alt="user_icon"
                              className="userd_icon"
                            />
                          </span>
                          {localStorage.getItem("total") ? localStorage.getItem("total") : 0}
                        </h5>
                      </div>

                      <div className="partners">
                        <p>Cycles</p>
                        <h5>
                          <span>
                            <img
                              src={criclesimg}
                              alt="user_icon"
                              className="userd_icon"
                            />
                          </span>
                          {Math.floor(Cycles)}
                        </h5>
                      </div>
                    </div>

                    <div className="Total_revenue">
                      <p>Total revenue</p>
                      <h1>
                        {totalHouseRewards}.00{" "}
                        <span className="ml-2">USDT</span>
                      </h1>
                      {/* <span><img src={img4} alt='user_icon' className='userd_icon' /></span> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="previews_btn_forsage">
                <button onClick={handleNext}>Next</button>
              </div>
            </div>
            <div className="tabls">
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Plan Name</th>
                    <th>User Id</th>
                    <th className="text-center">House Reward</th>
                    <th>Status</th>
                    <th className="text-center">Invited Member ID</th>
                    <th className="text-center">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data
                      .slice() // create a shallow copy of the array to avoid mutating the original
                      .sort((a, b) => new Date(b.Time) - new Date(a.Time)) // Sort by date in descending order
                      .map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item.status ? (
                              item.status !== "missed" ? (
                                <FaArrowUp
                                  className="ml-1"
                                  style={{
                                    color:
                                      item.status !== "missed"
                                        ? "red"
                                        : "green",
                                    fontSize: "28px",
                                  }}
                                />
                              ) : (
                                <LiaRecycleSolid
                                  className=""
                                  style={{
                                    color:
                                      item.status !== "missed"
                                        ? "red"
                                        : "green",
                                    fontSize: "36px",
                                    fontWeight: 600,
                                  }}
                                />
                              )
                            ) : (
                              <img
                                src={svg_wallet_img}
                                alt="wallet"
                                className="wallet_icon_last "
                              />
                            )}
                          </td>
                          <td>{planName1}</td>
                          <td>
                            <span className="table_id">ID{item.user_id}</span>
                          </td>
                          <td className="text-center">{item.house_reward}</td>
                          <td className="status_row">
                            {item.status ? (
                              item.status == "missed" ? (
                                <p className="text-success">Recycle</p>
                              ) : (
                                <p className="text-danger">missed</p>
                              )
                            ) : (
                              <p className="recieved_status">Received</p>
                            )}
                          </td>
                          <td className="text-center">
                            {item.invited_member_id.slice(0, 4)}...{" "}
                            {item.invited_member_id.slice(-4)}
                            <button
                              className="border-0 text-white bg-transparent"
                              onClick={() => {
                                copyToClipboard(item.invited_member_id);
                              }}
                            >
                              <FaRegCopy />
                            </button>
                          </td>
                          <td className="text-center">
                            {new Date(item.Time).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              {tableData?.length > 10 && (
                <div className="flex pagination_postion justify-end ">
                  <div className="pagination-container flex space-between space-x-5">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    <div className="page-numbers  flex space-x-2">
                      {renderPageNumbers()}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === 10}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          {/* <div className="copy_right">
            <p>© 2023 All Rights Reserved</p>
            <p>Documents</p>
          </div> */}

          <div className="footer">
            <h4>Dollarhouse.All Rights Reserved.2024</h4>
            <div className="social_icon">
              <p>
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </p>
              <p>
                <i class="fa fa-telegram" aria-hidden="true"></i>
              </p>
              <p>
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </p>
            </div>

            <div className="copy_right_containt">
              <p>
                Trading cryptocurrencies carries a high level of risk, and may
                not be suitable for all investors. Before deciding to trade
                cryptocurrency, you should carefully consider your investment
                objectives, level of experience, and risk appetite. The
                possibility exists that you could sustain a loss of some or all
                of your initial investment and therefore you should not invest
                money that you cannot afford to lose. You should be aware of all
                the risks associated with cryptocurrency trading, and seek
                advice from an independent financial advisor. Any opinions,
                news, research, analyses, prices, or other information contained
                on this website is provided as general market commentary, and
                does not constitute investment advice. The CUNetwork will not
                accept liability for any loss or damage, including without
                limitation to, any loss of profit, which may arise directly or
                indirectly from use of or reliance on such information. All
                opinions expressed on this site are owned by the respective
                writer and should never be considered as advice in any form. The
                CUNetwork makes no representation or warranties as to the
                accuracy and or timelines of the information contained herein. A
                qualified professional should be consulted before making any
                financial decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default House1Plan;
