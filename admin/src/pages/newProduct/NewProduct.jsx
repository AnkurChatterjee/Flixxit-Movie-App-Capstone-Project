import { useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function NewProduct() {
  const [movie,setMovie] = useState(null);
  const [img,setImg] = useState(null);
  const [imgTitle,setImgTitle] = useState(null);
  const [imgSm,setImgSm] = useState(null);
  const [trailer,setTrailer] = useState(null);
  const [video,setVideo] = useState(null);
  const [uploaded,setUploaded] = useState(0);

  const {dispatch} = useContext(MovieContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({...movie, [e.target.name]: value});
  }
  
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMovie(prev => {return {...prev, [item.label]: downloadURL}})
        });
        setUploaded(prev => prev+1);
      });
    })
  }
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {file: img, label: "img"},
      {file: imgSm, label: "imgSm"},
      {file: trailer, label: "trailer"},
      {file: video, label: "video"}
    ])
  }
  console.log(movie);
  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie,dispatch)
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="file" id="imgSm" name="imgSm" onChange={(e) => setImgSm(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Title" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="Year" name="year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="Duration" name="duration" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="Limit" name="limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Is Series? </label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={(e) => setTrailer(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video" onChange={(e) => setVideo(e.target.files[0])} />
        </div>
        {uploaded === 4 ? (
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}




/*const uploadTask = storage.ref(`/items/${item.file.name}`).put(item);
      uploadTask.on("state_changes", snapshot => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("Upload is" + progress + "% done");
      }, err => {console.log(err)}, () => {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          setMovie(prev => {return {...prev, [item.label]: url}})
        });
        setUploaded(prev => prev+1);
      })*/