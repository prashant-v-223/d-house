import plashtfiny from "../image/gold-blur.png";
import logo from "../image/logoMain.png";
import icon1 from "../image/icon3.svg";
import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import axios from "axios";
import welcome_benner from "../image/Welcome_banner.svg";
import { stakecontract, stake_abi } from "./contract.js";
import {
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsdtContract, usdt_abi } from "./usdt.js";
import { color } from "framer-motion";
import RegisterComponent from './RegisterComponent';

const Registration = ({ id }) => {
  const [USDTAmt, setUSDTAmt] = useState("");
  const [approveAmt, setApproveAmt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refferalCode, setReferralCode] = useState("");
  const referralLinkRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setReferralCode(id);
  }, [id]);

  const handleConfetti = () => {
    confetti({});
  };

  const handleReferralChange = (event) => {
    setReferralCode(event.target.value);
  };

  const isValidUSDTamount = Number(USDTAmt) >= 20 || USDTAmt == "";

  const storedData = localStorage.getItem("UserID");
  const UserID = JSON.parse(storedData);
  const address = useAddress();

  const { contract } = useContract(
    "0x16f16FaDb27f04bdb754F073AFDec59C3046a31E"
  );
  const { data: cunWalletBal, isLoading: isCunWalletBalLoading } =
    useTokenBalance(contract, address);
  const { contract: USDTContract } = useContract(
    "0x5C2Db6D26D5A86392777368bFED9A8f1afC87A4F"
  );

  const { data: checkApproval, isLoading: isApprovalLoading } = useContractRead(
    USDTContract,
    "allowance",
    [address, "0x16f16FaDb27f04bdb754F073AFDec59C3046a31E"]
  );

  const ApprovedValue = checkApproval
    ? parseFloat(ethers.utils.formatUnits(checkApproval))
    : 0;

  const { data: walletBal, isLoading: walletBalLoading } = useTokenBalance(
    USDTContract,
    address
  );

  const walletBalValue = walletBal
    ? parseFloat(ethers.utils.formatUnits(walletBal.value))
    : 0;

  const handleCopyReferralLink = () => {
    if (referralLinkRef.current) {
      referralLinkRef.current.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      toast.success("Referral link copied to clipboard!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const approveTokens = async () => {
    console.log("dddd===>>>");
    setIsLoading(true);
    try {
      let spender = "0x16f16FaDb27f04bdb754F073AFDec59C3046a31E"; //contract address
      let approveAmount = ethers.utils.parseEther(approveAmt);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(UsdtContract, usdt_abi, signer);
      const token = await contract.approve(spender, approveAmount.toString(), {
        gasLimit: 80000,
      });
      const receipt = await token.wait();
      if (receipt.status === 1) {
        buyToken()
        toast.success("Successfully approved tokens!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const PostHouse5Plan = async (plan_price) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3100/team/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_id: address.toLowerCase(),
          refferal_id: refferalCode.toLowerCase(),
          amount: 20,
        }),
      });
      const data = await response.json();
      setIsLoading(false);

      toast.success("Tokens Bought Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      if (response.ok) {
        user();
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsLoading(false);
    }
  };

  const handleBuyPlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3100/plan/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_id: address?.toLowerCase(),
          refferalId: refferalCode.toLowerCase(),
          plan_details: [
            {
              amount: 20,
              plan_name: "DH Plan 1",
              type: "registration",
            },
          ],
        }),
      });

      if (response.ok) {
        setIsLoading(false);
        user()
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user details:", error);
    }
  };

  const { mutateAsync: lpi8i6, isLoading: isBuyTokensLoading } =
    useContractWrite(contract, "buyTokens");
  const contractAddress = '0x16f16FaDb27f04bdb754F073AFDec59C3046a31E';
  const abi =  [{"inputs":[{"internalType":"address","name":"_usdtTokenAddress","type":"address"},{"internalType":"address","name":"_adminWallet","type":"address"},{"internalType":"uint256","name":"_transactionFee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_a","type":"address"},{"internalType":"address","name":"_c","type":"address"}],"name":"D","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"LevelCountUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"LevelUsers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"Parent","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_referrer","type":"address"},{"internalType":"uint256","name":"_tier","type":"uint256"}],"name":"Register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TransactionFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"UserPresentTier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"},{"internalType":"bool","name":"_sttaus","type":"bool"}],"name":"addadmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_userid","type":"uint256"},{"internalType":"string","name":"_level","type":"string"},{"internalType":"address","name":"_useraddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bool","name":"_active","type":"bool"}],"name":"adddata","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newadmin","type":"address"}],"name":"changeadmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newtoken","type":"address"}],"name":"changetoken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_level","type":"string"}],"name":"getdata","outputs":[{"components":[{"internalType":"uint256","name":"userid","type":"uint256"},{"internalType":"string","name":"level","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"bool","name":"status","type":"bool"}],"internalType":"struct DataAdd.history[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_useraddress","type":"address"}],"name":"getuser","outputs":[{"components":[{"internalType":"uint256","name":"userid","type":"uint256"},{"internalType":"string","name":"level","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"bool","name":"status","type":"bool"}],"internalType":"struct DataAdd.history[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isadmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isuse","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"planUnlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
  const buyToken = async (plan_name, plan_price) => {
    setIsLoading(true);
    try {
      let tierplan = ethers.utils.parseEther("20");

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.Register(refferalCode, "20000000000000000000");

      const receipt = await tx.wait();
      console.log("receipt", receipt);
      handleBuyPlan(plan_name, plan_price);
    } catch (error) {
      console.log("errorerror", error);
      console.log("refferalCode", refferalCode);
      toast.error("Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };








  const user = async () => {
    console.log(address);
    try {
      const response = await axios.get(
        `http://localhost:3100/user/get-user?wallet_id=${address}`
      );
      localStorage.setItem("UserID", JSON.stringify(response.data.data.user_id));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="regi_main">
      <div style={{ zIndex: 99999999 }}>
        <ToastContainer />
      </div>

      {isLoading && (
        <div className="overlay">
          <Loading />
        </div>
      )}

      <div className={`container ${isLoading ? "blur" : ""}`}>
        <div className="main_top_logo">
          <div className="logos_landing">
            <span>
              <img src={logo} alt="logos" className="logolanding" />
            </span>
          </div>

          <div className="smart_chains">
            <div className="smart_chain_1">
              <span>
                <img
                  src={icon1}
                  alt="smart_chain"
                  className="smart_chain_icon"
                />
              </span>
              <p>Smart Chain</p>
            </div>

            <div className="connect_btn"></div>
          </div>
        </div>

        <div className="registion_from">
          <div className="row">
            <div className="col-lg-6">
              <div className="regis_left">
                <h2>
                  Registration On <br></br>Dollar House Platform
                </h2>
                <div className="input_upline">
                  <h5>Your upline</h5>
                  <input
                    required
                    type="text"
                    className="you_pline_input"
                    value={refferalCode}
                    onChange={handleReferralChange}
                  />

                  <div className="input_verification">
                    {address ? (
                      <p className="approve_busd_span">
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        Wallet Connected
                      </p>
                    ) : (
                      <p className="text-red">
                        <span>
                          <i
                            class="fa fa-exclamation-circle"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Wallet:not detected
                      </p>
                    )}
                    {walletBalValue > 20 ? (
                      <p className="approve_busd_span">
                        {" "}
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        <span>USDT Balance</span>
                      </p>
                    ) : (
                      <p>
                        {" "}
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        <span>USDT Balance</span>
                      </p>
                    )}

                    {ApprovedValue > 20 ? (
                      <p className="approve_busd_span">
                        {" "}
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        <span>Approve USDT</span>
                      </p>
                    ) : (
                      <p>
                        {" "}
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        <span>Approve USDT</span>
                      </p>
                    )}
                  </div>
                  <div className="chech_agin_btn">
                    <button onClick={handleBuyPlan} disabled={isLoading}>Register with $20 Slot</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="regis_right p-4"
                style={{
                  backgroundImage: `url(${plashtfiny})`,
                  backgroundSize: "cover",
                }}
              >
                <label className="block text-white font-bold text-lg">
                  Approve
                </label>
                <div className="information_section_icon">
                  <div className="flex">
                    <input
                      type="text"
                      className="you_pline_input"
                      value={approveAmt}
                      onChange={(e) => {
                        setApproveAmt(e.target.value);
                      }}
                    />
                    <button
                      className="bg-[#cb6100] approve_button"
                      onClick={approveTokens}
                    >
                      Approve
                    </button>
                  </div>
                  <h4 className="mt-4">
                    <span>
                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                    Information
                  </h4>
                  <div className="wallwct_conenct_dtai_section">
                    <h5>Wallet not connected.</h5>
                    <p>
                      Access the website via cryptowallet dapp browser
                      (”Discover” button in Tokenpoket) or with Metamask
                      extension installed.
                    </p>
                    <button>Read guide</button>
                  </div>
                </div>
                <div className="video_section_ragistration"></div>
                <div className="nedd_help_section">
                  <p>
                    {" "}
                    <span>
                      <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    </span>
                    Need help with registration? <br></br>Talk to experts in the{" "}
                    <b>support chat</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;