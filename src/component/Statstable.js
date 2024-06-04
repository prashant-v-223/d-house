import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import img1 from "../image/Vector.svg";
import axios from "axios";
import "../page/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { useAddress } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Statstable = () => {
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
        setTableData(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
  };

  const handleRedirect = (ID) => {
    localStorage.setItem("UserID", JSON.stringify(ID));
    navigate("/dashboard");
  };

  const [previewID, setPreviewID] = useState("");
  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  const handleSearch = () => {
    profitDetailsApi(previewID);
    localStorage.setItem("UserID", JSON.stringify(previewID));
  };

  useEffect(() => {
    user();
    profitDetailsApi(userIDReal);
  }, [address]);

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

  function removeAndReplaceMiddleCharacters(str) {
    if (typeof str !== "string" || str.length <= 30) {
      return str;
    }
    const before = str.substring(0, 7);
    const after = str.substring(35); // Remove 30 characters and take the rest
    const replacedMiddle = ".".repeat(7); // Replace 30 characters with 5 asterisks
    return before + replacedMiddle + after;
  }
  const copyToClipboard = (invited_member_id) => {
    const textField = document.createElement("textarea");
    textField.innerText = invited_member_id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    console.log("Copied");
    toast.success("Address copied to clipboard", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <React.Fragment>
      <Navbar actuvetab={"Partners"} />
      <ToastContainer />
      <div className="content">
        <div className="tabls table_margin_top">
          <table className="table">
            <thead>
              <tr>
                <th>#Sr No.</th>
                <th>Wallet Address</th>
                <th>User ID</th>
                <th className="text-center">20$ slot</th>
                <th className="text-center">40$ slot</th>
                <th className="text-center">100$ slot</th>
                <th className="text-center">200$ slot</th>
                <th className="text-center">500$ slot</th>
                <th className="text-center">1000$ slot</th>
                <th className="text-center">2000$ slot</th>
                <th className="text-center">4000$ slot</th>
                <th className="text-center">direct joiner</th>
                <th className="text-center">time</th>
              </tr>
            </thead>
            <tbody>
              {displayedtableData.length > 0 ? (
                displayedtableData
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {index + 1}
                        </td>
                        <td>
                          {removeAndReplaceMiddleCharacters(
                            item.refferal.wallet_id
                          )}
                          <button
                            className="copy_button_table"
                            onClick={() => {
                              copyToClipboard(item.refferal.wallet_id);
                            }}
                          >
                            {" "}
                            <MdContentCopy />
                          </button>
                        </td>

                        <td>
                          <p
                            onClick={() => {
                              handleRedirect(item.user_id);
                            }}
                            className="link_table text-center  link_table2 table_id"
                          >
                            ID{item.refferal?.user_id}
                          </p>
                        </td>
                        <td>
                          {(item.refferal.result.length !== 0).toString() === "true" ? <div className="bg-success " style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div> : <div className="bg-danger" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div>}
                        </td>
                        <td>
                          {(item.refferal.result1.length !== 0).toString() === "true" ? <div className="bg-success" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div> : <div className="bg-danger" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div>}
                        </td>
                        <td>
                          {(item.refferal.result2.length !== 0).toString() === "true" ? <div className="bg-success" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div> : <div className="bg-danger" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div>}
                        </td>
                        <td>
                          {(item.refferal.result3.length !== 0).toString() === "true" ? <div className="bg-success" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div> : <div className="bg-danger" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div>}
                        </td>
                        <td>

                          {(item.refferal.result4.length !== 0).toString() === "true" ? <div className="bg-success" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div> : <div className="bg-danger" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div>}
                        </td>
                        <td>

                          {(item.refferal.result5.length !== 0).toString() === "true" ? <div className="bg-success" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div> : <div className="bg-danger" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div>}
                        </td>
                        <td>
                          {(item.refferal.result6.length !== 0).toString() === "true" ? <div className="bg-success" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div> : <div className="bg-danger" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div>}
                        </td>
                        <td>
                          {(item.refferal.result7.length !== 0).toString() === "true" ? <div className="bg-success" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div> : <div className="bg-danger" style={{
                            width: 35, height: 35, borderRadius: "50%"
                          }}></div>}
                        </td>
                        <td>
                          {item.refferal?.user1.refferal1Size}
                        </td>
                        <td className="text-center">
                          {new Date(item.refferal?.user1?.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <h1 className="nodata_h">No data found!</h1>
              )}
            </tbody>
          </table>
          {tableData.length > 10 && (
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
      {/* </div> */}
    </React.Fragment>
  );
};

export default Statstable;
