import { useRecipeContext } from '../hooks/useRecipeContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import { formatDistanceToNow } from 'date-fns';

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipeContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:4000/api/recipes/' + recipe._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_RECIPE', payload: json})
    }
  }

  return (
    <div className="recipe-details">
      <h4>{recipe.title}</h4>
      <p><strong>Recipe name: </strong>{recipe.name}</p>
      <p><strong>Ingrediants: </strong>{recipe.ingredients}</p>
      <p><strong>Cooking instructions: </strong>{recipe.instructions}</p>
      <p><strong>Preperation time: </strong>{recipe.prepTime}</p>
      <p><strong>Difficulty Level: </strong>{recipe.difficulty}</p>
      <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default RecipeDetails