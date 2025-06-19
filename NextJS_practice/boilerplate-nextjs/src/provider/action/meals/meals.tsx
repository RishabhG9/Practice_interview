import axios from "axios";
import { AppDispatch } from "@/store";
import { setError, setLoading, setMeals } from "@/provider/reducer/meals/meals";
// import { setMeals, setLoading, setError } from "@/redux/reducer/meals/meals";


export const fetchMeals = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
    dispatch(setMeals(res.data.meals));
  } catch (error: any) {
    dispatch(setError(error.message || "Failed to fetch meals"));
  } finally {
    dispatch(setLoading(false));
  }
};
