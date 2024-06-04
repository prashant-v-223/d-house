import React, { useEffect, useState } from "react";
import img6 from "../image/svg-image-6.svg";
import img8 from "../image/svg-image-8.svg";
import img4 from "../image/svg-image-4.svg";
import tiffanysedo from "../image/blue-blur.png";
import Navbar from "../component/Navbar";
import img1 from "../image/line.svg";
import PriviewId from "../component/PriviewId";
import "./style.css";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import UsdtIcon from "../image/tether-usdt-seeklogo1.svg";
import privewupicon from "../image/privew_up_icon.svg"
import svg_wallet_img from "../image/svg-image-23.svg"

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

    const apiUrl = `https://usdtbackend.mjccoin.io/v1/filtering?address=${wallet_address}&amount=100`;
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


  useEffect(() => {
    fetchData2();
  }, [])



  // Retrieve data from localStorage


  const { contract } = useContract(
    "0xefbC742bce081ed4323eaD401af7C6304a91D286"
  );
  const { contract: USDTContract } = useContract(
    "0x0ECBBF0D46E13cC4fffdf14AbC39D8332c89Ad8b"
  );

  const numberOfElements = 10; // Change this to the desired number of elements
  const { data: getThePlansCount, isLoading: isPlanCountLoading } =
    useContractRead(contract, "getThePlanCount", [wallet_address, ethers.utils.parseEther("100")]);

  const result100 = getThePlansCount;

  const box100 = Number(result100 && result100?._hex);


  const blueElements100 = Array.from({ length: box100 }).map((_, index) => (
    <h3
      key={index}
      className={
        index < box100 ? "forsage_detail_box" : "forsage_blue other_box"
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
            <div className='forsage_title2'>
              <div className="preview_card_pogram_title">
                <h3> <span>Dollar house1</span> Plan</h3>
                <p>You can view the details of your House 1 Plan </p>
              </div>
            </div>

            {/* <div
              className="forsgae_level_card"
            >
              <div className="level_title">
                <h4></h4>
                <h1>$100 Plan</h1>
                <h4></h4>
              </div>
              <Boxs box={box100} tableData={tableData} />

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
                      {Number(result100)}
                    </h5>
                  </div>
                </div>

                <div className="Total_revenue">
                  <p>Total Direct revenue</p>
                  <h5>
                    0.00 
                  </h5>
                </div>
              </div>
            </div> */}

            <div className="house_plane_card_forsage2">
              <div className="privew_card_sub">
                <div className="slot_title_and_price">
                  <div className="slot_price">
                    <h4>House 1 plan</h4>
                  </div>
                  <div className="slot_price_carf_t">
                    <h4>15.00 </h4>
                    <p><img src={UsdtIcon} className="usdt_icon_slot" alt="icon_usdt" /></p>
                  </div>
                </div>
                <div className="slot_all_price_and_priviews">
                  <div className="all_slot">
                    <h5>5$</h5>
                  </div>
                  <div className="slot_privew_btn">
                    <Link to="/Preview50">Preview <span><img src={privewupicon} alt="upicons_privew" className="upicons_privew" /></span></Link>
                  </div>
                </div>
              </div>
              <div className="privew_card_sub">
                <div className="slot_title_and_price">
                  <div className="slot_price">
                    <h4>House 1 plan</h4>
                  </div>
                  <div className="slot_price_carf_t">
                    <h4>500.00 </h4>
                    <p><img src={UsdtIcon} className="usdt_icon_slot" alt="icon_usdt" /></p>
                  </div>
                </div>
                <div className="slot_all_price_and_priviews">
                  <div className="all_slot">
                    <h5>5$</h5>
                  </div>
                  <div className="slot_privew_btn">
                    <Link to="/Preview1000">Preview <span><img src={privewupicon} alt="upicons_privew" className="upicons_privew" /></span></Link>
                  </div>
                </div>
              </div>
              <div className="privew_card_sub">
                <div className="slot_title_and_price">
                  <div className="slot_price">
                    <h4>House 1 plan</h4>
                  </div>
                  <div className="slot_price_carf_t">
                    <h4>80.00 </h4>
                    <p><img src={UsdtIcon} className="usdt_icon_slot" alt="icon_usdt" /></p>
                  </div>
                </div>
                <div className="slot_all_price_and_priviews">
                  <div className="all_slot">
                    <h5>10$</h5>
                  </div>
                  <div className="slot_privew_btn">
                    <Link to="/Preview1000">Preview <span><img src={privewupicon} alt="upicons_privew" className="upicons_privew" /></span></Link>
                  </div>
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

          <div className="footer">
            <h4>Dollarhouse.All Rights Reserved.2024</h4>
            <div className="social_icon">
              <p><i class="fa fa-instagram" aria-hidden="true"></i></p>
              <p><i class="fa fa-telegram" aria-hidden="true"></i></p>
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
      </div>
    </React.Fragment>
  );
};

export default Forsage1;
