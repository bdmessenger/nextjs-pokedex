import '../styles/globals.css'
import PokemonContextProvider from '../components/PokemonContextProvider'

function MyApp({ Component, pageProps }) {
  return (
    <PokemonContextProvider>
      <Component {...pageProps} />
    </PokemonContextProvider>
  )
}

export default MyApp
