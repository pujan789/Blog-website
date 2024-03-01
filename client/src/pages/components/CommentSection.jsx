import React, { useState } from 'react';

const CommentSection = ({ comments, onCommentSubmit }) => {
  // Define state for commentText
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCommentSubmit(commentText);
    setCommentText(''); // Clear the input after submission
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>
          {/* Example: Display the comment text */}
          <p>{comment.text}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={commentText} 
          onChange={(e) => setCommentText(e.target.value)} 
          placeholder="Write a comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
