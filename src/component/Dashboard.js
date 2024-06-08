import green_cricle_img from "../image/activity_green.webp";
import img1 from "../image/line.svg";
import axios from "axios";
import { stakecontract, stake_abi } from "./contract.js";
import uset_img from "../image/uset_img.svg";
import { IoIosCloseCircle } from "react-icons/io";
import achievements_cupImg from "../image/svg-image-25.svg";
import img26 from "../image/svg-image-26.svg";
import { MdContentCopy } from "react-icons/md";
import bgbnb from "../image/hbanner1.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import UsdtIcon from "../image/tether-usdt-seeklogo1.svg";
import privewupicon from "../image/privew_up_icon.svg";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useState, useEffect, useRef } from "react";
import welcome_benner_card from "../image/1969222.svg";
import banner1 from "../image/dh-banner11.svg";
import banner2 from "../image/dh-banner2.svg";
import { CardData } from "./CardData.js";
import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading.js";
import { UsdtContract, usdt_abi } from "./usdt.js";

const Dashboard = () => {
  const [BuyTokenLoading, setBuyTokenLoading] = useState(false);
  const [refferal, setRefferal] = useState();
  const [profileData, setProfileData] = useState(null);
  const [data12, setdata12] = useState({});
  const [data123, setdata123] = useState({});
  const [dataincome, setdataincome] = useState({});
  const [profilePopup, setProfilePopup] = useState(false);
  const [previewID, setPreviewID] = useState("");
  const wallet_address = useAddress();
  const [profitDetails, setProfitDetails] = useState("");
  const [planDetails, setPlanDetails] = useState([]);
  const [planDetails21, setPlanDetails21] = useState({});
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sdk = useSDK();
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  function calculateFinalAmount(baseAmount, baseAmount2) {
    let finalAmount = 0;
    console.log("d1d1d1", baseAmount);
    console.log("d1d1d1", baseAmount2);
    for (let index = 0; index <= baseAmount; index++) {
      let d1 = index <= 2 ? 0 : index <= 6 ? 10 : index <= 14 ? 20 : index <= 30 ? 20 : 50
      console.log("d1d1d1", d1);
      finalAmount += baseAmount2 * d1 / 100
    }
    return finalAmount;
  }
  const { contract } = useContract(
    "0x0F1b1F82eEE342Fd18bC05792ec1F66D7a86CF8A"
  );

  const { data: cunWalletBal, isLoading: isCunWalletBalLoading } =
    useTokenBalance(contract, wallet_address);

  const { contract: USDTContract } = useContract(
    "0x5C2Db6D26D5A86392777368bFED9A8f1afC87A4F"
  );


  const GetPlanDetail1 = async (main_user_id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://doller-production.up.railway.app/plan/get-plan?userid=${main_user_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlanDetails(data.data.plan_details);
      setdata12(data.data1);
      setdata123(data.data2);
      setPlanDetails21(data.data4);
      setdataincome(data.data3);
      setWalletAddress(data.data.wallet_id);
      setLoading(!true);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  console.log(planDetails);

  // Example usage:

  const [walletAddress, setWalletAddress] = useState(wallet_address);

  const userDataReal = localStorage.getItem("UserID");
  var UserID = JSON.parse(userDataReal);
  const [main_user_id, setUser_id] = useState(UserID);
  const [user_id, setUser_id1] = useState(0);
  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  // Get User ID by wallet_address
  const [time, setTime] = useState(null);

  let isAmountGreaterThan3 = [];
  let isAmountGreaterThan4 = [];

  const user = async (e) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://doller-production.up.railway.app/user/get-user?wallet_id=${e}`
      );

      console.log(response.data.data);
      setTime(response.data.data.createdAt);
      console.log(response.data.data.createdAt);
      setRefferal(response.data.data.parent_details.wallet_id);
      user1(response.data.data.parent_details.wallet_id);
      setUser_id(response.data.data.user_id);
      setLoading(!true);
      console.log(
        "response.data.data.parent_details.wallet_id",
        response.data.data.parent_details.wallet_id
      );
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    if (walletAddress !== null) {
      user(walletAddress);
      fetchProfile(walletAddress);
    }
  }, [walletAddress]);
  const user1 = async (w) => {
    try {
      const response = await axios.get(
        `https://doller-production.up.railway.app/user/get-user?wallet_id=${w}`
      );

      setUser_id1(response.data.data.user_id);

      localStorage.setItem(
        "UPlineUserID",
        JSON.stringify(response.data.data.user_id)
      );
    } catch (err) {
      //console.log(err);
    }
  };
  const dateTime = new Date(time);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Month is zero-indexed
  const year = dateTime.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("BuyTokenLoading", loading);
  // Profit Details by ID
  const profitDetailsApi = async (main_user_id) => {
    try {
      const response = await axios.get(
        `https://doller-production.up.railway.app/profit/total-profit?userId=${main_user_id}`
      );
      setProfitDetails(response.data.data);
      localStorage.setItem("total", response.data.data.recentTeam || 0);
      console.log("response.data", response.data.data);
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    if (main_user_id !== "") {
      profitDetailsApi(main_user_id);
    }
  }, []);

  function removeAndReplaceMiddleCharacters(str) {
    if (typeof str !== "string" || str.length <= 30) {
      return str;
    }
    const before = str.substring(0, 7);
    const after = str.substring(35); // Remove 30 characters and take the rest
    const replacedMiddle = ".".repeat(5); // Replace 30 characters with 5 asterisks
    return before + replacedMiddle + after;
  }

  const modifiedAddress = removeAndReplaceMiddleCharacters(walletAddress);
  const modifiedAddress1 = removeAndReplaceMiddleCharacters(refferal);

  let ref = "0x5ed0e08e0b27f2fce526f55a1aad641e328b740c";
  const handleBuyPlan = async (plan_name, plan_price) => {
    try {
      console.log(modifiedAddress);
      setLoading(true);
      const response = await fetch("https://doller-production.up.railway.app/plan/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_id: walletAddress?.toLowerCase(),
          refferalId: refferal.toLowerCase(),
          plan_details: [
            {
              amount: plan_price,
              plan_name: plan_name,
              type: "registration",
            },
          ],
        }),
      });
      setLoading(!true);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // const PostHouse5Plan = async (plan_price) => {
  //   setBuyTokenLoading(true)
  //   try {
  //     const response = await fetch("https://doller-production.up.railway.app/team/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         wallet_id: walletAddress,
  //         refferal_id: ref,
  //         amount: plan_price,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     setBuyTokenLoading(false)
  //     toast.success("Tokens Bought Successfully", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });

  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //     setBuyTokenLoading(false)
  //   }
  // };

  const contractAddress = '0x0F1b1F82eEE342Fd18bC05792ec1F66D7a86CF8A';
  const abi = [{ "inputs": [{ "internalType": "address", "name": "_usdtTokenAddress", "type": "address" }, { "internalType": "address", "name": "_adminWallet", "type": "address" }, { "internalType": "uint256", "name": "_transactionFee", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_a", "type": "address" }, { "internalType": "address", "name": "_c", "type": "address" }], "name": "D", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "LevelCountUsers", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LevelUsers", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "Parent", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_referrer", "type": "address" }, { "internalType": "uint256", "name": "_tier", "type": "uint256" }], "name": "Register", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "TransactionFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "UserPresentTier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }, { "internalType": "bool", "name": "_sttaus", "type": "bool" }], "name": "addadmin", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_userid", "type": "uint256" }, { "internalType": "string", "name": "_level", "type": "string" }, { "internalType": "address", "name": "_useraddress", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "_active", "type": "bool" }], "name": "adddata", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "adminWallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newadmin", "type": "address" }], "name": "changeadmin", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newtoken", "type": "address" }], "name": "changetoken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_level", "type": "string" }], "name": "getdata", "outputs": [{ "components": [{ "internalType": "uint256", "name": "userid", "type": "uint256" }, { "internalType": "string", "name": "level", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "bool", "name": "status", "type": "bool" }], "internalType": "struct DataAdd.history[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_useraddress", "type": "address" }], "name": "getuser", "outputs": [{ "components": [{ "internalType": "uint256", "name": "userid", "type": "uint256" }, { "internalType": "string", "name": "level", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "bool", "name": "status", "type": "bool" }], "internalType": "struct DataAdd.history[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isadmin", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "isuse", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "planUnlocked", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "usdtToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userRewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]
  const approveTokens = async (plan_name, plan_price) => {
    console.log("dddd===>>>", plan_price);
    setBuyTokenLoading(true);
    try {
      let spender = "0x0F1b1F82eEE342Fd18bC05792ec1F66D7a86CF8A"; //contract address
      let approveAmount = ethers.utils.parseEther(plan_price);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(UsdtContract, usdt_abi, signer);
      const token = await contract.approve(spender, approveAmount.toString(), {
        gasLimit: 80000,
      });
      const receipt = await token.wait();
      if (receipt.status === 1) {
        buyToken(plan_name, plan_price)
        toast.success("Successfully approved tokens!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setBuyTokenLoading(false);
    } catch (error) {
      setBuyTokenLoading(false);
      toast.error("Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };


  const buyToken = async (plan_name, plan_price) => {
    setBuyTokenLoading(true);
    try {
      console.log("refferal", refferal);
      let tierplan = ethers.utils.parseEther("20");

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      let num = Number(plan_price * 10 ** 18)
      const tx = await contract.Register(refferal, num.toString());
      console.log("num.toString()", num.toString());
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        handleBuyPlan(plan_name, plan_price);
      }
    } catch (error) {
      console.log("errorerror", error);
      console.log("refferalCode", ref);
      toast.error("Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    setBuyTokenLoading(false);
    // try {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();
    //   const contract = new ethers.Contract(stakecontract, stake_abi, signer);
    //   const token = await contract.buyTokens(ref, tierplan);
    //   console.log(token);
    //   const receipt = await token.wait();
    //   if (receipt.status === 1) {
    //     handleBuyPlan(plan_name, plan_price);
    //     toast.success(`Registration Successfull for ${plan_price}$`, {
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //   }
    //   setBuyTokenLoading(false);
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });

    // } 
  };

  const { mutateAsync: buyTokens, isLoading: isBuyTokensLoading } =
    useContractWrite(contract, "buyTokens");

  // const buyToken = async (plan_name, plan_price) => {
  // let tierplan = ethers.utils.parsescesss", data);
  // handleBuyPlan(plan_name, plan_price);
  //   toast.success((`Successfully Upgraded for ${plan_price}$`), {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // } catch (err) {
  //   toast.error("Something went Wrong ", {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  //   setLoading(false);
  //   console.error("contract call failure", err);
  // } finally {
  //   setBuyTokenLoading(false);
  // }
  // };





  // Function to check if the amount is greater than 3 based on plan price
  async function checkAmount11(itams, data12) {
    if (itams?.plan_price == 20) {
      return data12?.r20 > 3;
    } else if (itams?.plan_price == 40) {
      return data12?.r40 > 3;
    } else if (itams?.plan_price == 100) {
      return data12?.r100 > 3;
    }
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFileChange = async (e) => {
    console.log(e.target.files);
    const base64String = await fileToBase64(e.target.files[0]);
    console.log(base64String);
    setFile(base64String);
  };

  // const handleSubmit = async (e) => {
  //   try {
  //     const requestBody = {
  //       username: username,
  //       wallet_id: wallet_id,
  //       filename: file
  //     };

  //     const response = await axios.post(
  //       "https://doller-production.up.railway.app/profile/upload",
  //       requestBody,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     fetchProfile(walletAddress);
  //     toast.success("Profile Submitted", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     setProfilePopup(false);
  //     setMessage("Profile picture uploaded successfully!");
  //   } catch (error) {
  //     console.error("Error uploading profile picture: ", error);
  //     setMessage("Error uploading profile picture. Please try again.");
  //   }
  // };

  const handleCopyReferralLink = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = walletAddress;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    console.log("Copied");
    // Use react-toastify to display a toaster notification
    toast.success("Wallet Address copied to clipboard!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleCopyReferralLink2 = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = `${window.location.href.split('/d')[0]}/${walletAddress?.toLowerCase()}`;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    console.log("Copied");
    // Use react-toastify to display a toaster notification
    toast.success("Referral link copied to clipboard!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Get Plan Detail and Wallet wallet_address
  const GetPlanDetail = async (main_user_id) => {
    try {
      const response = await fetch(
        `https://doller-production.up.railway.app/plan/get-plan?wallet_id=${main_user_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlanDetails(data.data.plan_details);
      setdata12(data.data1);
      setdata123(data.data2);
      setdataincome(data.data3);
      setPlanDetails21(data.data4);
      setWalletAddress(data.data.wallet_id);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // fetch Profile Data

  const fetchProfile = async (wallet) => {
    try {
      const response = await fetch(
        `https://doller-production.up.railway.app/profile/get-profile?wallet_id=${wallet}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProfileData(data);
      setLoading(!true);

    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  useEffect(() => {
    // if (walletAddress !== undefined) {
    // fetchProfile(walletAddress?.toLowerCase());
    // GetPlanDetail(walletAddress?.toLowerCase());
    // } else {
    GetPlanDetail1(UserID);

    fetchProfile(UserID);
    // }
  }, [UserID]);

  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        username: username,
        wallet_id: walletAddress,
        filename: file,
      };

      const response = await axios.post(
        "https://doller-production.up.railway.app/profile/upload",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      fetchProfile(walletAddress);
      toast.success("Profile Submitted", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setProfilePopup(false);
      setMessage("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture: ", error);
      setMessage("Error uploading profile picture. Please try again.");
    }
    // fetchProfile(walletAddress);
  };

  // console.log(profileData);
  const checkAmount = (amount) => {
    if (amount !== null) {
      for (let i = 0; i < planDetails?.length; i++) {
        if (planDetails[i].amount == amount) {
          return true;
        }
      }
    }
    return false;
  };

  const checkAccess = () => {
    let highestAmount = 20;

    for (let i = 0; i < planDetails?.length; i++) {
      const currentAmount = planDetails[i].amount;
      if (currentAmount == 20) {
        highestAmount = 40;
      } else if (currentAmount == 40 && highestAmount != 100) {
        highestAmount = 100;
      } else if (currentAmount == 100 && highestAmount != 200) {
        highestAmount = 200;
      } else if (currentAmount == 200 && highestAmount != 500) {
        highestAmount = 500;
      } else if (currentAmount == 500 && highestAmount != 1000) {
        highestAmount = 1000;
      } else if (currentAmount == 1000 && highestAmount != 2000) {
        highestAmount = 2000;
      } else if (currentAmount == 2000 && highestAmount != 4000) {
        highestAmount = 4000;
      }
    }

    return highestAmount.toString();
  };

  const datashow = (dataincome, slotId) => {
    return (
      dataincome &&
      dataincome["h1" + slotId + "all"] +
      dataincome["h15" + slotId + "all"] +
      dataincome["innerAmountSum" + slotId]
    );
  };
  const missdatashow = (dataincome, slotId) => {
    return (
      dataincome &&
      dataincome["h1" + slotId + "miss"] + dataincome["h15" + slotId + "miss"]
    );
  };

  const [totalInvestMent, setTotalInvestMent] = useState("");

  useEffect(() => {
    const sumOfAmounts = planDetails?.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );

    setTotalInvestMent(sumOfAmounts);
  }, [planDetails]);
  const handleSearch = (previewID) => {
    profitDetailsApi(previewID);
    GetPlanDetail1(previewID);
    // fetchProfile(walletAddress);
    localStorage.setItem("UserID", JSON.stringify(previewID));
  };

  const searchParentData = (ID) => {
    localStorage.setItem("UserID", JSON.stringify(ID));
    window.location.reload();
  };

  const NotAllowed = () => {
    toast.error("You can not upgrade this account", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const isAccess =
    wallet_address?.toLowerCase() == walletAddress?.toLowerCase();

  const [userData24, setUserData24] = useState("")

  // useEffect(() => {
  // const fetchData24 = async () => {
  //   try {
  //     const response = await fetch(`https://doller-production.up.railway.app/user/user-details?wallet_id=${walletAddress}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     setUserData24(data);

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // fetchData24();
  // }, [walletAddress]);


  return (
    <React.Fragment>
      {loading === true && <Loading />}
      {
        <div className={loading && "opacity_manage"}>
          <div>
            {profilePopup && (
              <div className="profile_main_div relative">
                <button
                  className="close_button_popup"
                  onClick={() => {
                    setProfilePopup(false);
                  }}
                >
                  <IoIosCloseCircle />
                </button>
                <h3 className="heading">Edit Profile</h3>
                <form
                  onSubmit={handleProfileFormSubmit}
                  className="profile_form"
                >
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                  />
                  <input type="file" onChange={handleFileChange} />
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
          </div>
          <div className={`${profilePopup ? "opacity_profile" : ""}`}>
            <div className="container ">
              <div className="pre_Id">
                <div className="pri_id_cnct_btn">
                  <div className="pri_id_img">
                    <img src={img1} alt="logo" className="logoimg_priview" />
                    <p>Preview ID</p>
                    <div className="input_btn desktop_search_field">
                      <input
                        value={previewID}
                        type="number"
                        onChange={handleChange}
                        className="input_NUmber"
                        placeholder="Preview ID"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleSearch(previewID);
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  {/* <div className="connect_btn desktop_connect_button">
              <ConnectWallet />
            </div> */}
                </div>
              </div>
            </div>
            <Navbar actuvetab={"Dashboard"} handleSearch1={(eaa) => {

              console.log("eaaeaaeaaeaa", eaa);
              handleSearch(eaa);
            }} />
            <ToastContainer />
            <div className="content">
              <div className="container">
                <div className="personal_user mt-md-5 pt-md-5">
                  <div className="row mt-md-3">
                    <div className="col-lg-6 profile-section">
                      <div className="personal_user_left">
                        <div className="unknowuser_img d-block m-auto">
                          {profileData?.data?.picture !== undefined ? (
                            <img
                              onClick={() => {
                                setProfilePopup(!profilePopup);
                              }}
                              className="user_logo  ml-0 ml-md-4"
                              src={profileData?.data?.picture || uset_img}
                              alt="uset_img"
                              minwidth={130}
                            />
                          ) : (
                            <img
                              onClick={() => {
                                setProfilePopup(!profilePopup);
                              }}
                              className="user_logo  ml-0 ml-md-4"
                              src={profileData?.data?.picture || uset_img}
                              alt="uset_img"
                              minwidth={130}
                            />
                          )}
                        </div>
                        <div className="id_user right_text d-block m-auto w-100 px-2 px-md-4">
                          <div className="d-flex justify-content-between mt-4">
                            <div className=" ">
                              {profileData?.data?.username ? (
                                <h1>
                                  {profileData?.data?.username.length > 0
                                    ? profileData?.data?.username
                                    : "username"}
                                </h1>
                              ) : (
                                <h1>User Name</h1>
                              )}
                              {/* <h4 className="text-light m-0">User Name</h4> */}
                            </div>
                            <div className="cursor-pointer profile_user_id table_id">
                              ID {UserID || main_user_id}
                            </div>
                          </div>
                          <p
                            style={{
                              width: "100%",
                              fontSize: "13px",
                              justifyContent: "space-between !important;",
                              display: "flex",
                            }}
                            className="justify-content-between mt-3 mb-2"
                          >
                            {modifiedAddress}{" "}
                            {modifiedAddress && (
                              <MdContentCopy
                                className="cursor-pointer copy-button"
                                onClick={handleCopyReferralLink}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginLeft: "10px",
                                }}
                              />
                            )}
                          </p>
                          <div
                            className="justify-content-between"
                            style={{ display: "flex" }}
                          >
                            <span
                              className="id_bg id_user_top parent_address "
                              style={{ width: "134px", fontSize: "13.75px" }}
                            >
                              {`
                        ${modifiedAddress1
                                  ? `Invited at ${formattedDate} `
                                  : "Invited 01.03.2021"
                                }`}
                            </span>
                            <span style={{ marginTop: "22px" }}>
                              {refferal && (
                                <span
                                  onClick={() => {
                                    searchParentData(user_id);
                                  }}
                                  className="cursor-pointer profile_user_id table_id"
                                >
                                  ID {user_id}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="personal_user_right stack-personal-user">
                        <div className="frgx">
                          <div className="login_to_show">
                            <p>Personal link</p>
                            <div className="personal_link_desbord">
                              <h4 className="stacked_value copy_address">
                                {window.location.href.split('/d')[0]}
                                <br />{" "}
                                {modifiedAddress?.toLowerCase().split(0, 10)}
                              </h4>
                              <button
                                onClick={handleCopyReferralLink2}
                                className="personal_link_copy_a"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className=" bgbnb">
                          <img src={bgbnb} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="partners_card_section">
                <div className="container">
                  <div className="row">
                    <div className="card_section2_all">
                      <div className="card_section2_left">
                        <div className="teams_all_card teams_all_card2">
                          <p className="card_title">Direct Team</p>

                          <h1>{profitDetails && profitDetails?.recentTeam}</h1>
                          <div className="">
                            <div className="down_green">
                              <p className="text-green-500">
                                {" "}
                                <span className="toparrow">
                                  <i
                                    className="fa fa-long-arrow-up"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                {profitDetails ? profitDetails?.total_team : 0}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="teams_all_card teams_all_card2">
                          <p className="card_title">Total Team</p>
                          <h1>
                            {profitDetails ? profitDetails?.directTeam : 0}
                          </h1>
                          <div className="">
                            <div className="down_green">
                              <p className="text-green-500">
                                <span className="toparrow">
                                  <i
                                    className="fa fa-long-arrow-up"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                {profitDetails ? profitDetails?.directTeam112 : 0}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="teams_all_card teams_all_card2">
                          <p className="card_title">Ratio</p>
                          <h1 className="text-green-500">
                            {profitDetails &&
                              (
                                (profitDetails?.overAllProfit /
                                  planDetails21?.totalSlotSum) *
                                100
                              ).toFixed(4)}
                            %
                          </h1>
                        </div> */}
                      </div>
                      <div className="card_section2_right">
                        <div className="teams_all_card teams_all_card3">
                          <p className="card_title">Over All Profit</p>
                          <div className="Profits-number">
                            <div className="pro_num">
                              <h1>
                                {
                                  planDetails21?.totalSlotSum
                                }
                              </h1>
                              <p>
                                <h4>{planDetails21?.totalSlotSum240}</h4>
                                <span className="toparrow">
                                  <i
                                    className="fa fa-long-arrow-up"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="archivment_img">
                <div className="container">
                  <div className="achievements_cup">
                    <div className="achievements_cupImg">
                      <img
                        src={achievements_cupImg}
                        alt="achievements_cupImg"
                        className="achievements_cupImg"
                      />
                      <img
                        src={achievements_cupImg}
                        alt="achievements_cupImg"
                        className="achievements_cupImg"
                      />
                      <img
                        src={achievements_cupImg}
                        alt="achievements_cupImg"
                        className="achievements_cupImg"
                      />
                      <img
                        src={achievements_cupImg}
                        alt="achievements_cupImg"
                        className="achievements_cupImg"
                      />
                    </div>

                    <div className="archivment_show">
                      <a href="#">
                        Show all{" "}
                        <span className="rightarrow">
                          <img
                            src={img26}
                            alt="rightarrow"
                            className="rightarrow26"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="doller_house_owl_crousel">
                <div className="container">
                  <div id="demo" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          src={banner1}
                          alt="welcome_benner_card"
                          className="welcome_benner_card"
                        />

                        <img
                          src={banner2}
                          alt="welcome_benner_card"
                          className="welcome_benner_card welcome_benner_card2"
                        />

                        <img
                          src={welcome_benner_card}
                          alt="welcome_benner_card"
                          className="welcome_benner_card welcome_benner_card3"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          src={banner2}
                          alt="welcome_benner_card"
                          className="welcome_benner_card"
                        />

                        <img
                          src={banner1}
                          alt="welcome_benner_card"
                          className="welcome_benner_card welcome_benner_card2"
                        />

                        <img
                          src={welcome_benner_card}
                          alt="welcome_benner_card"
                          className="welcome_benner_card welcome_benner_card3"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          src={welcome_benner_card}
                          alt="welcome_benner_card"
                          className="welcome_benner_card"
                        />

                        <img
                          src={banner2}
                          alt="welcome_benner_card"
                          className="welcome_benner_card welcome_benner_card2"
                        />

                        <img
                          src={banner1}
                          alt="welcome_benner_card"
                          className="welcome_benner_card welcome_benner_card3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="preview_by_doller_program">
                <div className="container p-0">
                  <div className="preview_card_pogram_title">
                    <h3>
                      {" "}
                      <span>Dollar house</span> programs
                    </h3>
                  </div>
                  <div className="privew_card_container_main">
                    {CardData && CardData.map((item, index) => {

                      let da = CardData?.findIndex((el) => {
                        return el.slotId == item.plan_price;
                      });
                      let price2 = Number(item.price2.replace(/\$/g, ''))
                      let b = CardData[da + 1];
                      if (item?.plan_price == 20) {
                        isAmountGreaterThan3.push(data12?.r20 > 3);
                      } else if (item?.plan_price == 40) {
                        isAmountGreaterThan3.push(data12?.r40 > 3);
                      } else if (item?.plan_price == 100) {
                        isAmountGreaterThan3.push(data12?.r100 > 3);
                      } else if (item?.plan_price == 200) {
                        isAmountGreaterThan3.push(data123?.r200 > 3);
                      } else if (item?.plan_price == 500) {
                        isAmountGreaterThan3.push(data123?.r500 > 3);
                      } else if (item?.plan_price == 1000) {
                        isAmountGreaterThan3.push(data123?.r1000 > 3);
                      } else if (item?.plan_price == 2000) {
                        isAmountGreaterThan3.push(data123?.r2000 > 3);
                      } else if (item?.plan_price == 4000) {
                        isAmountGreaterThan3.push(data123?.r4000 > 3);
                      }
                      if (item?.plan_price == 20) {
                        isAmountGreaterThan4.push(!true);
                      } else if (item?.plan_price == 40) {
                        isAmountGreaterThan4.push(data123?.r40 > 0);
                      } else if (item?.plan_price == 100) {
                        isAmountGreaterThan4.push(data123?.r100 > 0);
                      } else if (item?.plan_price == 200) {
                        isAmountGreaterThan4.push(data123?.r200 > 0);
                      } else if (item?.plan_price == 500) {
                        isAmountGreaterThan4.push(data123?.r500 > 0);
                      } else if (item?.plan_price == 1000) {
                        isAmountGreaterThan4.push(data123?.r1000 > 0);
                      } else if (item?.plan_price == 2000) {
                        isAmountGreaterThan4.push(data123?.r2000 > 0);
                      } else if (item?.plan_price == 4000) {
                        isAmountGreaterThan4.push(data123?.r4000 > 0);
                      }
                      const showPreview1 = checkAmount(b?.plan_price);
                      const foundPlan = planDetails?.find(e => e.amount === CardData[index + 1]?.plan_price);
                      console.log("foundPlan", foundPlan);
                      console.log("foundPlan", planDetails);
                      console.log("foundPlan", CardData[index + 1]?.plan_price);
                      return (
                        <div className={`relative privew_card_sub mx-2 ${showPreview1 ? checkAmount(item.plan_price) ? "buy" : "" : isAmountGreaterThan3[index] ? "ERR2" : isAmountGreaterThan4[index] ? checkAmount(item.plan_price) ? "buy" : "ERR" : ""}`}>
                          <div key={index} className={checkAmount(item.plan_price) ? "" : "opacity_down"}>
                            <div className="slot_title_and_price">
                              <div className="slot_price">
                                <h4>{item.slotName}</h4>
                              </div>
                              {checkAmount(item.plan_price) &&
                                <div className="slot_price_carf_t d-block">
                                  <h4 className="text-light"><b>{datashow(dataincome, item.slotId)} USDT</b></h4>
                                </div>
                              }
                            </div>
                            <div className="slot_all_price_and_priviews py-2">
                              <div className="all_slot">
                                <h5>{item.price1}</h5>
                                <h5>{item.price2}</h5>
                                <h5>{item.price3}</h5>
                              </div>
                              {checkAmount(item.plan_price) &&
                                <div className="slot_privew_btn">
                                  <Link to={`/slot-${item.slotId}`}>
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
                              }
                            </div>
                          </div>
                          {!checkAmount(item.plan_price) && (
                            <div className="slot_privew_btn slot_privew_btn_center">
                              {!loading ?
                                <button
                                  onClick={() =>
                                    approveTokens(
                                      item.plan_name,
                                      item.plan_price
                                    )
                                  }
                                >
                                  Upgrade {checkAccess}
                                  <span>
                                    <img
                                      src={privewupicon}
                                      alt="upicons_privew"
                                      className="upicons_privew"
                                    />
                                  </span>
                                </button> : <button>
                                  loding...
                                </button>
                              }
                            </div>)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="container">
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
                      Trading cryptocurrencies carries a high level of risk, and
                      may not be suitable for all investors. Before deciding to
                      trade cryptocurrency, you should carefully consider your
                      investment objectives, level of experience, and risk
                      appetite. The possibility exists that you could sustain a
                      loss of some or all of your initial investment and
                      therefore you should not invest money that you cannot
                      afford to lose. You should be aware of all the risks
                      associated with cryptocurrency trading, and seek advice
                      from an independent financial advisor. Any opinions, news,
                      research, analyses, prices, or other information contained
                      on this website is provided as general market commentary,
                      and does not constitute investment advice. The CUNetwork
                      will not accept liability for any loss or damage,
                      including without limitation to, any loss of profit, which
                      may arise directly or indirectly from use of or reliance
                      on such information. All opinions expressed on this site
                      are owned by the respective writer and should never be
                      considered as advice in any form. The CUNetwork makes no
                      representation or warranties as to the accuracy and or
                      timelines of the information contained herein. A qualified
                      professional should be consulted before making any
                      financial decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default Dashboard;
