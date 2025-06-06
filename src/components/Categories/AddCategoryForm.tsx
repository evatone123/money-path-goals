
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExpenseCategory } from "@/lib/data";

// Define form schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  color: z.string().min(1, "Color is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCategoryFormProps {
  onSubmit: (data: { name: ExpenseCategory; color: string }) => void;
  onCancel: () => void;
}

const AddCategoryForm = ({ onSubmit, onCancel }: AddCategoryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "#9b87f5", // Default to primary purple color
    },
  });

  const handleSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      onSubmit({
        name: data.name as ExpenseCategory,
        color: data.color,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter category name" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <div className="flex gap-3 items-center">
                <FormControl>
                  <Input
                    type="color"
                    className="w-14 h-10 p-1 cursor-pointer"
                    {...field}
                  />
                </FormControl>
                <div 
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: field.value }}
                ></div>
                <span className="text-sm text-muted-foreground">{field.value}</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
