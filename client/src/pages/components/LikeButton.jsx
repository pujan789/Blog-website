const LikeButton = ({ isLiked, onLike }) => {
    return (
      <button onClick={onLike}>
        {isLiked ? 'Unlike' : 'Like'} Post
      </button>
    );
  };

  
  export default LikeButton;
