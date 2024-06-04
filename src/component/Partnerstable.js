import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import img1 from "../image/Vector.svg";
import axios from "axios";
import "../page/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
import { useTable } from "@nextui-org/react";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardData } from "./CardData.js";
const PartnersTable = () => {
  // Retrieve data from localStorage

  var UserID = localStorage.getItem("UserID");
  var userIDReal = JSON.parse(UserID);
  const address = useAddress();

  const [tableData, setTableData] = useState("");
  const [main_user_id, setUser_id] = useState("");

  const user = async (profitDetailsApi) => {
    try {
      const response = await axios.get(
       `https://dollerhouse111.onrender.com/user/get-user?wallet_id=${address}`
      );
      setUser_id(response.data.data.user_id);
    } catch (err) {
      //console.log(err);
    }
  };
  const navigate = useNavigate();

  const [levelRewards, setLevelRewards] = useState(null);
  const [houseRewards, setHouseRewards] = useState(null);
  const [houseRewards123, setHouseRewards123] = useState([]);
  const [rewards, setRewards] = useState(1);

  const profitDetailsApi = (id) => {
    const apiUrl =`https://dollerhouse111.onrender.com/reward/get?userId=${id}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLevelRewards(data.data[0].level_reward);
        setTableData(data.data[0].house_reward);
        setHouseRewards(data.data[0].house_reward);

      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
  };
  const profitDetailsApi1112 = async (id) => {
    let response = await fetch(`https://dollerhouse111.onrender.com/team/leval5-membe22/${id}`, {
      method: "GET",
    });

    let data = await response.text();
    setHouseRewards123(JSON.parse(data));
  };

  const [previewID, setPreviewID] = useState("");
  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  const handleSearch = () => {
    if (address) {
      profitDetailsApi(previewID);
      localStorage.setItem("UserID", JSON.stringify(previewID));
    }
  };

  useEffect(() => {
    user();
    profitDetailsApi(userIDReal);
    profitDetailsApi1112(userIDReal);
  }, [address]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayeHouseData = houseRewards?.slice(startIndex, endIndex);
  const displayeLevelData = levelRewards?.slice(startIndex, endIndex);

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

  const handleRedirect = (ID) => {
    localStorage.setItem("UserID", JSON.stringify(ID));
    navigate("/dashboard");
  };

  function removeAndReplaceMiddleCharacters(str) {
    if (typeof str !== "string" || str.length <= 20) {
      return str;
    }
    const before = str.substring(0, 7);
    const after = str.substring(35); // Remove 30 characters and take the rest
    const replacedMiddle = ".".repeat(5); // Replace 30 characters with 5 asterisks
    return before + replacedMiddle + after;
  }

  const copyToClipboard = (invited_member_id) => {
    const textField = document.createElement("textarea");
    textField.innerText = invited_member_id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    toast.success("Address copied to clipboard", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <React.Fragment>
      <Navbar actuvetab={"Stats"} />
      <ToastContainer />
      <div className="content">
        <div className="container">
          <div className="forsgae1_main">
            <div className="Total_revenue">
              <p></p>
              <h5>
                {/* {box50 ? ((50 - 50 * 0.15) / 2) * box50 : "0.00"} USDT */}
              </h5>
              {/* <span><img src={img4} alt='user_icon' className='userd_icon' /></span> */}
            </div>
          </div>
        </div>

        <div className="tabls table_margin_top">
          <div className="flex space-x-2">
            <button
              className={`${rewards === 1 ? "background_change" : ""
                } bg-orange-500 py-1 px-2 filter_button text-white rounded-sm`}
              onClick={() => {
                setRewards(1);
              }}
            >
              H-1
            </button>
            <button
              className={`${rewards === 3 ? "background_change" : ""
                } bg-orange-500 py-1 px-2 filter_button text-white rounded-sm`}
              onClick={() => {
                setRewards(3);
              }}
            >
              H-5
            </button>
            <button
              className={`${rewards === 2 ? "background_change" : ""
                } bg-orange-500 py-1 px-2 filter_button text-white rounded-sm`}
              onClick={() => {
                setRewards(2);
              }}
            >
              H-15
            </button>
          </div>

          {rewards == 1 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Plan Name</th>
                  <th>Wallet Address</th>
                  <th>status</th>
                  <th>Reward</th>
                  <th>User ID</th>
                </tr>
              </thead>
              <tbody>
                {houseRewards?.length > 0 ? (
                  houseRewards
                    .sort((a, b) => new Date(b.Time) - new Date(a.Time)) // Sort by date in descending order
                    .map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>

                            {item.status ? (
                              <img src="/up-arrow.png" style={{ width: "30px" }} />
                            ) : (
                              <img
                                src="/static/media/svg-image-23.aa0930be96db08ffc8e973487f0567fb.svg"
                                alt="wallet"
                                className="wallet_icon_last"
                              />
                            )}
                          </td>
                          <td>
                            {new Date(item.Time).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                            })}
                          </td>
                          <td>{item.plan_name.replace("DH Plan", "Leval")}</td>
                          <td>
                            {removeAndReplaceMiddleCharacters(
                              item.invited_member_id
                            )}{" "}
                            <button
                              className="copy_button_table pdding_remove_copy_button"
                              onClick={() => {
                                copyToClipboard(item.invited_member_id);
                              }}
                            >
                              {" "}
                              <MdContentCopy />
                            </button>
                          </td>
                          <td className="status_row">
                            {item.status ? (
                              item.status !== "missed Reword" ?
                                "Sent to Upline" : "missed"
                            ) : (
                              <p className="recieved_status">Received</p>
                            )}
                          </td>
                          <td>{item.house_reward} USDT</td>
                          <td>
                            <p
                              onClick={() => {
                                handleRedirect(item.user_id);
                              }}
                              className="link_table text-center cursor-pointer link_table2 table_id"
                            >
                              ID{item.user_id}
                            </p>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <h1 className="nodata_h">No data found!</h1>
                )}

              </tbody>
            </table>
          ) : rewards == 2 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Plan Name</th>
                  <th>Wallet Address</th>
                  <th>Reward</th>
                  <th>User ID</th>
                </tr>
              </thead>
              <tbody>
                {levelRewards?.length > 0 ? (
                  levelRewards
                    .sort((a, b) => new Date(b.Time) - new Date(a.Time)) // Sort by date in descending order
                    .map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src="/static/media/svg-image-23.aa0930be96db08ffc8e973487f0567fb.svg"
                              alt="wallet"
                              className="wallet_icon_last"
                            />
                          </td>
                          <td>
                            {new Date(item.Time).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                            })}
                          </td>
                          <td>{item.plan_name.replace("DH Plan", "Leval")}</td>
                          <td>
                            {removeAndReplaceMiddleCharacters(
                              item.invited_member_id
                            )}{" "}
                            <button
                              className="copy_button_table pdding_remove_copy_button"
                              onClick={() => {
                                copyToClipboard(item.invited_member_id);
                              }}
                            >
                              {" "}
                              <MdContentCopy />
                            </button>
                          </td>
                          <td>{item.reward} USDT</td>
                          <td>
                            <p
                              onClick={() => {
                                handleRedirect(item.user_id);
                              }}
                              className="link_table text-center cursor-pointer link_table2 table_id"
                            >
                              ID{item.user_id}
                            </p>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <h1 className="nodata_h">No data found!</h1>
                )}
              </tbody>
            </table>
          ) : (
            ""
          )}
          {rewards == 3 && <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Time</th>
                <th>Plan Name</th>
                <th>Wallet Address</th>
                <th>status</th>
                <th>Reward</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {houseRewards123?.data &&
                houseRewards123?.data?.map((el, i) => {
                  console.log("houseRewards123?.data[i].missedusers", houseRewards123?.data[i]?.missedusers);
                  return houseRewards123?.data[i]?.missedusers?.map((elE, iDEX) => {
                    let a = elE?.depthleval + 1 === 1 ? 0 : elE?.depthleval + 1 === 2 ? CardData[i]["price1"].replace(/\$/g, '') * 10 / 100 : elE?.depthleval + 1 === 3 ? CardData[i]["price1"].replace(/\$/g, '') * 20 / 100 : elE?.depthleval + 1 === 4 ? CardData[i]["price1"].replace(/\$/g, '') * 20 / 100 : CardData[i]["price1"].replace(/\$/g, '') * 50 / 100
                    return (
                      <tr key={iDEX}>
                        <td>
                          <img
                            src="/static/media/svg-image-23.aa0930be96db08ffc8e973487f0567fb.svg"
                            alt="wallet"
                            className="wallet_icon_last"
                          />
                        </td>
                        <td>
                          {new Date(elE?.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })}
                        </td>
                        <td>Leval {i + 1}</td>
                        <td>
                          {removeAndReplaceMiddleCharacters(
                            elE?.refId
                          )}{" "}
                          <button
                            className="copy_button_table pdding_remove_copy_button"
                            onClick={() => {
                              copyToClipboard(elE?.refId);
                            }}
                          >
                            {" "}
                            <MdContentCopy />
                          </button>
                        </td>  <td className="status_row">
                          <p className="recieved_status">{a === 0 ? "send to upline" : "Received"}</p>
                        </td>
                        <td>
                          {elE?.depthleval + 1 === 1 ? 0 : elE?.depthleval + 1 === 2 ? CardData[i]["price1"].replace(/\$/g, '') * 10 / 100 : elE?.depthleval + 1 === 3 ? CardData[i]["price1"].replace(/\$/g, '') * 20 / 100 : elE?.depthleval + 1 === 4 ? CardData[i]["price1"].replace(/\$/g, '') * 20 / 100 : CardData[i]["price1"].replace(/\$/g, '') * 50 / 100}
                        </td>

                        <td>
                          <p
                            onClick={() => {
                              handleRedirect(elE?.uid);
                            }}
                            className="link_table text-center cursor-pointer link_table2 table_id"
                          >
                            ID{elE?.uid}
                          </p>
                        </td>
                      </tr>
                    )
                  })
                })
              }
              {houseRewards123?.data &&
                houseRewards123?.data?.map((el, i) => {
                  return houseRewards123?.data[i]?.missedUser?.map((elE, iDEX) => {
                    return (<tr key={iDEX}>
                      <td>
                        <img
                          src="/static/media/svg-image-23.aa0930be96db08ffc8e973487f0567fb.svg"
                          alt="wallet"
                          className="wallet_icon_last"
                        />
                      </td>
                      <td>
                        {new Date(elE?.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </td>
                      <td>Leval {" "} {i + 1}</td>
                      <td>
                        {removeAndReplaceMiddleCharacters(
                          elE?.refId
                        )}{" "}
                        <button
                          className="copy_button_table pdding_remove_copy_button"
                          onClick={() => {
                            copyToClipboard(elE?.refId);
                          }}
                        >
                          {" "}
                          <MdContentCopy />
                        </button>
                      </td>
                      <td className="status_row">
                        missed
                      </td>
                      <td className="">
                        {Number(iDEX + 1 <= 2 ? CardData[i]["price1"].replace(/\$/g, '') * 0 / 100 : iDEX + 1 <= 6 ? CardData[i]["price1"].replace(/\$/g, '') * 10 / 100 : iDEX + 1 <= 14 ? CardData[i]["price1"].replace(/\$/g, '') * 20 / 100 : iDEX + 1 <= 30 ? CardData[i]["price1"].replace(/\$/g, '') * 20 / 100 : CardData[i]["price1"].replace(/\$/g, '') * 50 / 100)}
                      </td>
                      <td>
                        <p
                          onClick={() => {
                          }}
                          className="link_table text-center cursor-pointer link_table2 table_id"
                        >
                          ID{elE?.uid}
                        </p>
                      </td>
                    </tr>
                    )
                  })
                })
              }
            </tbody>
          </table>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PartnersTable;
