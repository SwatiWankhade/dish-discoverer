import axios from "axios";
import React, { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import './Save.css';

const SavedRecipes = () => {
    const [savedRecipe, setSavedRecipes] = useState([]);
    
    const userID = useGetUserID();
    
    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                const recipePromises = response.data.savedRecipes.map(async (e) => {
                    const recipe = await axios.get(`http://localhost:3001/recipes/recipe/${e}`);
                    return recipe; // Returning the recipe data
                });

                const recipesData = await Promise.all(recipePromises);
                setSavedRecipes(recipesData);
            } catch (error) {
                console.log(error);
            }
        };
        
        if (userID) {
            fetchSavedRecipe();
        }
    }, [userID]);
   

    // console.log(savedRecipe)
    return (
        <div className="saveConatiner">
            <h1>Saved Recipes</h1>
            <ul className="recipe">
                {savedRecipe.length>0 ? savedRecipe.map((recipe) => (
                    <li key={recipe.data._id}>
                        <div>
                            <h2>{recipe.data.name}</h2>
                        </div>
                        <div className="instructions">
                            <p>{recipe.data.instructions}</p>
                        </div>
                        <img src={recipe.data.imageUrl} alt={recipe.data.name} />
                        <p>Cooking Time: {recipe.data.cookingTime} min</p>
                    </li>
                )):<></>}
            </ul>
        </div>
    );
};

export default SavedRecipes;
