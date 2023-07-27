import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [franchiseData, setFranchiseData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

//handleChange function
// const handleChange = (e,index)=>{
//     console.log(e);
//     const {name, value}=e.target;
//     const frn = [...franchiseData];
//     const brn = [...branchData];
//     const sal = [...salesData];
//     const exp = [...expensesData];
//     frn[index][name]=value;
//     brn[index][name]=value;
//     sal[index][name]=value;
//     exp[index][name]=value;
//     setFranchiseData(frn);
//     setBranchData(brn);
//     setSalesData(sal);
//     setExpensesData(exp);
//     console.log(frn,brn,sal,exp);
// }

const handleFranchiseChange = (e,index) => {
    console.log(e);
    const {name, value}= e.target;
    const list = [...franchiseData];
    list[index][name]=value;
    setFranchiseData(list);
    console.log(list);
}
// onChange={(e) => handleChange(e,index)} 

// const handleFranchiseChange = (e,index) => {
//     const { name, value } = e.target;
//     setNewFranchise((prevFranchise) => ({
//       ...prevFranchise,
//       [name]: value,
//     }));
 
  
  const handleBranchChange = (e,index) => {
    const { name, value } = e.target;
    const list = [...branchData];
    list[index][name]=value;
    setBranchData(list);
    console.log(list);
    };
  
  const handleSaleChange = (e,index) => {
    const { name, value } = e.target;
    const list = [...salesData];
    list[index][name]=value;
    setSalesData(list);
    console.log(list);
    };

  
  const handleExpenseChange = (e,index) => {
    const { name, value } = e.target;
    const list = [...expensesData];
    list[index][name]=value;
    setExpensesData(list);
    console.log(list);
  };


  const [newFranchise, setNewFranchise] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    logo: '',
  });

  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    logo: '',
    franchise: null,
  });

  const [newSale, setNewSale] = useState({
    date: null,
    amount: null,
    branch: null,
  });

  const [newExpense, setNewExpense] = useState({
    date: null,
    amount: null,
    branch: null,
  });

  useEffect(() => {
    fetchFranchises();
    fetchBranches();
    fetchSales();
    fetchExpenses();
  }, []);

  const fetchFranchises = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/franchises/');
      setFranchiseData(response.data);
    } catch (error) {
      console.error('Error fetching franchises:', error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/branches/');
      setBranchData(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const addFranchise = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/franchises/', newFranchise);
      setNewFranchise({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        logo: '',
      });
      fetchFranchises();
    } catch (error) {
      console.error('Error adding franchise:', error);
    }
  };

  const addBranch = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/branches/', newBranch);
      setNewBranch({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        logo: '',
        franchise: null,
      });
      fetchBranches();
    } catch (error) {
      console.error('Error adding branch:', error);
    }
  };

  const deleteFranchise = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/franchises/${id}/`);
      fetchFranchises();
    } catch (error) {
      console.error('Error deleting franchise:', error);
    }
  };

  const deleteBranch = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/branches/${id}/`);
      fetchBranches();
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };


  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sales/');
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/expenses/');
      setExpensesData(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const addSale = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/sales/', newSale);
      setNewSale({
        date: null,
        amount: null,
        branch: null,
      });
      fetchSales();
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/expenses/', newExpense);
      setNewExpense({
        date: null,
        amount: null,
        branch: null,
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
  const updateFranchise = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/franchises/${selectedFranchise.id}/`, selectedFranchise);
    //   setSelectedFranchise(null);
      fetchFranchises();
    } catch (error) {
      console.error('Error updating franchise:', error);
    }
  };

  const updateBranch = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/branches/${selectedBranch.id}/`, selectedBranch);
    //   setSelectedBranch(null);
      fetchBranches();
    } catch (error) {
      console.error('Error updating branch:', error);
    }
  };

  const updateSale = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/sales/${selectedSale.id}/`, selectedSale);
    //   setSelectedSale(null);
      fetchSales();
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const updateExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/expenses/${selectedExpense.id}/`, selectedExpense);
    //   setSelectedExpense(null);
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const deleteSale = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/sales/${id}/`);
      fetchSales();
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/expenses/${id}/`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };



  // Other CRUD functions for branches, sales, expenses, etc.

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Franchise Management</h2>
        <form onSubmit={addFranchise} className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newFranchise.name}
              onChange={(e) => setNewFranchise({ ...newFranchise, name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={newFranchise.address}
              onChange={(e) => setNewFranchise({ ...newFranchise, address: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={newFranchise.phone}
              onChange={(e) => setNewFranchise({ ...newFranchise, phone: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={newFranchise.email}
              onChange={(e) => setNewFranchise({ ...newFranchise, email: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Website"
              value={newFranchise.website}
              onChange={(e) => setNewFranchise({ ...newFranchise, website: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Logo"
              value={newFranchise.logo}
              onChange={(e) => setNewFranchise({ ...newFranchise, logo: e.target.value })}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Add Franchise</button>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <h2>Branch Management</h2>
        <form onSubmit={addBranch} className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newBranch.name}
              onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={newBranch.address}
              onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={newBranch.phone}
              onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={newBranch.email}
              onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Website"
              value={newBranch.website}
              onChange={(e) => setNewBranch({ ...newBranch, website: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Logo"
              value={newBranch.logo}
              onChange={(e) => setNewBranch({ ...newBranch, logo: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <select
            name='franchise'
              className="form-select"
              value={newBranch.franchise || ''}
              onChange={(e) => setNewBranch({ ...newBranch, franchise: e.target.value })}
            >
              <option value="" disabled>
                Select a franchise
              </option>
              {franchiseData.map((franchise) => (
                <option key={franchise.id} value={franchise.id}>
                  {franchise.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Add Branch</button>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <h2>Franchises</h2>
        <ul>
      {franchiseData.map((franchise,index) => (
        <li key={franchise.id} className="d-flex align-items-center justify-content-between">
          {selectedFranchise === franchise ? (
            <form onSubmit={updateFranchise} className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  name='name'
                  className="form-control"
                  value={selectedFranchise.name}
                  onChange={(e) =>handleFranchiseChange(e,index)}                  />
                  {/* onChange={(e) => handleChange(e,index)}  */}
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  name='address'
                  className="form-control"
                  value={selectedFranchise.address}
                  onChange={(e) =>handleFranchiseChange(e,index)}                />
              </div>
                <div className="col-md-4">
                <input
                    type="text"
                    name='phone'
                    className="form-control"
                    value={selectedFranchise.phone}
                    onChange={(e) =>handleFranchiseChange(e,index)}                />
                </div>
                <div className="col-md-4">
                <input
                    type="text"
                    name='email'
                    className="form-control"
                    value={selectedFranchise.email}
                    onChange={(e) =>handleFranchiseChange(e,index)}                />
                </div>
                <div className="col-md-4">
                <input
                    type="text"
                    name='website'
                    className="form-control"
                    value={selectedFranchise.website}
                    onChange={(e) =>handleFranchiseChange(e,index)}                />
                </div>
                <div className="col-md-4">
                <input
                    type="text"
                    name='logo'
                    className="form-control"
                    value={selectedFranchise.logo}
                    onChange={(e) =>handleFranchiseChange(e,index)} 
                />              
                 </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary me-2">Update</button>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedFranchise(null)}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <p>{franchise.name}</p>
              <div>
                <button onClick={() => setSelectedFranchise(franchise)} className="btn btn-primary me-2">Edit</button>
                <button onClick={() => deleteFranchise(franchise.id)} className="btn btn-danger">Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
      </div>

      <div className="mb-4">
        <h2>Branches</h2>
        <ul>
          {branchData.map((branch, index) => (
            <li key={branch.id} className="d-flex align-items-center justify-content-between">
                {selectedBranch === branch ? (
                    <form onSubmit={updateBranch} className="row g-3">
                        <div className="col-md-4">
                            <input
                                type="text"
                                name='name'
                                className="form-control"
                                value={selectedBranch.name}
                                onChange={(e) =>handleBranchChange(e,index)}                                  />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                name='address'
                                className="form-control"
                                value={selectedBranch.address}
                                onChange={(e) =>handleBranchChange(e,index)}                             />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                name='phone'
                                className="form-control"
                                value={selectedBranch.phone}
                                onChange={(e) =>handleBranchChange(e,index)}                             />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                name='email'
                                className="form-control"
                                value={selectedBranch.email}
                                onChange={(e) =>handleBranchChange(e,index)}                             />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                name='website'
                                className="form-control"
                                value={selectedBranch.website}
                                onChange={(e) =>handleBranchChange(e,index)}                             />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                name='logo'
                                className="form-control"
                                value={selectedBranch.logo}
                                onChange={(e) =>handleBranchChange(e,index)}                             />
                        </div>
                        <div className="col-md-4">
                            <select
                                name='franchise'
                                className="form-select"
                                value={selectedBranch.franchise || ''}
                                onChange={(e) =>handleBranchChange(e,index)}                             >
                                <option value="" disabled>
                                    Select a franchise
                                </option>
                                {franchiseData.map((franchise) => (
                                    <option key={franchise.id} value={franchise.id}>
                                        {franchise.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary me-2">Update</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setSelectedBranch(null)}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p>{branch.name}</p>
                        <div>
                            <button onClick={() => setSelectedBranch(branch)} className="btn btn-primary me-2">Edit</button>
                            <button onClick={() => deleteBranch(branch.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </>
                )}
            </li>
            ))}
        </ul>
        </div>

   


      <div className="mb-4">
        <h2>Sales Management</h2>
        <form onSubmit={addSale} className="row g-3">
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              value={newSale.date}
              onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={newSale.amount}
              onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={newSale.branch || ''}
              onChange={(e) => setNewSale({ ...newSale, branch: e.target.value })}
            >
              <option value="" disabled>
                Select a branch
              </option>
              {branchData.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Add Sale</button>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <h2>Expenses Management</h2>
        <form onSubmit={addExpense} className="row g-3">
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={newExpense.branch || ''}
              onChange={(e) => setNewExpense({ ...newExpense, branch: e.target.value })}
            >
              <option value="" disabled>
                Select a branch
              </option>
              {branchData.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Add Expense</button>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <h2>Sales</h2>
        <ul>
          {salesData.map((sale,index) => (
            <li key={sale.id} className="d-flex align-items-center justify-content-between">
                {selectedSale === sale ? (
                    <form onSubmit={updateSale} className="row g-3">
                        <div className="col-md-4">
                            <input
                                type="date"
                                name='date'
                                className="form-control"
                                value={selectedSale.date}
                                // onChange={(e) => setSalesData({ ...salesData, date: e.target.value })}
                                onChange={(e) =>handleSaleChange(e,index)} // this is the change
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="number"
                                name='amount'
                                className="form-control"
                                value={selectedSale.amount}
                                onChange={(e) =>handleSaleChange(e,index)}
                                // onChange={(e) => setSalesData({ ...selectedSale, amount: e.target.value })}
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                name='branch'
                                className="form-select"
                                value={selectedSale.branch || ''}
                                onChange={(e) =>handleSaleChange(e,index)}                            >
                                <option value="" disabled>
                                    Select a branch
                                </option>
                                {branchData.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary me-2">Update</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setSelectedSale(null)}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>

        <table className="table mt-4">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Branch Id</th>
            </tr>
          </thead>
          <tbody>
            
              <tr >
                <td>{sale.amount}</td>
                <td>{sale.date}</td>
                <td>{sale.branch}</td>
              </tr>
           
          </tbody>
        </table>


                       
                        <div>
                            <button onClick={() => setSelectedSale(sale)} className="btn btn-primary me-2">Edit</button>
                            <button onClick={() => deleteSale(sale.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </>
                )}
            </li>
            ))}
        </ul>
        </div>


      <div className="mb-4">
        <h2>Expenses</h2>
        <ul>
          {expensesData.map((expense,index) => (
            <li key={expense.id} className="d-flex align-items-center justify-content-between">
                {selectedExpense === expense ? (
                    <form onSubmit={updateExpense} className="row g-3">
                        <div className="col-md-4">
                            <input
                                type="date"
                                name='date'
                                className="form-control"
                                value={selectedExpense.date}
                                onChange={(e) =>handleExpenseChange(e,index)} />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="number"
                                name='amount'
                                className="form-control"
                                value={selectedExpense.amount}
                                onChange={(e) =>handleExpenseChange(e,index)}
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                name='branch'
                                className="form-select"
                                value={selectedExpense.branch || ''}
                                onChange={(e) =>handleExpenseChange(e,index)}
                            >
                                <option value="" disabled>
                                    Select a branch
                                </option>
                                {branchData.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary me-2">Update</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setSelectedExpense(null)}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>


<table className="table mt-4">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Branch Id</th>
            </tr>
          </thead>
          <tbody>
            
              <tr >
                <td>-{expense.amount}</td>
                <td>{expense.date}</td>
                <td>{expense.branch}</td>
              </tr>
           
          </tbody>
        </table>


                    
                        <div>
                        
                           


                            <button onClick={() => setSelectedExpense(expense)} className="btn btn-primary me-2">Edit</button>
                            <button onClick={() => deleteExpense(expense.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </>
                )}
            </li>
            ))}
        </ul>
        </div>
    </div>

  );
};

export default AdminPanel;
