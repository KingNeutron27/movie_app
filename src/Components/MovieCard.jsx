import styles from './MovieCard.module.css';
import { useMovieContext } from '../Contexts/MovieContext';

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  // Fallback image if poster_path doesn't exist
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          className={styles.cardImage} 
          src={posterUrl} 
          alt={movie.title} 
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-movie.jpg';
          }}
        />
        <button 
          onClick={onFavoriteClick} 
          className={styles.favoriteButton}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.date}>{movie.release_date?.split('-')[0] || 'Unknown'}</p>
        <div className={styles.ratingContainer}>
          <span className={styles.rating}>
            {parseFloat(movie.vote_average).toFixed(1)} ⭐
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;