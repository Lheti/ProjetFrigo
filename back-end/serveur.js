//Permet d'importer et faire tourner un serveur Express

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Permet d'importer et de connecter la base de donnée de MySQL

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'descodeuses',
  database: 'frigo_recettes'
})

connection.connect((err) => {
  if(err) {

    console.log("Erreur de connexion au serveur Express.");

  } else {

  console.log("Connection au serveur Express réussie.");
}
})

connection.end()


//Différents endpoints de la page :

// Endpoint : GET /produits
// But : Récupérer tous les produits du frigo
// Requête SQL : Sélectionne tous les champs (*) de la table 'produits'
app.get("/produits", (req, res) => {
  const sql = "SELECT * FROM produits";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits:", err);
      res.status(500).send("Erreur lors de la récupération des produits");
    } else {
      res.json(result);
    }
  });
});

// Endpoint : GET /recettes
// But : Récupérer toutes les recettes
// Requête SQL : Sélectionne tous les champs (*) de la table 'recettes'
app.get("/recettes", (req, res) => {
  const sql = "SELECT * FROM recettes";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des recettes:", err);
      res.status(500).send("Erreur lors de la récupération des recettes");
    } else {
      res.json(result);
    }
  });
});

// Endpoint : POST /produits
// But : Ajouter un nouveau produit dans le frigo
// Requête SQL : Insère un nouveau produit dans la table 'produits'
app.post("/produits", (req, res) => {
  const { nom, quantite, date_expiration, categorie } = req.body;
  const sql =
    "INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES (?, ?, ?, ?)";
  db.query(sql, [nom, quantite, date_expiration, categorie], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du produit:", err);
      res.status(500).send("Erreur lors de l'ajout du produit");
    } else {
      res.json({
        message: "Produit ajouté avec succès",
        produitId: result.insertId,
      });
    }
  });
});

// Endpoint : POST /recettes
// But : Ajouter une nouvelle recette
// Requête SQL : Insère une nouvelle recette dans la table 'recettes'
app.post("/recettes", (req, res) => {
  const { nom, ingredients, instructions, difficulte, temps_preparation } =
    req.body;

  // Log des données envoyées pour vérifier ce qui est reçu
  console.log("Données reçues pour la recette :", req.body);

  const sql =
    "INSERT INTO recettes (nom, ingredients, instructions, difficulte, temps_preparation) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nom, ingredients, instructions, difficulte, temps_preparation],
    (err, result) => {
      if (err) {
        // Log plus détaillé sur l'erreur SQL
        console.error("Erreur lors de l'ajout de la recette :", err);
        res.status(500).send("Erreur lors de l'ajout de la recette");
      } else {
        res.json({
          message: "Recette ajoutée avec succès",
          recetteId: result.insertId,
        });
      }
    }
  );
});


// Endpoint : DELETE /produits/vider
// But : Vider complètement le frigo (supprimer tous les produits)
// Requête SQL : Supprime tous les enregistrements de la table 'produits'
app.delete('/produits/vider', (req, res) => {
  const sql = 'DELETE FROM produits';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression des produits:', err);
      res.status(500).send('Erreur lors de la suppression des produits');
    } else {
      res.json({ message: 'Tous les produits ont été supprimés' });
    }
  });
});

// Endpoint : DELETE /produits/:id
// But : Supprimer un produit spécifique du frigo
// Requête SQL : Supprime un produit de la table 'produits' basé sur son ID
app.delete("/produits/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM produits WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression du produit:", err);
      res.status(500).send("Erreur lors de la suppression du produit");
    } else {
      res.json({ message: "Produit supprimé avec succès" });
    }
  });
});

// Endpoint : DELETE /recettes/:id
// But : Supprimer une recette spécifique
// Requête SQL : Supprime une recette de la table 'recettes' basée sur son ID
app.delete('/recettes/:id', (req, res) => {
  const { id } = req.params; // Récupère l'ID des paramètres
  const sql = 'DELETE FROM recettes WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la recette:', err);
      res.status(500).send('Erreur lors de la suppression de la recette');
    } else if (result.affectedRows === 0) {
      // Si aucune recette n'a été supprimée, l'ID n'existe peut-être pas
      res.status(404).send('Recette non trouvée');
    } else {
      res.json({ message: 'Recette supprimée avec succès' });
    }
  });
});

