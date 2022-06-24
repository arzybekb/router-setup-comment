import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllComments } from "../../api/quoteService";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const params = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest: getComments,
    status,
    error,
    data: loadedComments,
  } = useHttp(getAllComments);

  const { quoteId } = params;

  useEffect(() => {
    getComments(quoteId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteId]);

  const addedCommentHandler = useCallback(() => {
    getComments(quoteId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={addedCommentHandler} quoteId={quoteId} />}
      {comments}
    </section>
  );
};

export default Comments;
