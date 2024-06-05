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
import { Link, renderMatches } from "react-router-dom";
import UsdtIcon from "../image/tether-usdt-seeklogo1.svg";
import privewupicon from "../image/privew_up_icon.svg";
import svg_wallet_img from "../image/svg-image-23.svg";
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

const SlotDetail = () => {
  const [pathname, setPathname] = useState(window.location.pathname);


  const [previewID, setPreviewID] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://usdtbackend.mjccoin.io/v1/alldetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: previewID }),
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  
  // Retrieve data from localStorage

  const { contract } = useContract(
    "0x2740D7d3ac78fA4DAD6c67cA6e02cbFb9104E2C9"
  );
  const { contract: USDTContract } = useContract(
    "0x0ECBBF0D46E13cC4fffdf14AbC39D8332c89Ad8b"
  );

 
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
 
  function generatePriceList(pathname) {
    const priceList = {
      first: "5$",
      slotName: "Slot 10$",
      second: "5$",
      third: "10$",
    };

    if (pathname === "/slot-20") {
      return {
        first: "5$",
        second: "5$",
        slotName: "Slot 20$",
        third: "10$",
        mainPrice: "20"
      };
    }

    if (pathname === "/slot-40") {
      return {
        first: "10$",
        second: "10$",
        slotName: "Slot 40$",
        third: "20$",
        mainPrice: "40"
      };
    }

    if (pathname === "/slot-100") {
      return {
        first: "30$",
        second: "30$",
        slotName: "Slot 100$",
        third: "40$",
        mainPrice: "100"
      };
    }
    if (pathname === "/slot-200") {
      return {
        first: "60$",
        second: "60$",
        slotName: "Slot 200$",
        third: "80$",
        mainPrice: "200"
      };
    }

    if (pathname === "/slot-500") {
      return {
        first: "120$",
        second: "120$",
        slotName: "Slot 500$",
        third: "260$",
        mainPrice: "500"
      };
    }

    if (pathname === "/slot-1000") {
      return {
        first: "250$",
        second: "250$",
        slotName: "Slot 1000$",
        third: "500$",
        mainPrice: "1000"
      };
    }
    if (pathname === "/slot-2000") {
      return {
        first: "500$",
        second: "500$",
        slotName: "Slot 2000$",
        third: "1000$",
        mainPrice: "2000"
      };
    }

    if (pathname === "/slot-4000") {
      return {
        first: "1000$",
        second: "1000$",
        slotName: "Slot 4000$",
        third: "2000$",
        mainPrice: "4000"
      };
    }
    return priceList;
  }

 
  const updatedPriceList = generatePriceList(pathname);


  return (
    <React.Fragment>
      <Navbar />
      <div className="content">
        <div className="container">
          <div className="forsgae1_main">
            <div className="forsage_title2">
              <div className="preview_card_pogram_title">
                <h3>
                  {" "}
                  <span>{updatedPriceList.slotName}</span>
                </h3>
                <p>You can view the details of your House 1 Plan </p>
              </div>
            </div>
            <div className="house_plane_card_forsage2">
              <div className="privew_card_sub ">
                <div className="slot_title_and_price">
                  <div className="slot_price">
                    <h4>House 1 plan</h4>
                  </div>
                  <div className="slot_price_carf_t">
                  </div>
                </div>
                <div className="slot_all_price_and_priviews">
                  <div className="all_slot">
                    <h5>{updatedPriceList.first}</h5>
                  </div>
                  <div className="slot_privew_btn">
                    <Link to={`/house-1-plan?plan_price=${updatedPriceList.mainPrice}`}>
                      Preview{" "}
                      <span>
                        <img
                          src={privewupicon}
                          alt="upicons_privew"
                          className="upicons_privew"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="privew_card_sub mx-md-4">
                <div className="slot_title_and_price">
                  <div className="slot_price">
                    <h4>House 5 plan</h4>
                  </div>
                  <div className="slot_price_carf_t">
                  
                  </div>
                </div>
                <div className="slot_all_price_and_priviews">
                  <div className="all_slot">
                  <h5>{updatedPriceList.second}</h5>
                  </div>
                  <div className="slot_privew_btn">
                    <Link to={`/house-5-plan?plan_price=${updatedPriceList.mainPrice}`}>
                      Preview{" "}
                      <span>
                        <img
                          src={privewupicon}
                          alt="upicons_privew"
                          className="upicons_privew"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="privew_card_sub">
                <div className="slot_title_and_price">
                  <div className="slot_price">
                    <h4>House 15 plan</h4>
                  </div>
                  <div className="slot_price_carf_t">
                  
                  </div>
                </div>
                <div className="slot_all_price_and_priviews">
                  <div className="all_slot">
                  <h5>{updatedPriceList.third}</h5>
                  </div>
                  <div className="slot_privew_btn">
                    <Link to={`/house-15-plan?plan_price=${updatedPriceList.mainPrice}`}>
                      Preview{" "}
                      <span>
                        <img
                          src={privewupicon}
                          alt="upicons_privew"
                          className="upicons_privew"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

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

export default SlotDetail;
