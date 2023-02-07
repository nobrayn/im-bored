import { useEffect, useState } from 'react';
import axios from 'axios';

// components
import UserOptions from './Components/UserOptions';

// stylesheet
import './App.css'

function App() {
  const [boredResponse, setBoredResponse] = useState('');
  const [showForm, setShowForm] = useState(true);

  // props for UserOptions
  const getData = async (activity, price, people) => {
    let minPrice = 0
    let maxPrice = 0
    let minParticipants = 1
    let maxParticipants = 1

    // price
    if (price === 'cheap') {
      minPrice = 0.1
      maxPrice = 0.4
    }
    if (price === 'notCheap') {
      minPrice = 0.5
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
    const url = new URL('http://www.boredapi.com/api/activity?');
    // adding chosen parameters
    url.search = new URLSearchParams({
      type: activity,
      minprice: minPrice,
      maxprice: maxPrice,
      minparticipants: minParticipants,
      maxparticipants: maxParticipants
    });
    // console.log(url)
    // try/catch for error handling
    try {
      const response = await axios.get(url);
      setBoredResponse(response.data.activity);
      if (response.data.error) {
        // add some stateful message
        // sweet alerts npm package
        alert('No activities available with chosen parameters. Please try another combo.')
      }

    } catch (error) {
      // error handle
      // console.log(error);
      alert('Something went horribly awry. Please try again. And if you see this again, try something very different. If you still see this, I have failed you.')
    }
  }

  return (
    <div>
      {/* passing props to UserOptions */}
      <UserOptions
        getData={ getData }
        showForm={ showForm }
        setShowForm={ setShowForm }
      />

      {
      !showForm && (
      <div>
        <h2>Why don't you try and...</h2>
        <h3>{boredResponse}</h3>
        {/* <button className='again' onClick={}>Try again?</button> */}
      </div>
      )}
    </div>
  );
}


export default App;