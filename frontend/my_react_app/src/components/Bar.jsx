import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ResponsiveBar } from "@nivo/bar";


const Bar = () => {

  const data = [
    {
      branch_name: "Branch 1",
      total_sales: 1000,
      total_expenses: 500,
      profit_or_loss: 500,
    },
    {
      branch_name: "Branch 2",
      total_sales: 2000,
      total_expenses: 1000,
      profit_or_loss: 1000,
    },
  ];
  
  const franchises = [
    { id: 1, name: "Franchise A" },
    { id: 2, name: "Franchise B" },
  ];
  
  const branches = [
    { id: 1, name: "Branch 1", franchise_id: 1 },
    { id: 2, name: "Branch 2", franchise_id: 1 },
    { id: 3, name: "Branch 3", franchise_id: 2 },
  ];
  

  const calculateFranchiseProfitLoss = (franchiseId) => {
    const franchiseBranches = branches.filter((branch) => branch.franchise_id === franchiseId);
    const franchiseProfitLoss = franchiseBranches.reduce((total, branch) => {
      const branchData = data.find((item) => item.branch_name === branch.name);
      if (branchData && typeof branchData.profit_or_loss === "number") {
        return total + branchData.profit_or_loss;
      }
      return total;
    }, 0);
    return franchiseProfitLoss;
  };
  console.log(calculateFranchiseProfitLoss(1));

  
  const franchiseData = franchises.map((franchise) => ({
    franchiseName: franchise.name,
    profitLoss: calculateFranchiseProfitLoss(franchise.id),
  }));
  console.log(franchiseData);

  return (
    <>
    <ResponsiveBar
      data={franchiseData}
      keys={["profitLoss"]}
      indexBy="franchiseName"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      colors="#3182CE"
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Profit/Loss",
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
    </>
  );
};

export default Bar;