import axios from "axios";
import React, { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import './Home.css';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipe, setSavedRecipe] = useState(new Set());

    const [cookies, _] = useCookies(["access_token"]);

    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
                    {
                        headers: { Authorization: cookies.access_token },
                    }
                );
                const savedRecipeSet = new Set(response.data.savedRecipes);
                setSavedRecipe(savedRecipeSet);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipe();
        if (cookies.access_token) fetchSavedRecipe();
    }, [cookies.access_token, userID]);

    const saveRecipe = async (recipeID) => {
        // if(!savedRecipe.has(recipeID)){
        try {
            const response = await axios.put(
                "http://localhost:3001/recipes/saverecipe",
                {
                    recipeID,
                    userID,
                },
                {
                    headers: { Authorization: cookies.access_token },
                }
            );
            console.log(response.data.savedRecipes)
            const savedRecipeSet = new Set(response.data.savedRecipes);
            setSavedRecipe(savedRecipeSet);
        } catch (error) {
            console.log(error);
        }
    // }
    };

    const isRecipeSaved = (id) => {
        return savedRecipe.has(id);
    };

    return (
        <div className="homeConatiner">
            <h1>Recipes</h1>
            <ul className="recipe">
                {recipes.map((recipe) => (
                    <li key={recipe._id} >
                        <div className="upperCon">
                            <h2>{recipe.name}</h2>
                            <button
                                onClick={() => saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                                className="saveBtn"
                            >
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>
                        </div>
                        <div className="instructions">
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} min</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
