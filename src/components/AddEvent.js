import React, { useState } from "react";
import { ethers } from "ethers";

import BetOracleABI from "../abis/BetOracle.json";

export default function AddEvent() {
  const [Category, setcat] = useState();
  const [teamA, setTeamA] = useState();
  const [teamB, setTeamB] = useState();
  const [date, setdate] = useState();

  const BetOracleContractAddress =
    process.env.REACT_APP_BetOracle_CONTRACT_ADDRESS;
  
  const KovanTime = 900

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const handleSubmit=async(Category,teamA,teamB,date)=>{
      console.log("submit")
      const betOracleContract = new ethers.Contract(
        BetOracleContractAddress,
        BetOracleABI,
        signer
      );
      var today = new Date();
      var todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      var diff = Math.abs(new Date(date) - new Date(todayDate));
      var diffHours = Math.ceil(diff / (1000 * 3600));
      var currentblocknumber = await provider.getBlockNumber();
      var newBlocknum = currentblocknumber + diffHours*KovanTime;
      const res = await betOracleContract.addSportEvent(Category,teamA,teamB,newBlocknum)
  }
  return (
    <div>
      <br />
      <h3>Add Event</h3>
      <div
        className="form-group container"
        style={{ border: "1px solid black" }}
      >
        <form>
          <label for="exampleInputEmail1">Category Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter category name"
            onChange={(e) => {
              setcat(e.target.value);
            }}
          />
          <label for="TeamA">Team A Name</label>
          <input
            type="text"
            class="form-control"
            id="TeamA"
            aria-describedby="emailHelp"
            placeholder="Enter team A name"
            onChange={(e) => {
                setTeamA(e.target.value);
              }}
          />
          <label for="TeamB">Team B Name</label>
          <input
            type="text"
            class="form-control"
            id="TeamB"
            aria-describedby="emailHelp"
            placeholder="Enter team B name"
            onChange={(e) => {
                setTeamB(e.target.value);
              }}
          />
          <label for="Date">Date</label>
          <input
            type="Date"
            class="form-control"
            id="TeamB"
            aria-describedby="emailHelp"
            placeholder="Enter date"
            onChange={(e) => {
                setdate(e.target.value);
              }}
          />
           

        </form>
        <br />
          <button type="submit" className="btn btn-primary" onClick={()=>{handleSubmit(Category,teamA,teamB,date)}}>Add</button>
        <br />
        <br />
      </div>
      {console.log("add Event")}
    </div>
  );
}