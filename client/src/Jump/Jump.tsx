import React from 'react';
import { JumpProps, Photo } from '../tools/Comment.model';
import './Jump.scss';

const Jump = ({visible, photos, index, setIndex}: JumpProps) => {

    return (
        <div className="gallery" style={{display: visible ? "flex": "none"}}>
            {photos.map((photo:Photo, n:number) => 
                <img src={"images/photos/" + photo.source} alt="" onClick={() => setIndex(n)} className={(index === n) ? "gallery__thumbnail selected" : "gallery__thumbnail"}/>
            )}
        </div>
    )
}

export default Jump;