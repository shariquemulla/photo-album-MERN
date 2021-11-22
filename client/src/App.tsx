import React from 'react';
import Comment from './Comment/Comment';
import './App.scss';
import { getJSONData } from "./tools/Toolkit";
import Jump from './Jump/Jump';
import Content from './Content/Content';
import { JSONdata, Photo } from './tools/Comment.model';
import LoadingOverlay from './LoadingOverlay/LoadingOverlay';

const RETRIEVE_SCRIPT:string = "http://localhost:8080/get";

const App = () => {

  // ---------------------------------------------- state variables
  const [loading, setLoading] = React.useState<boolean>(true);
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [index, setIndex] = React.useState<number>(0);

  const [showJump, setShowJump] = React.useState<boolean>(false);
  const [showAddComment, setShowAddComment] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("Photo album is Empty!");

  const onResponse = (result:JSONdata) => {
    // data received from Web API
    setPhotos(result.photos);
    setLoading(false);
  };

  const onError = (message:string) => {
    console.log("*** Error has occured during AJAX data transmission: " + message);
    setLoading(false);
    setErrorMessage("Photos could not be fetched!");
  }

  // ---------------------------------------------- lifecycle hooks
  React.useEffect(() => {
    loadPhotos();
  }, []);

  // Reload photos after adding a comment
  function loadPhotos() {
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }

  return (
    <div className="Apps">
      <LoadingOverlay bgColor="#035074" spinnerColor="#FFFFFF" enabled={loading} />
        
      <header className="header">
          <div className="header__title">Photo Album</div>
          <div className="header__subtitle">v5.0 Vanilla JS with FlexBox / Sass</div>
      </header>
      
      <nav>
          <div className="menu">
              <button className="menu__btn" 
                      id="buttonPrevious" 
                      onClick={() => setIndex(index-1)} 
                      disabled = {(index === 0 || photos.length == 0) ? true : false}>
                        Previous</button>

              <button className="menu__btn" 
                      id="buttonNext"     
                      onClick={() => setIndex(index+1)} 
                      disabled = {(index === photos.length-1 || photos.length == 0) ? true : false}>
                        Next</button>

              <button className="menu__btn menu__btn--highlighted" 
                      id="buttonJump" 
                      disabled = {(photos.length == 0) ? true : false}
                      onClick={() => setShowJump(!showJump)}>
                        Jump</button>

              <button className="menu__btn menu__btn--highlighted" 
                      id="buttonComment" 
                      disabled = {(photos.length == 0) ? true : false}
                      onClick={() => setShowAddComment(!showAddComment)}>
                        Comment</button>
          </div>

          {/* Photo Counter */}
          {photos.length == 0 ? "" : <span>Photo {index+1} of {photos.length}</span>}          
      </nav>

     {
       photos.length <= 0 ? 
       
       <div id="errorMessage">{errorMessage}</div>        // Show error if photos not fetched or empty
       
       :
     
      <div id="photoAlbum">
          <Jump visible={showJump} photos={photos} index={index} setIndex={setIndex}/>
          <Comment visible={showAddComment} 
                    setShowAddComment={setShowAddComment} 
                    currentPhotoId={photos[index]._id} 
                    reloadFunction={loadPhotos}
                    setLoading={setLoading}/>
          <Content photo={photos[index]}/>
      </div>
      
     }
    </div>
  );
}

export default App;
