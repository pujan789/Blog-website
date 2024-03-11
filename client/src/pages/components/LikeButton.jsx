import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LikeButton = ({ isLiked, onLike }) => {
  const likeButtonClass = isLiked ? 'fas fa-heart like-icon liked' : 'far fa-heart like-icon';

  return (
    <div className={`like-icon ${isLiked ? 'liked' : ''}`} onClick={onLike}>
      <i className={likeButtonClass} aria-hidden="true" />
    </div>
  );
};

export default LikeButton;
