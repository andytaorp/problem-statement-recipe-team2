import { useEffect } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import RecipeDetails from "../components/RecipeDetails";
import RecipeForm from "../components/recipeForm";

const Home = () => {
    const { recipes, dispatch } = useRecipesContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!user) return;

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    const json = await response.json();
                    dispatch({ type: "SET_RECIPES", payload: json });
                } else {
                    console.error("Failed to fetch recipes.");
                }
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="recipes">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => <RecipeDetails key={recipe._id} recipe={recipe} />)
                ) : (
                    <p>No recipes found. Add one!</p>
                )}
            </div>
            {user && <RecipeForm />}
        </div>
    );
};

export default Home;
