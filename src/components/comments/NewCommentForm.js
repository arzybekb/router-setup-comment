import { useEffect, useRef } from "react";
import useHttp from "../../hooks/useHttp";
import { addComment } from "../../api/quoteService";

import classes from "./NewCommentForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);

useEffect(() => {
  if(status === 'completed' && !error) {
    props.onAddedComment()
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [status, error])

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    sendRequest({commentData: {text: enteredText}, quoteId: props.quoteId })
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
