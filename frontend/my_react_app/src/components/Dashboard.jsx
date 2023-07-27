import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ResponsiveBar } from '@nivo/bar'
import Bar from './Bar';
import logoImage from './image/logo.png';
// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [franchises, setFranchises ] = useState([]);
  const [branches, setBranches ] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const bar = [
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
    // Add more branches as needed...
  ];
  
  const franchises1 = [
    { id: 1, name: "Franchise A" },
    { id: 2, name: "Franchise B" },
    // Add more franchises as needed...
  ];
  
  const branches1 = [
    { id: 1, name: "Branch 1", franchise_id: 1 },
    { id: 2, name: "Branch 2", franchise_id: 1 },
    { id: 3, name: "Branch 3", franchise_id: 2 },
    // Add more branches as needed...
  ];
  const calculateFranchiseProfitLoss = (franchiseId) => {
    const franchiseBranches = branches.filter((branch) => branch.franchise_id === franchiseId);
    const franchiseProfitLoss = franchiseBranches.reduce(
      (total, branch) => total + data.find((item) => item.branch_name === branch.name).profit_or_loss,
      0
    );
    return franchiseProfitLoss;
  };

  const franchiseData = franchises.map((franchise) => ({
    franchiseName: franchise.name,
    profitLoss: calculateFranchiseProfitLoss(franchise.id),
  }));
  
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const formattedStartDate = startDate ? new Date(startDate).toISOString().slice(0, 10) : '';
    const formattedEndDate = endDate ? new Date(endDate).toISOString().slice(0, 10) : '';

    try {
      const response = await axios.get('http://localhost:8000/api/dashboard_data/', {
        params: {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        },
      })
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataFren = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/franchises/');
      setFranchises(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/branches/');
      setBranches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    fetchDataFren();
  }, []);


  
  // Format the data for the Doughnut chart
  const chartData = {
    labels: data.map(item => item.branch_name),
    datasets: [
          {
            label: 'Sales',
            data: data.map(item => item.total_sales ),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#E7E9ED'],
          },
        ],
  }

  const exChartData = {
    labels: data.map(item => item.branch_name),
    datasets: [
          {
            label: 'Expenses',
            data: data.map(item =>  item.total_expenses),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#E7E9ED'],
          },
        ],
      };

      
      const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          fontSize: 20, // Adjust font size as needed
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            const label = context.parsed.x;
            
            if (value !== null && value !== undefined)
            
            
            return ` ${label}: ${value }`;
            

          },
        },
        },
      }, // Adjust this value to control the aspect ratio of the chart (width/height)

    };
      
    

  return (
    <>
      {/* <Sidebar>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? '#f5d9ff' : '#d359ff',
                  backgroundColor: active ? '#eecef9' : undefined,
                };
            },
          }}
        >
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar> */}

<Bar/>
      <div className="container">
        <h2>Dashboard</h2>
        <div className="row">
          <div className="col-md-6">
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={fetchData}>
          Fetch Data
        </button>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Branch Name</th>
              <th>Total Sales</th>
              <th>Total Expenses</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.branch_name}</td>
                <td>{item.total_sales}</td>
                <td>{item.total_expenses}</td>
                <td>{item.profit_or_loss}</td>
              </tr>
              
            ))}
          </tbody>
        </table>

        <div className='table mt-4'>
          <h4>List of Franchises:</h4>
          <ul>
            {franchises.map((franchise) => (
              <li key={franchise.id}>{franchise.name}</li>
            ))}
          </ul>
          <h4>List of Branches:</h4>
          <ul>
            {branches.map((branch) => (
              <li key={branch.id}>{branch.name}</li>
            ))}
          </ul>
        </div>
      <div className='chart1'>
        <div  style={{ flex: 1, margin: '10px' }}>
          <h2>Sales</h2>
          <Doughnut data={chartData} options={chartOptions}   />
        </div>

        <div  style={{ flex: 1, margin: '10px' }}>
          <h2>Expenses</h2>
          <Doughnut data={exChartData} options={chartOptions}  />
          
        </div>
        
      </div>
      </div>
    </>
    );
};

export default Dashboard;

