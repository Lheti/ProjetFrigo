import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Produits = () => {
  const [mesproduits, setMesproduits] = useState([]);

  async function getProduit() {
    try {
      const response = await axios.get('http://localhost:3000/produits');
      console.log(response);
      setMesproduits(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("test")
    getProduit();
  }, [])

  return (
    <div><strong>Produits :</strong>
      <div>{mesproduits.map((monproduit) =>(
        <p key={monproduit.id}>{monproduit.nom}</p>
      ))}</div>
    </div>
  )
}
