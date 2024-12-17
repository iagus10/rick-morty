import React, { useState } from 'react';

const Character = ({ characters, resetCharacters }) => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredCharacters = characters
        .filter(character => {
            if (filter === 'alive') return character.status === 'Alive';
            if (filter === 'dead') return character.status === 'Dead';
            return true;
        })
        .filter(character => character.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.episode.length - b.episode.length;
            return b.episode.length - a.episode.length;
        });

    return (
        <div>
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>Todos</button>
                <button onClick={() => setFilter('alive')}>Vivos</button>
                <button onClick={() => setFilter('dead')}>Muertos</button>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="sort-buttons">
                <button onClick={() => setSortOrder('asc')}>Ordenar ascedente</button>
                <button onClick={() => setSortOrder('desc')}>Ordenar descendente</button>
            </div>
            <div className="container-characters">
                {filteredCharacters.map((character, index) => (
                    <div className="character-container" key={index}>
                        <div>
                            <img src={character.image} alt={character.name} />
                        </div>
                        <div>
                            <h3>{character.name}</h3>
                            <h6>
                                {character.status === 'Alive' ? (
                                    <>
                                        <span className="Alive" />
                                        Vivo
                                    </>
                                ) : (
                                    <>
                                        <span className="dead" />
                                        Muerto
                                    </>
                                )}
                            </h6>
                            <p>
                                <span className="text-grey">Episodios: </span>
                                <span>{character.episode.length}</span>
                            </p>
                            <p>
                                <span className="text-grey">Especie: </span>
                                <span>{character.species}</span>
                            </p>
                            <span className="text-grey">Endpoint: </span>
                            <a href={character.url} target="_blank" rel="noopener noreferrer">Link</a>
                        </div>
                    </div>
                ))}
            </div>
            <span className="back-home" onClick={resetCharacters}>Volver a la home</span>
        </div>
    );
};

export default Character;