// Endpoint : PUT /produits/:id
// But : Mettre à jour la quantité d'un produit spécifique
// Requête SQL : Met à jour la quantité d'un produit dans la table 'produits' basé sur son ID
app.put("/produits/:id", (req, res) => {
  const { id } = req.params;
  const { quantite } = req.body;
  const sql = "UPDATE produits SET quantite = ? WHERE id = ?";
  db.query(sql, [quantite, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du produit:", err);
      res.status(500).send("Erreur lors de la mise à jour du produit");
    } else {
      res.json({ message: "Quantité mise à jour avec succès" });
    }
  });
});

// Endpoint : POST /recettes/bulk
// But : Ajouter plusieurs recettes en une seule opération
// Requête SQL : Insère plusieurs recettes dans la table 'recettes' en une seule requête
app.post("/recettes/bulk", (req, res) => {
  const recettes = req.body; // Liste des recettes envoyées dans le body

  const sql =
    "INSERT INTO recettes (nom, ingredients, instructions, difficulte, temps_preparation) VALUES ?";

  const valeurs = recettes.map((recette) => [
    recette.nom,
    recette.ingredients,
    recette.instructions,
    recette.difficulte,
    recette.temps_preparation,
  ]);

  db.query(sql, [valeurs], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout des recettes :", err);
      res.status(500).send("Erreur lors de l'ajout des recettes");
    } else {
      res.json({
        message: "Recettes ajoutées avec succès",
        affectedRows: result.affectedRows,
      });
    }
  });
});

// Endpoint : GET /recettes_disponibles
// But : Trouver les recettes réalisables avec les ingrédients disponibles dans le frigo
// Requêtes SQL : 
// 1. Sélectionne les noms des produits dans le frigo
// 2. Sélectionne toutes les recettes
app.get("/recettes_disponibles", (req, res) => {
  const sqlProduits = "SELECT nom FROM produits"; // Récupérer tous les produits du frigo

  db.query(sqlProduits, (err, produits) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits:", err);
      res.status(500).send("Erreur lors de la récupération des produits");
      return;
    }

    // Crée une liste d'ingrédients disponibles dans le frigo
    const ingredientsFrigo = produits.map((p) => p.nom.toLowerCase());
    // Puis exécute une seconde requête pour obtenir les recettes
    const sqlRecettes = "SELECT nom, ingredients, instructions, temps_preparation, difficulte FROM recettes";
    db.query(sqlRecettes, (err, recettes) => {
      if (err) {
        console.error("Erreur lors de la récupération des recettes:", err);
        res.status(500).send("Erreur lors de la récupération des recettes");
        return;
      }

      // Filtrer les recettes réalisables
      const recettesDisponibles = recettes.filter((recette) => {
        const ingredientsRecette = recette.ingredients
          .toLowerCase()
          .split(", ");
        // Vérifie si tous les ingrédients de la recette sont dans le frigo
        return ingredientsRecette.every((ingredient) =>
          ingredientsFrigo.includes(ingredient)
        );
      });

      // Renvoie les recettes réalisables avec les informations supplémentaires
      const result = recettesDisponibles.map((recette) => ({
        nom: recette.nom,
        instructions: recette.instructions,
        temps_preparation: recette.temps_preparation,
        difficulte: recette.difficulte,
        ingredients: recette.ingredients
      }));

      res.json(result); // Renvoie les recettes réalisables
    });
  });
});



// Endpoint : POST /ingredients/bulk
// But : Ajouter plusieurs ingrédients (produits) en une seule opération
// Requête SQL : Insère plusieurs produits dans la table 'produits' en une seule requête
app.post('/ingredients/bulk', (req, res) => {
  const ingredients = req.body; // Liste des ingrédients envoyés dans le body

  const sql = 'INSERT INTO produits (nom, quantite, date_expiration, categorie) VALUES ?';

  const valeurs = ingredients.map(ingredient => [
    ingredient.nom,
    ingredient.quantite,
    ingredient.date_expiration,
    ingredient.categorie
  ]);

  db.query(sql, [valeurs], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout des ingrédients :', err);
      res.status(500).send('Erreur lors de l\'ajout des ingrédients');
    } else {
      res.json({ message: 'Ingrédients ajoutés avec succès', affectedRows: result.affectedRows });
    }
  });
});
