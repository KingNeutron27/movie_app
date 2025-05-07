import ClipLoader from 'react-spinners/ClipLoader'

const overide = {
  display: 'block',
  margin: '10px auto'
}


function Spinner({isLoading}) {
  return (
    <ClipLoader 
      color='yellow'
      loading = {isLoading}
      cssOverride={overide}
      size={150}
    />
  )
}

export default Spinner
