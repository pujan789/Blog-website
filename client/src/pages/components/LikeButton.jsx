import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 


const LikeButton = ({ isLiked, onLike }) => {
  const likeButtonClass = isLiked ? 'fas fa-heart like-icon liked' : 'far fa-heart like-icon';
  

  return (
    <i className={likeButtonClass} onClick={onLike} aria-hidden="true" />
  );
};

export default LikeButton;


