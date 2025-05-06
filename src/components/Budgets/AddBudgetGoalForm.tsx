
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { expenseCategories } from "@/lib/data";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define form schema using zod
const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddBudgetGoalFormProps {
  onSubmit: (data: { id: string, category: any, amount: number, spent: number }) => void;
  onCancel: () => void;
}

const AddBudgetGoalForm = ({ onSubmit, onCancel }: AddBudgetGoalFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: 0,
    },
  });

  const handleSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create a new budget goal with zero spent initially
      const newGoal = {
        id: `goal-${uuidv4()}`,
        category: data.category as any,
        amount: data.amount,
        spent: 0,
      };
      
      onSubmit(newGoal);
      toast({
        title: "Budget Goal Added",
        description: `New ${data.category} budget goal created successfully.`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add budget goal. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding budget goal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Budget Goal"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddBudgetGoalForm;
