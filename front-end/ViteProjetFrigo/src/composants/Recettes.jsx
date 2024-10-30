import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Recettes = () => {

  const [mesrecettes, setMesrecettes] = useState([]);

  async function getRecette() {
    try {
      const response = await axios.get('http://localhost:3000/recettes');
      console.log(response);
      setMesrecettes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("test")
    getRecette();
  }, [])

  return (
    <div><strong>Recettes :</strong>
      <div>{mesrecettes.map((marecette) => (
        <p key={marecette.id}>{marecette.nom}</p>
      ))}</div>
    </div>
  )
}
