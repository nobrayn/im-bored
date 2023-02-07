import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// components
import UserOptions from './Components/UserOptions';

// stylesheet
import './App.css'

function App() {
  const [boredResponse, setBoredResponse] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [userTypeChoice, setUserTypeChoice] = useState('');
  const [userPriceChoice, setUserPriceChoice] = useState('');
  const [userNumberChoice, setUserNumberChoice] = useState('');
  const [disableNumberMenu, setDisableNumberMenu] = useState(false);


  const handleUserTypeChoice = (e) => {
    setUserTypeChoice(e.target.value)
    // the BoredAPI only has "solo" activities for these, so the number/people menu is set to "solo" and greyed out (logic below, in return statement)
    if (e.target.value === "relaxation" || e.target.value === "diy" || e.target.value === "charity" || e.target.value === "busywork") {
      setDisableNumberMenu(true);
      setUserNumberChoice("solo")
    } else {
      setDisableNumberMenu(false)
    }
  }

  // stretch goal: combine these into one function
  const handleUserPriceChoice = (e) => {
    setUserPriceChoice(e.target.value)
  }

  const handleUserNumberChoice = (e) => {
    setUserNumberChoice(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // receiving props from App.js
    getData(userTypeChoice, userPriceChoice, userNumberChoice)
    // hide the form
    setShowForm(false);
  }

  // props for UserOptions
  const getData = async (activity, price, people) => {
    let minPrice = 0
    let maxPrice = 0
    let minParticipants = 1
    let maxParticipants = 1

    // price
    if (price === 'cheap') {
      minPrice = 0.1
      maxPrice = 0.2
    }
    if (price === 'notCheap') {
      minPrice = 0.3
      maxPrice = 1
    }

    // participants
    if (people === 'duo') {
      minParticipants = 2
      maxParticipants = 2
    }
    if (people === 'group') {
      minParticipants = 3
      maxParticipants = 6
    }

    // boredAPI
    // construct base URL
    const url = new URL('https://www.boredapi.com/api/activity?');
    // adding chosen parameters
    url.search = new URLSearchParams({
      type: activity,
      minprice: minPrice,
      maxprice: maxPrice,
      minparticipants: minParticipants,
      maxparticipants: maxParticipants
    });
    // try/catch for error handling
    try {
      const response = await axios.get(url);
      setBoredResponse(response.data.activity);
      if (response.data.error) {
        // sweet alerts npm package
        swal({
          icon: 'error',
          text: 'No activities available with chosen parameters. Please try another combination.'
        }).then(() => {
          handleStartOverAlert()
        })
      };

    } catch (error) {
      // error handle
      swal({
        icon: 'error',
        text: 'Something went horribly awry. Please try again. And if you see this again, try something very different. If you still see this, I have failed you.'
      }).then(() => {
        handleStartOverAlert()
      })
    }
  }

  const handleStartOverAlert = () => {
    setShowForm(showForm);
    setUserTypeChoice('');
    setUserPriceChoice('');
    setUserNumberChoice('');
    setDisableNumberMenu(false);
  }

  const handleStartOver = () => {
    setShowForm(!showForm);
    setUserTypeChoice('');
    setUserPriceChoice('');
    setUserNumberChoice('');
    setDisableNumberMenu(false);
  }

  return (
    <div>
      {/* passing props to UserOptions */}
      <UserOptions
        getData={getData}
        showForm={showForm}
        setShowForm={setShowForm}
        handleUserTypeChoice={handleUserTypeChoice}
        handleUserPriceChoice={handleUserPriceChoice}
        handleUserNumberChoice={handleUserNumberChoice}
        handleSubmit={handleSubmit}
        userTypeChoice={userTypeChoice}
        userPriceChoice={userPriceChoice}
        userNumberChoice={userNumberChoice}
        disableNumberMenu={disableNumberMenu}
      />

      {
        !showForm && (
          <div className='results'>
            <h1>Why don't you try and...</h1>
            <h3>{boredResponse}</h3>
            <h4>Not for you? Try again with the same parameters
              or start over from the beginning!</h4>
            <div className="resetButtons">
            <button
              className='tryAgain'
              onClick={() => getData(userTypeChoice, userPriceChoice, userNumberChoice)}>Try again?</button>
            {/* change showForm from false to true, reset values in form */}
            <button
              className='startOver'
              onClick={handleStartOver}>Start over?</button>
            </div> 
          </div>
        )}
    </div>
  );
}


export default App;