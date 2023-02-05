import { useEffect, useState } from 'react';
import axios from 'axios';

// components
import UserOptions from './Components/UserOptions';

import './App.css'

function App() {
  const [response, setResponse] = useState('');

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
      const data = await axios.get(url);
      setResponse(data.data.activity);
    } catch (error) {
      // err handle
      console.log('error, dingus')
    }
  }

  return (
    <div>
      {/* passing props to UserOptions */}
      <UserOptions getData={getData}/>
      <div>
        <h2>Why don't you try and...</h2>
        <h3>{response}</h3>
        <button className='again' onClick={'fart'}>Try again?</button>
      </div>
    </div>
  );
}


export default App;