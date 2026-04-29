import IngredientForm from "@/forms/ingredient.form";
import IngredientsTable from "@/components/UI/tables/ingredients";

const IngredientsPage = () => {
  return (
    <div>
      <IngredientForm />
      <IngredientsTable />
    </div>
  );
};

export default IngredientsPage;