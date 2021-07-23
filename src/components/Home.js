import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Logo from '../imagenes/Logo.png'
import bannermarvel from '../imagenes/bannermarvel.jpg'



export const Home = () => {


  const [comics, setComics] = useState([]);

  useEffect(() => {
    axios.get('https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=15bd0e14d5aa5af80414973d4fe2f135&hash=9dcdb4ba8d8e868d8f739a735f187e7a').then(res => {
      setComics(res.data.data.results)

    }).catch(error => console.log(error))
  }, [])

  // console.log(comics)




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

    <>
      <img className="imgHome" src={bannermarvel} alt='background' />

      <div className='cardHome'>
        <div className='card-header' >
          {error && <p className='error' >{error}</p>}
          <div className='btnLogout'>
            <button className="btn btn-warning" onClick={handleLogout} >Cerrar sesión</button>
          </div>
        </div>

        <div className='contenedorLogo2'>
          <img className="imgLogo2" src={Logo} alt='Logo' />

        </div>

        <div className='mssPrincipal'>
          <h1 className='bienvenida'>Bienvenid@</h1>
          <p className='usuario'>{currentUser.email}</p>
        </div>

        <div className="container">

          <div className="row">

            {comics.map(comic => (

              <div className="col" key={comic.id}>

                {/* <div className="container"> */}
                <div className="card" style={{ width: "20rem", height: "38rem" }}>

                  <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} className="card-img-top" style={{ width: "70%", height: "70%", objectFit: "cover" }} />

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{comic.title}</li>
                    <li className="list-group-item">{comic.series.name}</li>
                    <li className="list-group-item">{comic.series.resourceURI}</li>
                    <li className="list-group-item">{comic.stories.collectionURI}</li>
                  </ul>

                </div>

              </div>

              // </div>
            ))
            }

          </div>

        </div>
      </div>

    </>
  )
}


export default Home;