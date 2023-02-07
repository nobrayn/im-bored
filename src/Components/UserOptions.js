import { useState } from 'react';

const UserOptions = ({getData, showForm, setShowForm}) => {

  const [userTypeChoice, setUserTypeChoice] = useState('');
  const [userPriceChoice, setUserPriceChoice] = useState('');
  const [userNumberChoice, setUserNumberChoice] = useState('');
  const [disableNumberMenu, setDisableNumberMenu] = useState(false);


  const handleUserTypeChoice = (e) => {
    setUserTypeChoice(e.target.value)
    // the BoredAPI only has "solo" activities for these, so the number/people menu is set to "solo" and greyed out (logic below, in return statement)
    if (e.target.value === "relaxation" || e.target.value === "diy" || e.target.value === "charity" || e.target.value === "busywork") {
      setDisableNumberMenu(true);
      console.log(e.target.value)
    } else {
      setDisableNumberMenu(false)
      console.log(e.target.value)
    }
  }
  
  // FIX!


  // stretch goal: combine these into one function
  const handleUserPriceChoice = (e) => {
    setUserPriceChoice(e.target.value)
    console.log(e.target.value)
  }

  const handleUserNumberChoice = (e) => {
    setUserNumberChoice(e.target.value)
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // receiving props from App.js
    getData(userTypeChoice, userPriceChoice, userNumberChoice)
    // hide the form
    setShowForm(false);
  }

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
                {/* if disableNumberMenu is false/falsy, return the first expression which allows the user to select from the three options */}
                {!disableNumberMenu ? (
                  <select value={userNumberChoice} onChange={handleUserNumberChoice} name="people" id="people">
                    <option value="initial" defaultValue="initial">Any</option>
                    {/* solo: participants=1 */}
                    <option value="solo">Just you</option>
                    {/* duo: participants=2 */}
                    <option value="duo">You and a friend</option>
                    {/* group: minparticipants=3&maxparticipants=6 */}
                    <option value="group">You and some friends</option>
                  </select>
                  // if disableNumberMenu is true/truthy, return this expression which sets the value to "solo" and visually greys out the button while disallowing it click events with  pointerEvents being set to 'none'.
                ) : (
                  // 
                  <select value={userNumberChoice} style={{ color: 'grey', pointerEvents: 'none' }} name="people" id="people">
                    <option value="solo">Just you</option>
                  </select>
                )}
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