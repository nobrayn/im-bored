const CrtMode = ({ showStyling, setShowStyling }) => (
  <button onClick={(e) => {
    e.preventDefault();
    setShowStyling(!showStyling);
  }}>Toggle Style</button>
);

export default CrtMode;
