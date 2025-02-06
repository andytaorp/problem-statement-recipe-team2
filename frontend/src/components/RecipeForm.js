import { useState } from "react"
import { useRecipeContext } from '../hooks/useRecipeContext'
import { useAuthContext } from "../hooks/useAuthContext"

const RecipeForm = () => {
    const { dispatch } = useRecipeContext()
    const {user} = useAuthContext()

    const [recipeName, setRecipeName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [difficultyLevel, setDifficultyLevel] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const recipe = {recipeName, ingredients, instructions, prepTime, difficultyLevel}

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipe`,  {
            method: 'POST', 
            body:JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setRecipeName('')
            setIngredients('')
            setInstructions('')
            setPrepTime('')
            setDifficultyLevel('')
            setError(null)
            setEmptyFields([])
            console.log('new recipe added', json)
            dispatch({type: 'CREATE_RECIPE', payload: json})
        }
    }

return(
    <form className = "create" onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>

        <label>Recipe name:</label>
        <input 
            type = "text" 
            onChange= {(e) => setRecipeName(e.target.value)}
            value={recipeName}
            className={emptyFields.includes('recipeName') ? 'error': ''}
            />

        <label>Ingredients:</label>
        <input 
            type = "text" 
            onChange= {(e) => setIngredients(e.target.value)}
            value={ingredients}
            className={emptyFields.includes('ingredients') ? 'error': ''}
            />

        <label>Instructions:</label>
        <input 
            type = "text" 
            onChange= {(e) => setInstructions(e.target.value)}
            value={instructions}
            className={emptyFields.includes('reps') ? 'error': ''}
            />

        <label>Preparation time:</label>
        <input 
            type = "text" 
            onChange= {(e) => setPrepTime(e.target.value)}
            value={prepTime}
            className={emptyFields.includes('prepTime') ? 'error': ''}
            />

        <label>Difficulty level:</label>
        <select
            onChange={(e) => setDifficultyLevel(e.target.value)}
            value={difficultyLevel}
            className={emptyFields.includes('difficultyLevel') ? 'error' : ''}
            >
                <option value= ''>Select difficuty</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='Hard'>Hard</option>
            </select>

        <button>Add recipe</button>
        {error && <div className="error">{error}</div>}
    </form>
)

}

export default RecipeForm