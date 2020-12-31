import { createContext, useState } from 'react';

export const PokemonContext = createContext();

export default function PokemonContextProvider(props){
    const [currPage, setCurrPage] = useState(0)
    return (
        <PokemonContext.Provider value={{ currPage, setCurrPage }}>
          {props.children}
        </PokemonContext.Provider>
    )
}