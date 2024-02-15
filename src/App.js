import Auth from "./Auth";
import "./App.css";
import {
  db,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  auth,
  storage,
  ref,
  uploadBytes
} from "./config/firebase";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const [moviesList, setMoviesList] = useState([]);

  //New movie state

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  //Update title state

  const [updatedTitle, setUpdatedTitle] = useState("");

  //File Uplaod State
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    //READ THE DATA
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMoviesList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSumbitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedAnOscar: newMovieOscar,
        userId: auth?.currentUser.uid
      });
      getMovieList();
    } catch (error) {
      alert(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title: updatedTitle});
    getMovieList();
  };

  const uploadFile = async () => {
    if(fileUpload){
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      
        await uploadBytes(filesFolderRef, fileUpload)
          .then((snapshot) => {
            console.log("file uploaded", snapshot);
          })
          .catch((error) => {
            console.error(error);
          });
      
      
    }
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newMovieOscar}
          onChange={(e) => setNewMovieOscar(e.target.checked)}
        />
        <label>Recieved an oscar</label>
        <button onClick={onSumbitMovie}>Submit Movie</button>
      </div>
      <div>
        {moviesList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedAnOscar ? "green" : "blue" }}>
              Title: {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button
              onClick={() => {
                deleteMovie(movie.id);
              }}
            >
              Delete
            </button>
            <input
              type="text"
              placeholder="new title"
              onChange={(event) => setUpdatedTitle(event.target.value)}
            />
            <button onClick={() => updateMovie(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(event) => setFileUpload(event.target.files[0])}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
