import { useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipesContext(); // Context to manage state

  // Delete function
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${recipe._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const deletedRecipe = await response.json();
        dispatch({ type: 'DELETE_RECIPE', payload: deletedRecipe }); // Update UI
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="recipe-details">
      <h4>{recipe.name}</h4>
      <p>
        <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
      </p>
      <p>
        <strong>Preparation Time:</strong> {recipe.prepTime} minutes
      </p>
      <p>
        <strong>Difficulty:</strong> {recipe.difficulty}
      </p>
      <p>
        {formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}
      </p>
      
      {/* Delete Button */}
      <span className="material-symbols-outlined delete-button" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default RecipeDetails;

