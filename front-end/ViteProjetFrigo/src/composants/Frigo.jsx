import React from 'react'
import { Recettes } from './Recettes'
import { Produits } from './Produits'
import { RecettesDisponibles } from './RecettesDisponibles'

export const Frigo = () => {
  return (
    <div><strong>Mon Frigo :</strong>
      <Recettes />
      <Produits />
      <RecettesDisponibles />
    </div>
  )
}
