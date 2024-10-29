import React from 'react'
import { Recettes } from './Recettes'
import { Produits } from './Produits'
import { RecettesDisponibles } from './RecettesDisponibles'

export const Frigo = () => {
  return (
    <div>Mon Frigo :
      <Recettes />
      <Produits />
      <RecettesDisponibles />
    </div>
  )
}
