import React from "react";
const Card = ({ pokemon, loading, infoPokemon }) => {
   
    return (
        <>
            {
                loading ? <h1>Loading...</h1> :
                    pokemon.map((item, index) => {
                        return (
                            <div key={item.name} >
                                <div className="card" >
                                    <h2>{item.name}</h2>
                                    <h2>{item.id}</h2>
                                    <h3>Type : {item.types[0].type.name}</h3>
                                    <img src={item.sprites.front_default} alt="" />
                                    <button className="info-button" onClick={() => infoPokemon(item)}>click to open</button>
                                </div>
                            </div>
                        )
                    })
            }

        </>
    )
}
export default Card;