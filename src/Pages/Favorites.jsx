import React from 'react'
import styles from './Favorites.module.css'
import { useMovieContext } from '../Contexts/MovieContext'
import MovieCard from '../Components/MovieCard'


function Favorites() {
  const { favorites } = useMovieContext();

  // Check if favorites array exists and has items
  if (favorites && favorites.length > 0) {
    return (
      <div className={styles.favoritesContainer}>
        <h2>Your Favorites</h2>
        <div className={styles.movieGrid}>
          {favorites.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.emptyState}>
      <h1 className={styles.info}>No favorites added yet</h1>
      <p className={styles.description}>Please add your favorite movies</p>
    </div>
  );
}

export default Favorites