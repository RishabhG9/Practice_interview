import Link from "next/link";
import { MealLink } from "./components/MealLink";

interface Meal {
  idMeal: string;
  strMeal: string;
}

export default async function MealsPage() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
  const data = await res.json();
  const meals: Meal[] = data.meals;

  return (
    <div>
      <h1>Meals</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            {/* <Link href={`/meals/${meal.idMeal}`}>{meal.strMeal}</Link> */}
            <MealLink id={meal.idMeal} name={meal.strMeal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
