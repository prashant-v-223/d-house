import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../component/Navbar';

function Tranfer() {
    const userDataReal = localStorage.getItem("UserID");
    var UserID = JSON.parse(userDataReal);
    const [main_user_id, setUser_id] = useState(UserID);
    const [profitDetails, setProfitDetails] = useState([]);
    const profitDetailsApi = async (main_user_id) => {
        try {
            const response = await axios.get(
               `https://dollerhouse111.onrender.com/profit/total-profit?userId=${main_user_id}`
            );
            setProfitDetails(response.data.data.plan_buyeds);
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
    return (
        <>
            <Navbar actuvetab={"upgrade"} />
            <div className="content">
                <table className="table p-4">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Plan Name</th>
                            <th>Amount</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profitDetails?.length > 0 ? (
                            profitDetails
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
                                            <td>{item.plan_name.replace("DH Plan", "Leval")}</td>
                                            <td>{item.amount} USDT</td>
                                            <td>
                                                {new Date(item.Time).toLocaleString("en-IN", {
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
            </div>
        </>
    )
}

export default Tranfer