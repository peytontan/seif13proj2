import React, { useState, useEffect } from 'react';
import {CSVLink} from 'react-csv'

const GoogleSheetCreate = () => {
    const [rowData, setRowData] = useState([])
    const [newAccountsToCreate, setNewAccountsToCreate] = useState(0);
    const [csvData,setCsvData] = useState([{"ActionType":"","ParentAccountCode":"","CustodianCode":"","AccountCodeAppendix":"","DisplayName":"","PartnerCode":""}])

    useEffect(()=>{
        fetchData();
    },[]) //nothing to monitor, as long as its mounted it should automatically retrieve, user shouldn't need to click on anything

    useEffect(()=>{
      handleDataSelection();
    },[rowData]) //everytime rowData is changed, then csvData should be updated (called using handleDataSelection)

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
          setRowData(filteredData);
          setNewAccountsToCreate(filteredData.length) //count the number of empty rows and update the state
        }
      } else {//if the response is not successful 
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function FilteredRows(props) { //this will be rendered in the app component 
    const { accountrow } = props;
    return (
            <>
          <tr>
            <th>Portfolio</th>
            <th>Custodian/Code</th>
            <th>Account to create</th>
          </tr>
        {accountrow.map((row, index) => (
          <tr>
            <td>{row[4]}</td>
            <td>{row[2] +"/"+ row[3]}</td>
            <td>{'test'+row[0]+"-"+row[3].toLowerCase()+"-"+row[4]}</td>
          </tr>
        ))}
        </>
    );
  }

  const NumberOfAccountsToCreate = (props) => {
    return (
      <div>
        <h1>Total number of new accounts to create: {props.count}</h1>
      </div>
    );
  };
  
  const handleDataSelection = () => {
    // map select columns from rowData into selectedData so that we can update it into csvData
    const selectedData = rowData.map((row) => ({
      ActionType: "CreateChildAccount",
      ParentAccountCode: "test"+row[0],
      CustodianCode: row[3].toLowerCase(),
      AccountCodeAppendix: row[4],
      DisplayName: row[2]+ " " + row[4],
      PartnerCode: "capitalcompany",
    }));
  
    //update csvData state with a shallow copy of selectedData
    setCsvData([...selectedData]);
  };
  
  return (
    <div>
      <NumberOfAccountsToCreate count={newAccountsToCreate}/>
      <FilteredRows accountrow={rowData} />
      <button><CSVLink data={csvData}>Download CSV</CSVLink></button>;
    </div>
  );
};

export default GoogleSheetCreate;

