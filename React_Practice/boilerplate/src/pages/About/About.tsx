import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeals, fetchRandomMeal } from '../../redux/action/meals/meals_action';
import { RootState, AppDispatch } from '../../redux/store/store';
import {
  selectMeals,
  selectMealsListError,
  selectMealsListLoading,
  selectRandomMeal,
  selectRandomMealError,
  selectRandomMealLoading
} from '../../redux/selector/meals/meals_selector';


export const About = () => {
  const dispatch = useDispatch<AppDispatch>();

  const meals = useSelector(selectMeals);
  const randomMeal = useSelector(selectRandomMeal);
  const mealsLoading = useSelector(selectMealsListLoading);
  const randomMealLoading = useSelector(selectRandomMealLoading);
  const mealsError = useSelector(selectMealsListError);
  const randomMealError = useSelector(selectRandomMealError);

  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchRandomMeal());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-6">
      <section>
        <h1 className="text-2xl font-bold mb-2">Meal List</h1>
        {mealsLoading && <p>Loading meals...</p>}
        {mealsError && <p className="text-red-500">Error: {mealsError}</p>}
        <ul className="grid grid-cols-2 gap-4">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="border p-2 rounded">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover mb-2" />
              <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
              <p className="text-sm text-gray-500">{meal.strCategory}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-2">Random Meal</h1>
        {randomMealLoading && <p>Loading random meal...</p>}
        {randomMealError && <p className="text-red-500">Error: {randomMealError}</p>}
        {randomMeal && (
          <div className="border p-4 rounded shadow w-full max-w-md">
            <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{randomMeal.strMeal}</h2>
            <p className="text-sm text-gray-600">{randomMeal.strCategory}</p>
          </div>
        )}
      </section>
    </div>
  );
}
