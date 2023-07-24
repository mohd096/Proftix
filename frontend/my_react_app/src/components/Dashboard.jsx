import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import logoImage from './image/logo.png';
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard_data/');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };



    // Format the data for the Doughnut chart
    const chartData = {
        labels: data.map(item => item.branch_name),
        datasets: [
          {
            label: 'Sales',
            data: data.map(item => item.total_sales ),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#E7E9ED'],
          },
          {
            label: 'Expenses',
            data: data.map(item =>  item.total_expenses),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#E7E9ED'],
          },
        ],
      };

    const chartWidth = 400; 
    const chartHeight = 300;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
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
      },
    };
      

  return (
    <div>
        <a href="/">
        <img src={logoImage} alt="Proftix" style={{ width: '200px', height: 'auto' }} />
      </a>
      <h2>Dashboard</h2>

      <table>
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
      <div>     
         <Doughnut data={chartData}  options={chartOptions} width={chartWidth} height={chartHeight}/>
        </div>
    </div>
    
  );
};

export default Dashboard;
