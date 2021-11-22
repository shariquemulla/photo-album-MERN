import React from 'react';
import { CommentProps } from '../tools/Comment.model';
import { sendJSONData } from '../tools/Toolkit';
import './Comment.scss';

const Comment = ({visible, setShowAddComment, currentPhotoId, reloadFunction, setLoading}: CommentProps) => {

    const INSERT_SCRIPT:string = "http://localhost:8080/put";

    // Disable submit button
    const [disableSubmit, setdisableSubmit] = React.useState<boolean>(true);

    // Display error message
    const [showError, setShowError] = React.useState<boolean>(false);

    // Recording user inputs
    const [authorInput, setAuthorInput] = React.useState<string>("");
    const [commentInput, setCommentInput] = React.useState<string>("");

    function onAuthorInputChange(e: any) {
        setAuthorInput(e.target.value);
    }

    function onCommentInputChange(e: any) {
        setCommentInput(e.target.value);
    }

    // Enable/disable submit button based on user input
    React.useEffect(() => {
        if(authorInput != "" && commentInput != "") {
            setdisableSubmit(false);
        } else {
            setdisableSubmit(true);
        }
    }, [authorInput, commentInput]);

    const onResponse = () => {
        reloadFunction();
        setShowError(false);
        setAuthorInput("");
        setCommentInput("");
        // setLoading(false);
      };
    
    const onError = () => {
        console.log("*** Error has occured during AJAX data transmission: " + "message");
        setShowError(true);
        setLoading(false);
    }

    function addComment() {
        setLoading(true);
        let jsonData = {
                            "photoId": currentPhotoId,
                            "author": authorInput,
                            "comment": commentInput
                       };
        sendJSONData(INSERT_SCRIPT, JSON.stringify(jsonData), onResponse, onError);
    }

    return (
        <div className="commentAdd" style={{display: visible ? "block" : "none"}}>
            <input type="hidden" name="photoId" value={currentPhotoId}/>
            <div className="commentAdd__field">
                <label className="commentAdd__label" htmlFor="author">Author (100 Characters):</label><br/>
                <input className="commentAdd__input" type="text" name="author" id="author" maxLength={100} required onChange={onAuthorInputChange} value={authorInput}/>
            </div>
            <div className="commentAdd__field">
                <label className="commentAdd__label" htmlFor="comment">Comment (200 Characters):</label><br/>
                <textarea className="commentAdd__input" name="comment" id="comment" maxLength={200} required onChange={onCommentInputChange} value={commentInput}></textarea>
            </div>
            <div className="commentAdd__error" style={{display: showError ? "block" : "none"}}>Error while adding comment!</div>
            <div>
                <button type="submit" className="menu__btn" 
                        style={{marginRight: "5px"}}
                        disabled={disableSubmit}
                        onClick={() => addComment()}>
                            Ok</button>
                            
                <button className="menu__btn"
                        onClick={() => setShowAddComment(false)}>
                            Cancel</button>
            </div>
        </div>
    )
}

export default Comment;