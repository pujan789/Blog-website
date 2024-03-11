import React, { useState } from 'react';

const CommentSection = ({ comments, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form default submission behavior
    onCommentSubmit(commentText);
    setCommentText(''); // Clear the input after submission
  };

  return (
    <div className="comment-section">
      {comments.map((comment, index) => (
        <div key={index} className="comment my-2 p-3 bg-light rounded shadow-sm">
          {/* Example: Display the comment text. You can add more structure here */}
          <p className="mb-0">{comment.text}</p>
          {/* Optionally, display the commenter's name or date here */}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="add-comment mt-4">
        <div className="input-group">
          <input 
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="form-control rounded-pill"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary rounded-pill">Post Comment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
