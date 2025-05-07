import React, { useEffect, useState } from 'react'
import MovieCard from '../Components/MovieCard';
import styles from '../Components/MovieCard.module.css'
import Spinner from '../Components/Spinner';

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_API_KEY

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const fetchMovieData = async (pageNum = 1, query = '') => {
    const isNewSearch = query !== searchQuery || pageNum === 1
    setIsLoading(isNewSearch)
    setError(null)
    
    try {
      const endpoint = query 
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${pageNum}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNum}`
      
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error('Network response was not ok')
      
      const data = await response.json()
      setHasMore(pageNum < data.total_pages)
      
      if (isNewSearch) {
        setMovies(data.results || [])
        setSearchQuery(query)
        setPage(1)
      } else {
        setMovies(prev => [...prev, ...(data.results || [])])
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setError('Sorry! An error occurred while fetching data')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  const fetchMoreData = async () => {
    if (!hasMore || isLoadingMore) return
    
    setIsLoadingMore(true)
    await fetchMovieData(page + 1, searchQuery)
    setPage(prev => prev + 1)
  }
  
  useEffect(() => {
    fetchMovieData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      fetchMovieData(1, searchQuery.trim())
    }
  }

  return (
    <div>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder='Search for movies...'
            value={searchQuery}
            className={styles.searchInput}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className={styles.searchButton}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <div className={styles.movieGrid}>
            {movies.map(movie => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

            {/* if No result is found */}
          {movies.length === 0 && !isLoading && (
            <div className={styles.emptyState}>
              <p>No movies found {searchQuery ? `for "${searchQuery}"` : ''}</p>
              {!searchQuery && (
                <button 
                  onClick={() => fetchMovieData()} 
                  className={styles.searchButton}
                >
                  Try loading popular movies
                </button>
              )}
            </div>
          )}

          {hasMore && !isLoading && (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <button 
                className={styles.searchButton}
                onClick={fetchMoreData}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {error && (
        <div className={styles.error}>
          <span>{error}</span>
          <button 
            onClick={() => setError(null)} 
            className={styles.closeButton}
            aria-label="Close error message"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  )
}

export default Home