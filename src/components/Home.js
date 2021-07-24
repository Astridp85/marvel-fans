import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Logo from '../imagenes/Logo.png'
import bannermarvel from '../imagenes/bannermarvel.jpg'
import {db} from '../firebase.js'




export const Home = () => {

  const [comics, setComics] = useState([]);
  const [favorite, setFavorite] = useState(0);


  useEffect(() => {
    axios.get('https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=15bd0e14d5aa5af80414973d4fe2f135&hash=9dcdb4ba8d8e868d8f739a735f187e7a').then(res => {
      setComics(res.data.data.results)

    }).catch(error => console.log(error))
  }, [])

  // console.log(comics)

const dataComics = comics.map(function (elementoActual) {
  return  elementoActual.title  + elementoActual.id

});

console.log(dataComics)


db.collection('favoritos').doc().set({
  titulo: dataComics})
  console.log('guardado con éxito')


// addComics();


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
          <h1 className='bienvenida'>Bienvenido/a:</h1>
          <p className='usuario'>{currentUser.email}</p>
        </div>
        <div className="favoritos">
          <h1 className="texFavoritos">Favoritos</h1>
          <h2 className='conteoFavoritos'>Cantidad de Comics favoritos es de:{favorite}</h2>
          <ul>
        
              <li className='conteoFavoritos' ></li>
            

          </ul>
        </div>

        <div className="container">

          <div className="row">

            {comics.map(comic => (

              <div className="col-md-6" key={comic.id}>


                {/* <div className="container"> */}
                <div className="card" style={{ width: "20rem", height: "38rem" }}>

                  <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} className="card-img-top" style={{ width: "70%", height: "70%", objectFit: "cover" }} />
                  <button className="btnFavorites" key={comic.id} /* onClick={isFavorite ? removeFavorite : addFavorite} */ 
                  onClick={() => setFavorite(favorite + 1)
                  }>
                    <i className="material-icons">favorite</i></button>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{comic.title}</li>
                    <li className="list-group-item">{comic.series.name}</li>
                    <li className="list-group-item">{comic.series.resourceURI}</li>
                    <li className="list-group-item">{comic.stories.collectionURI}</li>
                  </ul>

                </div>

              </div>


            ))
            }

          </div>

        </div>
      </div>

    </>
  )
}


export default Home;

// function likeObjPost(idPost, incrementer) {
//   const postLikeUsers = db.collection('usersPost').doc(idPost);
//   return postLikeUsers.update({
//           likesCount: incrementer,
//       })
//       .then(() => {
//           console.log('Document successfully liked!');
//       }).catch((error) => {
//           console.error('Error liked document: ', error);
//       });
// }

{/* <div class="likeP">
    <button class="btn-like" id="like-${doc.id}"><img class="default-like" src=./assets/like.svg></button>
    <p class="counter">${doc.likesCount}</p>
    </div>
    <button class="btn-share"><img class="share" src=./assets/share.svg></button>
    <div class="likeCounter">
    <div><img class="liked-${doc.id}" src=./assets/gleamLike.svg alt="liked"></div>
    </div>
    </div> */}

     //Liked post 
    //  const btnLike = document.querySelector(`#like-${doc.id}`)
    //  const likedIcon = document.querySelector(`.liked-${doc.id}`)
    //  likedIcon.style.display = 'none'
    //  btnLike.addEventListener('click', () => {
    //      likedIcon.style.display = 'block'
    //      setTimeout(() => {
    //          const incrementer = firebase.firestore.FieldValue.increment(1)
    //          likeObjPost(`${doc.id}`, incrementer)
    //      }, 1000);
    //  });

    // { 
    //   function favorite(key, incrementer) {
    //     const favoriteUsers = db.collection('favoritos').doc(key);
    //     return favoriteUsers.update({
    //             likesCount: incrementer,
    //         })
    //         .then(() => {
    //             console.log('Document successfully liked!');
    //         }).catch((error) => {
    //             console.error('Error liked document: ', error);
    //         });
    //   }}