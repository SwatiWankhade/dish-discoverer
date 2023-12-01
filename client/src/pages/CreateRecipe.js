import react, { useState } from "react";
import "./createRecipe.css";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";

const CreateRecipe = () => {
    const navigate = useNavigate();

    const [cookies,_] = useCookies(["access_token"]);
      
    const userID = useGetUserID();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        description:"",
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngChange = (e, idx) => {
        const { value } = e.target;
        const ingredients = [...recipe.ingredients];
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });
    };

   

    const addIngredient = (e) => {
        const ingredients = [...recipe.ingredients, ""];
        setRecipe({ ...recipe, ingredients})
    }
    // console.log(recipe);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(recipe)
        console.log(cookies.access_token)
        try {
            await axios.post(
                "http://localhost:3001/recipes",
                recipe ,
                {headers: {authorization: cookies.access_token}}

            );
            alert("Recipe Created Successfully!");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="createMain">
        <div className="createRecipe">
            <h2>Create Recipe</h2>
            <form className="createRecForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} />

                <label htmlFor="ingredients">Ingredients</label>
                {/* <textarea id="ingredients" name="ingredients" onChange={handleChange}/> */}
                {recipe.ingredients.map((ingredient, idx) => (
                    <input
                        key={idx}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(e) => handleIngChange(e, idx)}
                    />
                ))}
                <button onClick={addIngredient} type="button" className="btn addIng">Add Ingredients</button>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" onChange={handleChange} />

                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange} />
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
                <label htmlFor="cookingTime">Cooking Time (Min) </label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />

                <button type="submit" className="btn createRec">Create Recipe</button>
            </form>
        </div>
        </div>
    )
}

export default CreateRecipe;