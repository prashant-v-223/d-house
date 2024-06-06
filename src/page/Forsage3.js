import React, { useEffect, useState } from "react";
import img6 from "../image/svg-image-6.svg";
import img8 from "../image/svg-image-8.svg";
import img4 from "../image/svg-image-4.svg";
import tiffanysedo from "../image/blue-blur.png";
import Navbar from "../component/Navbar";
import img1 from "../image/line.svg";
import svg_wallet_img from "../image/svg-image-23.svg"

import PriviewId from "../component/PriviewId";
import "./style.css";
import { ethers } from "ethers";

import { Link } from "react-router-dom";
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

const Forsage1 = () => {


  var storedData = localStorage.getItem('userData');
  var userDataReal = JSON.parse(storedData);
  const wallet_address = userDataReal?.data?.wallet_address;

  
  const [tableData, setTableData] = useState("");
  const fetchData2 = () => {
    
    const apiUrl = `https://usdtbackend.mjccoin.io/v1/filtering?address=${wallet_address}&amount=200`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data.data);
         
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  

  const [previewID, setPreviewID] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://usdtbackend.mjccoin.io/v1/alldetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: previewID }),
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSearch = () => {
    // fetchData();
    fetchData2();
  };

  
useEffect(()=>{
  fetchData2();
}, [])
 
  
   
  // Retrieve data from localStorage


  const { contract } = useContract(
    "0x0F1b1F82eEE342Fd18bC05792ec1F66D7a86CF8A"
  );
  const { contract: USDTContract } = useContract(
    "0xb8105200336560A6E0f3E3EA3A7515AbB341E3e46"
  );

  const numberOfElements = 10; // Change this to the desired number of elements
  const { data: getThePlansCount, isLoading: isPlanCountLoading } =
  useContractRead(contract, "getThePlanCount", [wallet_address, ethers.utils.parseEther("200")]);

  const result200 = getThePlansCount;
  
  const box200 = Number(result200 && result200?._hex);

  const blueElements200 = Array.from({ length: box200 }).map((_, index) => (
    <h3
      key={index}
      className={
        index < box200 ? "forsage_detail_box" : "forsage_blue other_box"
      }
    >
      {index < tableData.length ? tableData[index].user_id : null} {/* Assuming TableData contains the data you want to display */}
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

  return (
    <React.Fragment>
      <div className="container">
        <div className="pre_Id">
          <div className="pri_id_img">
            <img src={img1} alt="logo" className="logoimg_priview" />
            <p>Preview ID</p>
            <div className="input_btn desktop_search_field">
              <input
                value={previewID}
                type="number"
                onChange={handleChange}
                className="input_NUmber"
              />
              <button type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          {/* <div className="connect_btn">
            <ConnectWallet />
          </div> */}
        </div>
      </div>
      <Navbar />
      <div className="content">
        <div className="container">
          <div className="forsgae1_main">
            {/* <div className='forsage_title2'>
            <h1>MJC</h1>
            <h3>174 209.8 BUSD</h3>
          </div> */}

            <div
              className="forsgae_level_card"
              // style={{
              //   backgroundImage: `url(${tiffanysedo})`,
              //   backgroundSize: "cover",
              // }}
            >
              {/* <div className='bg_imes_forsgae'>
              <img src={tiffanysedo} alt='blue_color' className='greenBg2' />
            </div> */}
              <div className="level_title">
                <h4></h4>
                <h1>$200 Plan</h1>
                <h4></h4>
              </div>
              <Boxs box= {box200} tableData={tableData}/>

              <div className="cycle_name">
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
                      {Number(result200)}
                    </h5>
                  </div>
                </div>

                <div className="Total_revenue">
                  <p>Total Direct revenue</p>
                  <h5>
                   0.00 {/* {box200 ? ((200 - 200 * 0.15) / 2) * box200 : "0.00"} USDT */}
                  </h5>
                  {/* <span><img src={img4} alt='user_icon' className='userd_icon' /></span> */}
                </div>
              </div>
            </div>
            <div className="tabls">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Type</th>
                <th >Id</th>
                <th >House program</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img></td>
                <td>1</td>
                <td> <span className="table_id">ID 16541527</span></td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
                <td>1000</td>
                <td>25-10-2024</td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
              </tr>

              <tr>
                <td><img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img></td>
                <td>1</td>
                <td> <span className="table_id">ID 16541527</span></td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
                <td>1000</td>
                <td>25-10-2024</td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
              </tr>

              <tr>
                <td><img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img></td>
                <td>1</td>
                <td> <span className="table_id">ID 16541527</span></td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
                <td>1000</td>
                <td>25-10-2024</td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
              </tr>

              <tr>
                <td><img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img></td>
                <td>1</td>
                <td> <span className="table_id">ID 16541527</span></td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
                <td>1000</td>
                <td>25-10-2024</td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
              </tr>

              <tr>
                <td><img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img></td>
                <td>1</td>
                <td> <span className="table_id">ID 16541527</span></td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
                <td>1000</td>
                <td>25-10-2024</td>
                <td><span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></td>
              </tr>
            </tbody>
          </table>
          {tableData.length > 10 &&
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
          }
        </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forsage1;
