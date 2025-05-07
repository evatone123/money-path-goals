
import { useState } from "react";
import Layout from "@/components/Layout";
import { categories as initialCategories, Category } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddCategoryForm from "@/components/Categories/AddCategoryForm";
import { useToast } from "@/hooks/use-toast";

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCategory = (newCategory: Category) => {
    // Check if category with same name already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.name.toLowerCase())) {
      toast({
        title: "Error",
        description: "A category with this name already exists.",
        variant: "destructive"
      });
      return;
    }
    
    setCategories([...categories, newCategory]);
    setIsCategoryDialogOpen(false);
    
    toast({
      title: "Category added",
      description: `${newCategory.name} has been added successfully`,
    });
  };
  
  const handleCancelAddCategory = () => {
    setIsCategoryDialogOpen(false);
  };

  const deleteCategory = (categoryName: string) => {
    setCategories(categories.filter(cat => cat.name !== categoryName));
    toast({
      description: "Category deleted successfully",
    });
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Categories</h2>
          <p className="text-gray-500">Manage your expense and income categories</p>
        </div>
        <Button className="gradient-purple" onClick={() => setIsCategoryDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="budget-card flex items-center justify-between p-4 transition-all hover:scale-102"
          >
            <div className="flex items-center">
              <div 
                className="h-6 w-6 rounded-full mr-3" 
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="font-medium">{category.name}</span>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:bg-red-100" 
                onClick={() => deleteCategory(category.name)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Create a new expense category with a custom color.
            </DialogDescription>
          </DialogHeader>
          <AddCategoryForm onSubmit={handleAddCategory} onCancel={handleCancelAddCategory} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Categories;
