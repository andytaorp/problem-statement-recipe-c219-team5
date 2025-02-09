// import { useEffect, useState } from 'react';
// import { useRecipeContext } from '../hooks/useRecipeContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import RecipeDetails from '../components/RecipeDetails';
// import RecipeForm from '../components/RecipeForm';

// const Home = () => {
//     const { recipes, dispatch } = useRecipeContext();
//     const { user } = useAuthContext();
//     const [sortOrder, setSortOrder] = useState('none'); 

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             const response = await fetch('/api/recipes', {
//                 headers: { 'Authorization': `Bearer ${user.token}` },
//             });
//             const json = await response.json();

//             if (response.ok) {
//                 dispatch({ type: 'SET_RECIPES', payload: json });
//             }
//         };

//         if (user) {
//             fetchRecipes();
//         }
//     }, [dispatch, user]);

    
//     const sortedRecipes = () => {
//         if (!recipes) return [];

//         let sorted = [...recipes];

//         if (sortOrder === 'asc') {
//             sorted.sort((a, b) => a.preparationTime - b.preparationTime);
//         } else if (sortOrder === 'desc') {
//             sorted.sort((a, b) => b.preparationTime - a.preparationTime);
//         }

//         return sorted;
//     };

//     return (
//         <div className="home">
//             <div className="sorting-controls">
//                 <label>Sort by Preparation Time:</label>
//                 <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//                     <option value="none">None</option>
//                     <option value="asc">Ascending</option>
//                     <option value="desc">Descending</option>
//                 </select>
//             </div>

//             <div className="recipes">
//                 {sortedRecipes().map((recipe) => (
//                     <RecipeDetails key={recipe._id} recipe={recipe} />
//                 ))}
//             </div>

//             <RecipeForm />
//         </div>
//     );
// };

// export default Home;

import { useEffect, useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeContext';
import { useAuthContext } from '../hooks/useAuthContext';
import RecipeDetails from '../components/RecipeDetails';
import RecipeForm from '../components/RecipeForm';

const Home = () => {
    const { recipes, dispatch } = useRecipeContext();
    const { user } = useAuthContext();
    const [sortOrder, setSortOrder] = useState(() => {
        // Initialize sortOrder from localStorage, defaulting to 'none' if not present
        return localStorage.getItem('sortOrder') || 'none';
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipes', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_RECIPES', payload: json });
            }
        };

        if (user) {
            fetchRecipes();
        }
    }, [dispatch, user]);

    // Update sortOrder in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('sortOrder', sortOrder);
    }, [sortOrder]);

    const sortedRecipes = () => {
        if (!recipes) return [];

        let sorted = [...recipes];

        if (sortOrder === 'asc') {
            sorted.sort((a, b) => a.preparationTime - b.preparationTime);
        } else if (sortOrder === 'desc') {
            sorted.sort((a, b) => b.preparationTime - a.preparationTime);
        }

        return sorted;
    };

    return (
        <div className="home">
            <div className="sorting-controls">
                <label>Sort by Preparation Time:</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="none">None</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="recipes">
                {sortedRecipes().map((recipe) => (
                    <RecipeDetails key={recipe._id} recipe={recipe} />
                ))}
            </div>

            <RecipeForm />
        </div>
    );
};

export default Home;
