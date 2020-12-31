import Layout from '../components/Layout';
import Link from 'next/link';

export default function Pokemon({pokeman}) {
    return (
        <Layout title={pokeman.name}>
            <section className=" mx-auto">
                <Link href="/"><a className="underline my-8 text-xl text-blue-800">Return to Home</a></Link>
                <div id="pokemon" className="relative bg-gray-100 rounded p-6 mt-4">
                    <p className="absolute top-0 left-0 text-2xl p-4 font-semibold opacity-50">#{pokeman.id}</p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl  mb-2 text-center capitalize font-bold">
                        {pokeman.name}
                    </h1>
                    <img className="mx-auto w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover my-4" src={pokeman.image} alt={pokeman.name} />
                    <div className="grid grid-cols-2 place-items-center text-xl">
                        <p>
                            <span className="font-bold mr-2">Weight:</span> {pokeman.weight}
                        </p>
                        <p>
                            <span className="font-bold mr-2">Height:</span>
                            {pokeman.height}
                        </p>
                    </div>
                    
                    <div className="mt-4 ">
                        <h2 className="text-2xl mb-2 font-bold text-center">Types:</h2>
                        <ul className="flex gap-x-4 justify-center">
                            {pokeman.types.map((type, index) => (
                                <li key={index} className="text-xl capitalize italic">{type.type.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="my-12">
                        <h2 className="text-2xl mb-2 font-bold text-center">Abilities:</h2>
                        <ul className="flex gap-x-4 justify-center">
                            {pokeman.abilities.map((type, index) => (
                                <li key={index} className="text-xl capitalize italic">{type.ability.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <h2 className="text-2xl mb-2 font-bold text-center">Moves:</h2>
                        {
                            pokeman.moves.length > 0 ?
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 justify-center place-items-center">
                            {
                                pokeman.moves.map((type, index) => (
                                    <li key={index} className="text-xl capitalize italic">{type.move.name}</li>
                                ))
                            }
                            </ul>
                            :
                            <p className="text-center">No Moves Available</p>
                        }
                    </div>
                    
                </div>
            </section>
            <style jsx>{`
                #pokemon {
                    height: auto;
                }
            `}</style>
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { pokeman }
        };
    } catch(error) {
        console.log(error)
    }
}