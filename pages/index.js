import { useContext } from 'react'
import Link from 'next/link';
import Layout from '../components/Layout'
import { PokemonContext } from '../components/PokemonContextProvider'


export default function Home({pokemon}) {
  const { currPage, setCurrPage } = useContext(PokemonContext)
  const maxAmount = 48
  const maxPages = Math.floor(pokemon.length / maxAmount);

  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl text-center font-semibold mb-10">The Nextjs Pokedex</h1>
      {/* <h2 className="text-2xl my-8 text-center">First Generation</h2> */}
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          pokemon.slice(currPage * maxAmount, currPage * maxAmount + maxAmount).map((pokeman, index) => (
            <li id="pokeman" key={index} className="w-full mx-auto">
              <Link href={`/pokemon?id=${(currPage * maxAmount) + (index + 1)}`}>
                <a className="grid grid-cols-2 bg-gray-100 items-center p-2 rounded gap-x-4">
                  <img
                    className="w-32 h-32 object-cover"
                    alt={pokeman.name}
                    src={pokeman.image}
                  />
                  <div className="flex gap-2  md:text-2xl items-end">
                    <span className="font-bold text-lg md:text-xl">{(currPage * maxAmount) + (index + 1)}.</span>
                    <span className="capitalize font-medium text-xl md:text-2xl">{pokeman.name}</span>
                  </div>
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="grid grid-rows-3 md:grid-rows-2 lg:grid-rows-1 grid-cols-6 md:grid-cols-12 lg:grid-flow-col lg:auto-cols-fr gap-2 mt-4">
        {
          Array(maxPages).fill('').map((_, index) => (
            <button onClick={() => setCurrPage(index)} className={`${index === currPage ? 'bg-black text-white' : 'bg-gray-100'} rounded w-full h-10 font-semibold`} key={index + 1}>{index + 1}</button>
          ))
        }
      </div>
      <style jsx>{`
        #pokeman a {
          grid-template-columns: 115px 1fr;
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=897')
    const { results } = await res.json()
    const pokemon = results.map((pokeman, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;

      return { ...pokeman, image };
    })

    return {
      props: { pokemon }
    }
  } catch(err) {
    console.log(err);
  }
}