import { useState } from 'react';

const UserOptions = ({getData}) => {

  const [userTypeChoice, setUserTypeChoice] = useState('');
  const [userPriceChoice, setUserPriceChoice] = useState('');
  const [userNumberChoice, setUserNumberChoice] = useState('');
  const [showForm, setShowForm] = useState(true);


  // stretch goal: combine these into one function
  const handleUserTypeChoice = (e) => {
    setUserTypeChoice(e.target.value)
  }

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

  console.log(setUserTypeChoice)
  return (
    showForm && (
    <section>
      <div className="App">
        <h1>Need something to do?</h1>
        <h2>Narrow it down, or go with "Any"!</h2>
        <form onSubmit={handleSubmit} action="" className="userSelects">
          <div className="formContainer">
            <div className="block">
              <label htmlFor="activityType">What type of activity?</label>
              <select value={userTypeChoice} onChange={handleUserTypeChoice} id="activityType" name="activityType">
                <option value="initial" defaultValue="initial">Any</option>
                <option value="education">Education</option>
                <option value="recreational">Recreational</option>
                <option value="social">Social</option>
                <option value="cooking">Cooking</option>
                <option value="music">Music</option>
                {/* the following four options, when selected, must disable the people select/set it to 1 */}
                <option value="relaxation">Relaxation</option>
                <option value="diy">DIY</option>
                <option value="charity">Charity</option>
                <option value="busywork">Busywork</option>
              </select>
            </div> {/* end of block */}

            <div className="block">
              <label htmlFor="priceRange">What's your price range?</label>
              <select value={userPriceChoice} onChange={handleUserPriceChoice} name="priceRange" id="priceRange">
                <option value="initial" defaultValue="initial">Any</option>
                {/* free: price=0 */}
                <option value="free">Free</option>
                {/* cheap: minprice=0.1&maxprice=0.4 */}
                <option value="cheap">Cheap</option>
                {/* not so cheap: minprice=0.5&maxprice=1 */}
                <option value="notCheap">Not so cheap</option>
              </select>
            </div> {/* end of block */}

            <div className="block">
              <label htmlFor="people">How many people?</label>
              <select value={userNumberChoice} onChange={handleUserNumberChoice} name="people" id="people">
                <option value="initial" defaultValue="initial">Any</option>
                {/* solo: participants=1 */}
                <option value="solo">Just you</option>
                {/* duo: participants=2 */}
                <option value="duo">You and a friend</option>
                {/* group: minparticipants=3&maxparticipants=6 */}
                <option value="group">You and some friends</option>
              </select>
            </div> {/* end of block */}
          </div> {/* end of formContainer */}

          <button className="submit">Submit</button>
        </form>
      </div>
    </section>
    )
  )
}

export default UserOptions;