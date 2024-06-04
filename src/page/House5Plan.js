import React, { useEffect, useMemo, useState } from "react";
import img6 from "../image/svg-image-6.svg";
import Navbar from "../component/Navbar";
import { FaRegCopy } from "react-icons/fa";
import svg_wallet_img from "../image/svg-image-23.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { ethers } from "ethers";
import criclesimg from "../image/cycles.svg";
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
import axios from "axios";

const House5Plan = () => {
  const wallet_address_real = useAddress();
  const [wallet_address, setWalletAddress] = useState(wallet_address_real);
  console.log(wallet_address);

  const urlParams = new URLSearchParams(window.location.search);
  const planPrice = urlParams.get('plan_price');
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
  // const wallet_address = userDataReal?.data?.wallet_address;

  const [tableData, setTableData] = useState("");
  const [color, setColor] = useState("");
  const [previewID, setPreviewID] = useState("");

  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  const { contract } = useContract(
    "0xefbC742bce081ed4323eaD401af7C6304a91D286"
  );
  const { contract: USDTContract } = useContract(
    "0x0ECBBF0D46E13cC4fffdf14AbC39D8332c89Ad8b"
  );

  const { data: getThePlansCount, isLoading: isPlanCountLoading } =
    useContractRead(contract, "getThePlanCount", [
      wallet_address,
      ethers.utils.parseEther("1000"),
    ]);

  const result1000 = getThePlansCount;
  const box1000 = Number(result1000 && result1000?._hex);
  const blueElements1000 = Array.from({ length: box1000 }).map((_, index) => (
    <h3
      key={index}
      className={
        index < box1000 ? "forsage_detail_box" : "forsage_blue other_box"
      }
    >
      {index < tableData.length ? tableData[index].user_id : null}{" "}
      {/* Assuming TableData contains the data you want to display */}
    </h3>
  ));

  const userDataReal = localStorage.getItem("UserID");
  var UserID = JSON.parse(userDataReal);

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
  const [count, setCount] = useState(0);
  const [missedincome, setmissedincome] = useState(0);
  const [house5Plan, setHouse5Plan] = useState([]);
  const [house5Plan1, setHouse5Plan1] = useState([]);
  const [house5Plan2, setHouse5Plan2] = useState([]);
  const [user_id, setUser_id1] = useState(0);

  const user1 = async (w) => {
    try {
      const response = await axios.get(
        `https://dollerhouse111.onrender.com/user/get-user?wallet_id=${UserID}`
      );

      setUser_id1(response.data.data.user_id);

    } catch (err) {
      //console.log(err);
    }
  };
  const fetchUserData = async (UserID, leval) => {
    try {
      const response = await fetch(
        `https://dollerhouse111.onrender.com/team/leval5-member/${UserID}/${leval}/${planPrice}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // setHouse5Plan(data?.data);
      setmissedincome(data?.missedincometotal || 0)
      console.log("data?.datadata?.datadata?.data", data?.data1[0].missedusers);
      setHouse5Plan(data?.data ? data?.data : []);
      setHouse5Plan2(data?.data1.referBY ? data?.data1.referBY : []);
      setHouse5Plan1(data?.data1 ? data?.data1 : []);
      setColor(data?.color);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const memoizedHouse5Plan = useMemo(() => {
    // Your logic to calculate the value of house5Plan goes here
    const sortedArray = house5Plan && [...house5Plan].sort((a, b) => {
      // Assuming house5Plan is an array of objects with a property 'creactetime'
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return sortedArray;
  }, [house5Plan, count]);
  console.log("house5Plan1[0]?.referBY", house5Plan1);
  const [house5PlanSingle, setHouse5PlanSingle] = useState(null);
  useEffect(() => {
    setmissedincome(0)
    setHouse5Plan([]);
    setHouse5Plan2([]);
    setHouse5Plan1([]);
    fetchUserData(UserID, count);
    user1();
  }, [count, UserID]);


  useEffect(() => {
    profitDetailsApi(UserID);
    GetPlanDetail(UserID)
  }, []);
  const profitDetailsApi = (UserID) => {
    const apiUrl = `https://dollerhouse111.onrender.com/reward/get?userId=${UserID}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const apiUrl1 = `https://dollerhouse111.onrender.com/user/get-user?wallet_id=${data.data.refferal}`;
        fetch(apiUrl1)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("user_id", data.data.user_id);
            localStorage.setItem("UPlineUserID", JSON.stringify(data.data.user_id));

          })
          .catch((error) => {
            console.error("Error fetching or processing data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
  };


  const [parentId, setParentId] = useState(null)
  const GetPlanDetail = async (UserID) => {
    try {
      const response = await fetch(
        `https://dollerhouse111.onrender.com/plan/get-plan?userid=${UserID}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataNew = await response.json();
      const apiUrl1 = `https://dollerhouse111.onrender.com/user/get-user?wallet_id=${dataNew.data.refferal}`;
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
          setParentId(data.data.user_id)
        });
    } catch (error) {
      console.error(error);
    }
  };


  const handleNewIdData = (user_id) => {
    if (user_id !== undefined) {
      localStorage.setItem("UserID", JSON.stringify(user_id));
      if (parentId !== null) {
        localStorage.setItem("UPlineUserID", JSON.stringify(parentId));

      }
      window.location.reload();
    }
  };

  // useEffect(() => {
  //   window.location.reload();
  // }, [house5Plan1])
  const sumtotal = (referBYArray) => {
    let sum = 0;
    if (referBYArray) {
      referBYArray?.forEach(item => {
        if (item.status === "done") {
          const parse = item.depthleval + 1 === 1 ? 0 : item.depthleval + 1 === 2 ? 10 : item.depthleval + 1 === 3 ? 20 : item.depthleval + 1 === 4 ? 20 : item.depthleval + 1 === 5 ? 50 : 0;
          sum += 5 * parse / 100;
        }
      });
    }
    return sum
  }
  const leftsaid = () => {
    return (
      <div className="circle_preview_5_left">
        {memoizedHouse5Plan && memoizedHouse5Plan.length > 0 ? (
          <div className="circle_pre_1_1 cursor-pointer"
            onClick={() => handleNewIdData(memoizedHouse5Plan[1]?.uid)}>
            <h4 className={memoizedHouse5Plan[1]?.mainId !== house5Plan1[0]?.refId ? memoizedHouse5Plan[1]?.mainId === house5Plan1[0]?.mainId ? `bg-warning` : `bg-danger` : `bg-light`}>
              {memoizedHouse5Plan[1]?.uid || 0}
            </h4>
          </div>
        ) :
          (<div className="circle_pre_1_1">
            <h4>
              {0}
            </h4>
          </div>)}
        <div className="circle_pre_1_2">
          {[1, 2].map((el, index) => {
            const filteredData = house5Plan1[0]?.referBY
              .filter(item => item.refId === memoizedHouse5Plan?.[1]?.referred?.[index]);

            const filteredData1 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.refId);
            const filteredData2 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.mainId);
            return (
              <h4 key={index} className={filteredData1?.length <= 0 ? filteredData2?.length !== 0 ? `bg-danger cursor-pointer` : `bg-light cursor-pointer` : `bg-warning cursor-pointer`} onClick={() => handleNewIdData(filteredData[0]?.uid)}>
                {filteredData?.length > 0 ? filteredData[0]?.uid : "0"}
              </h4>
            );
          })}
        </div>

        <div className="circle_pre_1_3">
          {[1, 2].map((el, index1) => {
            return [1, 2].map((el, index) => {
              let a = house5Plan1[0]?.referBY
                .filter(item => item.refId === memoizedHouse5Plan?.[1]?.referred?.[index1])?.[0]?.referred;
              const filteredData = house5Plan1[0]?.referBY
                .filter(item => item.refId === a?.[index]);


              const filteredData1 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.refId);
              const filteredData2 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.mainId); return (
                <h4 key={index1 + index} className={filteredData1?.length <= 0 ? filteredData2?.length !== 0 ? `bg-danger cursor-pointer` : `bg-light cursor-pointer` : `bg-warning cursor-pointer`} onClick={() => handleNewIdData(filteredData[0]?.uid)}>
                  {filteredData?.length > 0 ? filteredData[0]?.uid : "0"}
                </h4>
              );
            });
          })}
        </div>

        <div className="circle_pre_1_4">
          {[1, 2].map((el, index2) => (
            [1, 2].map((el, index1) => (
              [1, 2].map((el, index) => {
                let a = house5Plan1[0]?.referBY
                  .filter(item => item.refId === memoizedHouse5Plan?.[1]?.referred?.[index2])?.[0]?.referred;
                let b = house5Plan1[0]?.referBY
                  .filter(item => item.refId === a?.[index1]);
                const filteredData = house5Plan1[0]?.referBY
                  .filter(item => item.refId === b?.[0]?.referred?.[index]);
                const filteredData1 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.refId);
                const filteredData2 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.mainId);
                return (
                  <h4 key={index2 + index1 + index} className={filteredData1?.length <= 0 ? filteredData2?.length !== 0 ? `bg-danger cursor-pointer` : `bg-light cursor-pointer` : `bg-warning cursor-pointer`} onClick={() => handleNewIdData(filteredData[0]?.uid)}>
                    {filteredData?.length > 0 ? filteredData[0]?.uid : "0"}
                  </h4>
                );
              })
            ))
          ))}
        </div>

        <div className="circle_pre_1_6">
          {[1, 2].map((el, index3) => (
            [1, 2].map((el, index2) => (
              [1, 2].map((el, index1) => (
                [1, 2].map((el, index) => {
                  let a = house5Plan1[0]?.referBY
                    .filter(item => item.refId === memoizedHouse5Plan?.[1]?.referred?.[index3])?.[0]?.referred;
                  let b = house5Plan1[0]?.referBY
                    .filter(item => item.refId === a?.[index2]);
                  let c = house5Plan1[0]?.referBY
                    .filter(item => item.refId === b?.[0]?.referred?.[index1]);
                  const filteredData = house5Plan1[0]?.referBY
                    .filter(item => item.refId === c?.[0]?.referred?.[index]);

                  const filteredData1 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.refId);
                  const filteredData2 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.mainId);
                  return (
                    <h4 key={index3 + index2 + index1 + index} className={filteredData1?.length <= 0 ? filteredData2?.length !== 0 ? `bg-danger cursor-pointer` : `bg-light cursor-pointer` : `bg-warning cursor-pointer`} onClick={() => handleNewIdData(filteredData[0]?.uid)}>
                      {filteredData?.length > 0 ? filteredData[0]?.uid : "0"}
                    </h4>
                  );
                })
              ))
            ))
          ))}
        </div>
      </div>
    );
  }

  const handleNewData = () => {
    console.log("clicked")
  }

  const Rightsaid = () => {
    return (
      <div className="circle_preview_5_left">
        {memoizedHouse5Plan && memoizedHouse5Plan.length > 0 ? (
          <div className="circle_pre_1_1"
            onClick={() => handleNewIdData(memoizedHouse5Plan[0]?.uid)}>
            <h4 className={memoizedHouse5Plan[0]?.mainId !== house5Plan1[0]?.refId ? memoizedHouse5Plan[1]?.mainId === house5Plan1[0]?.mainId ? `bg-warning cursor-pointer` : `bg-danger cursor-pointer` : `bg-light cursor-pointer`}>
              {memoizedHouse5Plan[0]?.uid || 0}
            </h4>
          </div>
        ) :
          (<div className="circle_pre_1_1">
            <h4>
              {0}
            </h4>
          </div>)}
        <div className="circle_pre_1_2">
          {[1, 2].map((el, index) => {
            const filteredData = house5Plan1[0]?.referBY
              .filter(item => item.refId === memoizedHouse5Plan?.[0]?.referred?.[index]);

            const filteredData1 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.refId);
            const filteredData2 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.mainId);
            return (
              <h4 key={index} className={filteredData1?.length <= 0 ? filteredData2?.length !== 0 ? `bg-danger cursor-pointer` : `bg-light cursor-pointer` : `bg-warning cursor-pointer`} onClick={() => handleNewIdData(filteredData[0]?.uid)}>
                {filteredData?.length > 0 ? filteredData[0]?.uid : "0"}
              </h4>
            );
          })}
        </div>

        <div className="circle_pre_1_3">
          {[1, 2].map((el, index1) => {
            return [1, 2].map((el, index) => {
              let a = house5Plan1[0]?.referBY
                .filter(item => item.refId === memoizedHouse5Plan?.[0]?.referred?.[index1])?.[0]?.referred;
              const filteredData = house5Plan1[0]?.referBY
                .filter(item => item.refId === a?.[index]);
              const filteredData1 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.refId);
              const filteredData2 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.mainId);
              return (
                <h4 key={index1 + index} className={filteredData1?.length <= 0 ? filteredData2?.length !== 0 ? `bg-danger cursor-pointer` : `bg-light cursor-pointer` : `bg-warning cursor-pointer`} onClick={() => handleNewIdData(filteredData[0]?.uid)}>
                  {filteredData?.length > 0 ? filteredData[0]?.uid : "0"}
                </h4>
              );
            });
          })}
        </div>

        <div className="circle_pre_1_4">
          {[1, 2].map((el, index2) => (
            [1, 2].map((el, index1) => (
              [1, 2].map((el, index) => {
                let a = house5Plan1[0]?.referBY
                  .filter(item => item.refId === memoizedHouse5Plan?.[0]?.referred?.[index2])?.[0]?.referred;
                let b = house5Plan1[0]?.referBY
                  .filter(item => item.refId === a?.[index1]);
                const filteredData = house5Plan1[0]?.referBY
                  .filter(item => item.refId === b?.[0]?.referred?.[index]);
                const filteredData1 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.refId);
                const filteredData2 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.mainId);

                return (
                  <h4 key={index2 + index1 + index} className={filteredData1?.length <= 0 ? filteredData2?.length !== 0 ? `bg-danger cursor-pointer` : `bg-light cursor-pointer` : `bg-warning cursor-pointer`} onClick={() => handleNewIdData(filteredData[0]?.uid)}>
                    {filteredData?.length > 0 ? filteredData[0]?.uid : "0"}
                  </h4>
                );
              })
            ))
          ))}
        </div>

        <div className="circle_pre_1_6">
          {[1, 2].map((el, index3) => (
            [1, 2].map((el, index2) => (
              [1, 2].map((el, index1) => (
                [1, 2].map((el, index) => {
                  let a = house5Plan1[0]?.referBY
                    .filter(item => item.refId === memoizedHouse5Plan?.[0]?.referred?.[index3])?.[0]?.referred;
                  let b = house5Plan1[0]?.referBY
                    .filter(item => item.refId === a?.[index2]);
                  let c = house5Plan1[0]?.referBY
                    .filter(item => item.refId === b?.[0]?.referred?.[index1]);
                  const filteredData = house5Plan1[0]?.referBY
                    .filter(item => item.refId === c?.[0]?.referred?.[index]);
                  const filteredData1 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.refId);
                  const filteredData2 = filteredData?.filter(item => item.mainId === house5Plan1[0]?.mainId);

                  return (
                    <h4 key={index3 + index2 + index1 + index} className={filteredData1?.length <= 0 ? filteredData2?.length !== 0 ? `bg-danger cursor-pointer` : `bg-light cursor-pointer` : `bg-warning cursor-pointer`} onClick={() => handleNewIdData(filteredData[0]?.uid)}>
                      {filteredData?.length > 0 ? filteredData[0]?.uid : "0"}
                    </h4>
                  );
                })
              ))
            ))
          ))}
        </div>
      </div>
    );
  }
  console.log("house5Plan2", house5Plan2);

  return (
    <React.Fragment>
      <div className="container">
        <ToastContainer />
      </div>
      <Navbar />
      <div
        className="fixed top-0 right-0 w-full h-full z-0"
        style={{
          backgroundImage: `url("https://busd.forsage.io/blurs/levels/blue-blur.png")`,
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
                  <span>Dollar house 5 </span> Plan
                </h3>
                <p>You can view the details of your House 1 Plan </p>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-between">
              <div onClick={() => {
                handleNewIdData(localStorage.getItem("UPlineUserID"));
              }} className="forsgae_level_card cursor-pointer  d-flex w-100 justify-content-center mx-5">
                <h4 className=""> Upline Id  {localStorage.getItem("UPlineUserID")}</h4>
              </div>
            </div>
            <div className="forsage_prive_center_btn">
              <div className="previews_btn_forsage" onClick={() => {
                setCount((co) => {
                  return co - 1;
                });
              }}>
                <button>Previous</button>
              </div>
              <div className="center_contant_forsage">
                <div className="forsgae_level_card">
                  <div className="level_title mx-3">
                    <h5>{planName1}</h5>
                    <h5 className="text-center">ID {localStorage.getItem("UserID")}</h5>
                    <h5>
                      {planName2}
                      <span className="px-2">
                        USDT
                      </span>
                    </h5>
                  </div>
                  {/* <Boxs box={box50} tableData={tableData} /> */}

                  <div className="circle_preview_5">
                    {Rightsaid()}
                    {leftsaid()}
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
                        <p>Cycles </p>
                        <h5>
                          <span>
                            <img
                              src={criclesimg}
                              alt="user_icon"
                              className="userd_icon"
                            />
                          </span>{count}
                          {/* {Number(result50)} */}
                        </h5>
                      </div>
                    </div>

                    <div className="Total_revenue">
                      <p>Total revenue</p>
                      <h1>
                        {sumtotal(house5Plan2)}
                        <span className="pl-3">
                          USDT
                        </span>
                      </h1>
                      {/* <span><img src={img4} alt='user_icon' className='userd_icon' /></span> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="previews_btn_forsage" onClick={() => {
                setCount((co) => {
                  return co + 1;
                });
              }}>
                <button>Next</button>
              </div>
            </div>

            <div className="tabls">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">type</th>
                    <th className="text-center">Level</th>
                    <th className="text-center">Reward</th>
                    <th className="text-center">Reward Value</th>
                    <th className="text-center">Wallet Id</th>
                    <th className="text-center">status </th>
                    <th className="text-center">User Id</th>
                    <th className="text-center">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {house5Plan1 &&
                    house5Plan1[0]?.referBY?.sort((a, b) => {
                      // Assuming house5Plan is an array of objects with a property 'createdAt'
                      return new Date(a.createdAt) - new Date(b.createdAt);
                    })?.map((item, index) => {
                      let parse = item.depthleval + 1 === 1 ? 0 : item.depthleval + 1 === 2 ? 10 : item.depthleval + 1 === 3 ? 20 : item.depthleval + 1 === 4 ? 20 : item.depthleval + 1 === 5 ? 50 : 0
                      return (<tr key={index}>
                        <td>
                          {item.depthleval == 0 ? (
                            <img
                              src="/up-arrow.png"
                              className="wallet_icon_last upline_arrow"
                            />
                          ) : (
                            <img
                              src={svg_wallet_img}
                              alt="wallet"
                              className="wallet_icon_last "
                            />
                          )}
                        </td>
                        <td>
                          {item.depthleval + 1}
                        </td>
                        <td>{planPrice}</td>
                        <td>{planName2 * parse / 100}</td>
                        <td className="text-center">
                          {item.refId.slice(0, 4)}...{" "}
                          {item.refId.slice(-4)}
                          <button
                            className="border-0 text-white bg-transparent"
                            onClick={() => {
                              copyToClipboard(item.refId);
                            }}
                          >
                            <FaRegCopy />
                          </button>
                        </td>
                        <td className="status_row">
                          {item.depthleval + 1 === 1 ? "send to upline" : "Received"}
                        </td>
                        <td>
                          <span className="table_id">ID{item.uid}</span>
                        </td>

                        <td className="text-center">
                          {new Date(item.createdAt).toLocaleString()}
                        </td>
                      </tr>)
                    })}
                </tbody>
              </table>
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
    </React.Fragment >
  );
};

export default House5Plan;