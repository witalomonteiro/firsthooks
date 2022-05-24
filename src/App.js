import React, { useState, useEffect } from "react";

export default function App() {
  const [repositorios, setRepositorios] = useState([]);

  function buscar(usuario) {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${usuario}/repos`);
        const json = await response.json();
        setRepositorios(json);
        console.log(usuario)
      } catch (error) {
        console.log("ERRO!", error);
      }
    };
    fetchData();
  }

  useEffect(() => {
    const filtro = repositorios.filter(repo => repo.favorito);
    document.title = `(${filtro.length}) Favoritos`
  }, [repositorios, setRepositorios])

  function favoritar(id) {
    const novoRepositorio = repositorios.map(repo => {
      return repo.id === id ? { ...repo, favorito: !repo.favorito } : repo
    });
    setRepositorios(novoRepositorio);
  }

  return (
    <>
      <h1>Favoritar Repositórios</h1>
      <input 
        type="text"
        id="txtBusca"
        placeholder="Buscar..."  />
      <button id="bntBusca" onClick={() => buscar(document.getElementById('txtBusca').value)}>Buscar</button> 

      <ul>
        {repositorios.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorito && <span>(Favorito)</span>}
            <button onClick={() => favoritar(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
};