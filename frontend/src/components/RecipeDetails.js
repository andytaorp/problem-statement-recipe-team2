import { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
import { useAuthContext } from '../hooks/useAuthContext';

const RecipeDetails = ({ recipe }) => {
    const { dispatch } = useRecipeContext();
    const { user } = useAuthContext();
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedRecipe, setEditedRecipe] = useState({
        name: recipe.name,
        ingredients: recipe.ingredients.join(', '),  
        instructions: recipe.instructions,
        preparationTime: recipe.preparationTime,
        difficulty: recipe.difficulty,
    });
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (!user) {
            setError('You must be logged in to delete a recipe.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                const deletedRecipe = await response.json();
                dispatch({ type: 'DELETE_RECIPE', payload: deletedRecipe });
            } else {
                console.error('Failed to delete recipe');
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setError(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRecipe({ ...editedRecipe, [name]: value });
    };

    const handleSave = async () => {
        if (!user) {
            setError('You must be logged in to edit a recipe.');
            return;
        }

        const updatedRecipe = {
            name: editedRecipe.name,
            ingredients: editedRecipe.ingredients.split(',').map(ing => ing.trim()),
            instructions: editedRecipe.instructions,
            preparationTime: Number(editedRecipe.preparationTime),
            difficulty: editedRecipe.difficulty
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedRecipe)
            });

            if (response.ok) {
                const json = await response.json();
                dispatch({ type: 'UPDATE_RECIPE', payload: json });
                setIsEditing(false);
            } else {
                setError('Failed to update the recipe.');
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <div className="recipe-details">
            {isEditing ? (
                <div className="editing-mode">
                    <label htmlFor="name">Recipe Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedRecipe.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="ingredients">Ingredients (comma-separated):</label>
                    <input
                        type="text"
                        id="ingredients"
                        name="ingredients"
                        value={editedRecipe.ingredients}
                        onChange={handleChange}
                    />

                    <label htmlFor="instructions">Instructions:</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={editedRecipe.instructions}
                        onChange={handleChange}
                    />

                    <label htmlFor="preparationTime">Preparation Time (minutes):</label>
                    <input
                        type="number"
                        id="preparationTime"
                        name="preparationTime"
                        value={editedRecipe.preparationTime}
                        onChange={handleChange}
                    />

                    <label htmlFor="difficulty">Difficulty Level:</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={editedRecipe.difficulty}
                        onChange={handleChange}
                    >
                        <option value="">Select difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleEditToggle}>Cancel</button>
                    {error && <div className="error">{error}</div>}
                </div>
            ) : (
                <>
                    <h4>{recipe.name}</h4>
                    <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    <p><strong>Preparation Time:</strong> {recipe.preparationTime} minutes</p>
                    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

                    <span className="material-symbols-outlined delete-button" onClick={handleDelete}>
                        delete
                    </span>
                    <span className="material-symbols-outlined edit-button" onClick={handleEditToggle}>
                        edit
                    </span>
                </>
            )}
        </div>
    );
};

export default RecipeDetails;
