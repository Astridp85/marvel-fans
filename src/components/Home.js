import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';



export const Home = () => {


  const [comics, setComics] = useState([]);

  useEffect(() => {
    axios.get('https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=15bd0e14d5aa5af80414973d4fe2f135&hash=9dcdb4ba8d8e868d8f739a735f187e7a').then(res => {
      setComics(res.data.data.results)
  
    }).catch(error => console.log(error))
  }, [])
  
  console.log(comics)




  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const [error, setError] = useState('');


  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      setError('Server Error')
    }



  }
  return (
    <div className='cardHome'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}

      </div>
      <div>
        <h1>Bienvenid@</h1>
        <p>{currentUser.email}</p>
        <button className='logout-button' onClick={handleLogout} >Cerrar sesión</button>
      </div>
      <div className="App">
  <h1>Marvel Fans</h1>
  <div className="row row-cols-1 row-cols-md-3 g-4">

    {comics.map(comic => (

      <div className="col" key={comic.id}>
        <div className="card" style={{ width: "18rem", height: "18rem" }}>
          <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} className="card-img-top" style={{ width: "80%", height: "80%" }} />
          <div className="card-body">
            <p className="card-text">{comic.title}</p>
            {/* <h2 className="card-text">{comic.series}</h2>
          <h3 className="card-text">{comic.stories}</h3> */}
          </div>
        </div>
      </div>
    ))
    }

  </div>

</div>
    </div>


  )
}


export default Home;