import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const url = 'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=true&api_key=live_BJVgNYAMY5fEyfvh7qEU8HDJpz1v69DjFF8QOGFG8uxPROnlfzXrBiINQm6pg7Qb';
  const [currentImage, setCurrentImage] = useState(null);
  const [cats, setCats] = useState([]); //just to check if it really fetches info (loop over)
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [banning, setBanning] = useState([]);

  const [inputs, setInputs] = useState({
    url: "",
    width: "",
    height: "",
    format: "",
    element: "",
    no_ads: "",
    no_cookie_banners: "",
  }
  );


  const submitForm = () => {
    callAPI(url);
  };

  /*
    const makeQuery = () => {
      let wait_until = "network_idle";
      let response_type = "json";
      let fail_on_status = "400%2C404%2C500-511";
      let url_starter = "https://";
      let fullURL = url_starter + inputs.url;
      let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&element=${inputs.element}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
      callAPI(query).catch(console.error);
    };
  
  */
  const reset = () => {
    alert('reset invoked')
    setInputs({
      url: "",
      width: "",
      height: "",
      format: "",
      element: "",
      no_ads: "",
      no_cookie_banners: "",
    });
  };


  const handleInputChange = (e) => {
    setInputs({ ...inputs, url: e.target.value });
  };

  //  const url = 'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=true&api_key=live_BJVgNYAMY5fEyfvh7qEU8HDJpz1v69DjFF8QOGFG8uxPROnlfzXrBiINQm6pg7Qb';

  const callAPI = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        alert('failed to submit')
        throw new Error('Failed to fetch data from the API');
      }
      const json = await response.json();
      // Handle the fetched data as needed

      setCats([json[0]]);
      json.forEach((item) => {
        console.info('item,', item)
      })
      setCurrentImage(json[0].url);


    } catch (error) {
      console.error('Error fetching data:', error.message);
      alert('Error fetching data. Please try again later.');
    }
  };


  const addToBanList = (attribute) => {
    setBanning([...banning, attribute]);
  };


  return (
    <>

      <div className='card'>
        <h1>Trippin' on Cats</h1>
        <h3>Discover cats from your wildest dreams!</h3>


        {cats?.map((cat, index) => (
          <div key={index}>
            <h2>{cat.breeds[0].name}</h2>
            <div>
              <button onClick={() => addToBanList(`${cat.breeds[0].life_span} years`)}>{cat.breeds[0].life_span} years</button>
              <button onClick={() => addToBanList(cat.breeds[0].origin)}>{cat.breeds[0].origin}</button>
              <button onClick={() => addToBanList(`${cat.breeds[0].weight?.imperial} lbs`)}>{cat.breeds[0].weight?.imperial} lbs</button>
            </div>
            <img src={cat.url} alt={`Cat ${index}`} />


          </div>
        ))}

        <button onClick={submitForm}>Discover</button>

      </div>

      <div className='ban'>
        <h2 >Ban list</h2>
        <h3>Select an attribute in your listing to ban it</h3>
        <ul>
          {banning.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>

  )
}

export default App
