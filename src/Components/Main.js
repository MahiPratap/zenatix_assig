import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();

    const pokeFun = async () => {
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
            setPokeData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }

    if (name) {
        url = `https://pokeapi.co/api/v2/pokemon?${inputVal.name}`;
      } 
      else if (name === false) {
        url = `https://api.tvmaze.com/search/shows?q=${inputVal.id}`;
      }

    useEffect(() => {
        pokeFun();
    }, [url])

    const changeInput = (e) => {

        setUrl(e.target.value)
    }
    return (
        <div>

            <div className="container">
                <div className="header">
                    <input className="search-bar"
                        placeholder="search here"
                        typeof="text"
                        onChange={changeInput}
                    />
                    <select className="selector">
                        <option value="name">name</option>
                        <option value="id">id</option>
                    </select>
                </div>

                <div className="up-content">

                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

                    <div className="btn-group">
                        {<button onClick={() => {
                            setPokeData([])
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        {<button onClick={() => {
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
                </div>
                <div className="down-content">
                    <Pokeinfo data={pokeDex} />
                </div>
            </div>
        </div>
    )
}
export default Main;