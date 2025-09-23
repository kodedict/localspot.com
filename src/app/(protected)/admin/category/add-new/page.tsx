import BackButton from "@/components/page/admin/back-button";
import CategoryForm from "@/components/page/admin/category/category-form";

const AddCategoryPage = () => {
    return (
        <div>
            <div>
                <BackButton to="/admin/category" />
                <h1 className="page-title">Add category</h1>
            </div>
            <CategoryForm />
        </div>
    );
}

export default AddCategoryPage