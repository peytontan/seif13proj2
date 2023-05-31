import React, { useState, useEffect } from 'react';
import {CSVLink} from 'react-csv'

const GoogleSheetCreate = () => {
    const [subRowData, setSubRowData] = useState([]) //sub accounts data
    const [mainRowData, setMainRowData] = useState([]) //main accounts data
    const [newAccountsToCreate, setNewAccountsToCreate] = useState(0); //to store the number of sub accunts to create
    const [newMainAccountsToCreate, setNewMainAccountsToCreate] = useState(0);//to store the number of main acocunts to create
    const [csvData,setCsvData] = useState([{}]) //filter out the accounts to create from subrowdata and store them in csvData so that it can be downloaded in csv
    const [csvMainData,setCsvMainData] = useState([{}]) //filter out the accoutns to create from mainrowdata and store them in csvData so that it can be downloaded in csv

    useEffect(()=>{
        fetchData();
    },[]) //nothing to monitor, as long as its mounted it should automatically retrieve, user shouldn't need to click on anything

    useEffect(()=>{
      handleSubDataSelection();
    },[subRowData]) //everytime subRowData is changed, then csvData should be updated (called using handleSubDataSelection)

    useEffect(()=>{
      handleMainDataSelection();
    },[mainRowData]) //everytime mainRowData is changed, then csvMainData should be updated (called using handleMainDataSelection)

  const fetchData = async () => {
    try {
      const spreadsheetId = '1cuI5E1E2tztbEJahLh5YtwdHScGLfOcLBRZZxLNWKF8';
      const range = 'New Accounts!A1:P100';
      const apiKey = 'AIzaSyDM_95PfKqrSNXNhjC8GH2xjUBNM_mEXwM'; 

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
      );

      if (response.ok) {//this means that the response is successful
        const data = await response.json();
        const values = data.values;

        if (values.length) {//if there are data extracted from the api 
          const filteredData = values.filter(row => !row[5]); //we are allowing looking for rows where the fifth column is empty
          setSubRowData(filteredData);
          setNewAccountsToCreate(filteredData.length) //count the number of empty rows and update the state
          const newOrExistingData = values.filter (row => row[1]==="New")
          setMainRowData(newOrExistingData) //set mainRowData to only contain rows that are indicated as new
          setNewMainAccountsToCreate(newOrExistingData.length) //count number of rows that are indicated new
        }
      } else {//if the response is not successful 
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function FilteredRows(props) { //this will be rendered in the app component 
    const { accountrow, type } = props; 

    return (
      <>
        <table className="filtered-rows-table">
          {type === "Sub" ? (
            <tbody>
              <tr>
                <th>No.</th>
                <th>Portfolio</th>
                <th>Custodian/Code</th>
                <th>{type} Account to create</th>
              </tr>
              {accountrow.map((row, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{row[4]}</td>
                  <td>{row[2] + "/" + row[3]}</td>
                  <td>{`test${row[0]}_${row[9]}-${row[3].toLowerCase()}-${row[4]}`}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>{type} Account to create</th>
              </tr>
              {accountrow.map((row, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{row[11]}</td>
                  <td>{`test${row[0]}_${row[9]}`}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </>
    );
  }

  const NumberOfAccountsToCreate = (props) => {
    const {sub,main} = props
    return (
      <div className="number-of-accounts-container">
        <h3>Summary:</h3>
        <p>Total number of new MAIN accounts to create: {main}</p>
        <p>Total number of new SUB accounts to create: {sub}</p>
      </div>
    );
  };
  
  const handleSubDataSelection = () => {
    // map select columns from subRowData into selectedData so that we can update it into csvData
    const selectedData = subRowData.map((row) => ({
      ActionType: "CreateSubAccount",
      ParentAccountCode: "test"+row[0]+"_"+row[9],
      CustodianCode: row[3].toLowerCase(),
      AccountCodeAppendix: row[4],
      DisplayName: row[11]+ " " + row[4],
      PartnerCode: "cchk",
    }));
  
    //update csvData state with a shallow copy of selectedData
    setCsvData([...selectedData]);
  };

  const handleMainDataSelection = () => {
    // map select columns from subRowData into selectedData so that we can update it into csvData
    const selectedMainData = mainRowData.map((row) => ({
      ActionType: "CreateMainAccount",
      ParentAccountCode: "test"+row[0]+"_"+row[9],
      DisplayName:row[11],
      BaseCurrencyCode:row[10],
      AccountType:"",
      AggregatedAccountCode:"",
      Email:"",
      Partner:"cchk",
      IsDemo:"",
      Password:"",
    }));
  
    //update csvData state with a shallow copy of selectedData
    setCsvMainData([...selectedMainData]);
  };

  
  return (
    <div className='button-container'>
      <NumberOfAccountsToCreate sub={newAccountsToCreate} main={newMainAccountsToCreate}/>
      <br/>
      <FilteredRows accountrow={mainRowData} type="Main" />
      <br/>
      <button className="button-green"><CSVLink data={csvMainData}>Download main account creation CSV</CSVLink></button>
      <br/>
      <br/>
      <FilteredRows accountrow={subRowData} type="Sub" />
      <br/>
      <button className="button-green"><CSVLink data={csvData}>Download sub account creation CSV</CSVLink></button>
    </div>
  );
};

export default GoogleSheetCreate;

