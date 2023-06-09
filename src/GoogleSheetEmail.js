import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const GoogleSheetSearchData = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();


  const handleSearchInput = event => {
    setSearchInput(event.target.value);
  };

  const fetchData = async () => { //not using useEffect toigehter with this because we only want to get the data when we click on the button
    try {
      const spreadsheetId = '1cuI5E1E2tztbEJahLh5YtwdHScGLfOcLBRZZxLNWKF8';
      const range = 'Accounts!A1:D100';
      const apiKey = 'AIzaSyDM_95PfKqrSNXNhjC8GH2xjUBNM_mEXwM'; 

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
      );

      if (response.ok) {//this means that the response is successful
        const data = await response.json();
        const values = data.values;

        if (values.length) {//if there are data extracted from the api 
          const filteredData = values.filter(row => row.includes(searchInput)); //this is filtering for the row that contains what we are searching for when we click on search that is handled by handleSearchInput
          setSearchResult(filteredData); //update the searchResult to the filtered data where it contains empty rows
          setSearchPerformed(true) //we need to set the action to true because when we click on the button, fetchData will be triggered
        }
      } else {//if the response from the api is not successful 
        console.error('Error fetching data:', response.status);
      }
    } catch (error) { //if error occurs during fetchData, then it will help to log into the console
      console.error('Error fetching data:', error);
    }
  };


  const handleButtonClick = () => {
      navigate(`/copy-html-text/${searchInput}`);
    };


  function SearchInfo(props) {
    const { searchinformation } = props;
    if (searchPerformed && searchResult.length===0){
      return (
        <div>
        No Match Found
        </div>
      )
    } 
    return (
      <div>
        {searchinformation.map((row, index) => (
          <ul key={index}>
            <li>Client: {row[0]}</li>
            <li>Email: {row[2]}</li>
            <li>Env: {row[3]}</li>
          </ul>
        ))}
          {searchResult.length > 0 && ( 
                <div className='email-container'>
          <button className="button-green" onClick={handleButtonClick}>Get HTML text</button></div>
        )} {/* ensure that only when there is data, the button will appear*/}
      </div>
    );
  }

  return (
    <div className='email-container'>
    <div className='email-input-container'>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInput}
        placeholder="Input ID"
      />
      <button className="button-green" onClick={fetchData}>Search</button>
    </div>
      <SearchInfo searchinformation={searchResult} />
    </div>
  );
};

export default GoogleSheetSearchData;

