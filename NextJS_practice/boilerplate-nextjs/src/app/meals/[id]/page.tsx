interface Props {
  params: { id: string };
}

interface MealDetail {
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

export default async function MealDetailPage({ params }: Props) {
  const { id } = params;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  const meal: MealDetail = data?.meals?.[0];

  if (!meal) {
    return <div>Meal not Found.</div>
  }

  return (
    <div>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width={300} />
      <p>{meal.strInstructions.slice(0, 300)}...</p>
    </div>
  );
}
