import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {

  // Querying boredAPI
    // Currently is returning random "receational" type
  // useEffect(() => {
  //   // query boredAPI
  //   const fetchData = async () => {
  //     // construct base URL
  //     const url = new URL('http://www.boredapi.com/api/activity?');
  //     // adding chosen parameters
  //     url.search = new URLSearchParams({
  //       type: 'recreational',
  //     });

  //     // try/catch for error handling
  //     try {
  //       const data = await axios.get(url);
  //       // console.log(data.data.activity)
  //       const response = (data.data.activity);
  //       console.log(response)
  //     } catch (error) {
  //       // err handle
  //       console.log('error, dingus')
  //     }
  //   }
  //   fetchData();

  // }, [])

  return (
    <div className="App">
      <h1>Need something to do?</h1>
      <h2>Narrow it down, or go with "Any"!</h2>
        <form action="" className="userSelects">
          <div className="formContainer">
            <div className="formLeft">
              <label htmlFor="activityType">What type of activity?</label>
              <label htmlFor="priceRange">What's your price range?</label>
              <label htmlFor="people">How many people?</label>
            </div>

            <div className="formRight">
              <div className="block">
                <select name="activityType" id="activityType">
                  <option value="initial" selected>Any</option>
                  <option value="education">Education</option>
                  <option value="recreational">Recreational</option>
                  <option value="social">Social</option>
                  <option value="diy">DIY</option>
                  <option value="charity">Charity</option>
                  <option value="cooking">Cooking</option>
                  <option value="music">Music</option>
                  <option value="busywork">Busywork</option>
                </select>
              </div>
              
              <div className="block">
                <select name="priceRange" id="priceRange">
                  <option value="initial" selected>Any</option>
                  <option value="free">Free</option>
                  <option value="cheap">Cheap</option>
                  <option value="notCheap">Not so cheap</option>
                </select>
              </div>

              <div className="block">
                <select name="people" id="people">
                  <option value="initial" selected>Any</option>
                  <option value="solo">Just you</option>
                  <option value="duo">You and a friend</option>
                  <option value="group">You and some friends</option>
                </select>
              </div>
            </div> {/* end of formRight */}
          </div> {/* end of formContainer */}

          <button className="submit">Submit</button>
        </form>
    </div>
  );
}

export default App;
