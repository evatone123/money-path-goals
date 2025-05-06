import { useState } from "react";
import Layout from "@/components/Layout";
import { incomeSources, IncomeSource, IncomeFrequency } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, Category as CategoryIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define form schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Income source name is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  frequency: z.string().min(1, "Frequency is required"),
});

type FormValues = z.infer<typeof formSchema>;

const Income = () => {
  const [sources, setSources] = useState<IncomeSource[]>(incomeSources);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      frequency: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    const newSource: IncomeSource = {
      id: `src-${uuidv4()}`,
      name: data.name,
      amount: data.amount,
      frequency: data.frequency as IncomeFrequency,
      date: new Date(),
    };

    setSources([...sources, newSource]);
    setIsDialogOpen(false);
    form.reset();

    toast({
      title: "Income Source Added",
      description: `Added ${data.name} as a new income source.`,
    });
  };

  const frequencyOptions: { label: string; value: IncomeFrequency }[] = [
    { label: "One-time", value: "one-time" },
    { label: "Weekly", value: "weekly" },
    { label: "Bi-weekly", value: "bi-weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Annually", value: "annually" },
  ];

  const getFrequencyLabel = (frequency: IncomeFrequency): string => {
    const option = frequencyOptions.find((opt) => opt.value === frequency);
    return option ? option.label : frequency;
  };

  const getTotalMonthlyIncome = (): number => {
    return sources.reduce((total, source) => {
      let monthlyAmount = 0;
      switch (source.frequency) {
        case "one-time":
          // For simplicity, we'll count one-time incomes as a single month
          monthlyAmount = source.amount;
          break;
        case "weekly":
          monthlyAmount = source.amount * 4.33; // Average weeks in a month
          break;
        case "bi-weekly":
          monthlyAmount = source.amount * 2.17; // Average bi-weeks in a month
          break;
        case "monthly":
          monthlyAmount = source.amount;
          break;
        case "quarterly":
          monthlyAmount = source.amount / 3;
          break;
        case "annually":
          monthlyAmount = source.amount / 12;
          break;
        default:
          monthlyAmount = source.amount;
      }
      return total + monthlyAmount;
    }, 0);
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Income</h2>
          <p className="text-gray-500">Manage your income sources</p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="gradient-purple"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Income Source
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="budget-card">
            <h3 className="font-medium text-lg mb-4">Income Sources</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Source</th>
                    <th className="py-2 px-4 text-left">Frequency</th>
                    <th className="py-2 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((source) => (
                    <tr key={source.id} className="border-b">
                      <td className="py-3 px-4">{source.name}</td>
                      <td className="py-3 px-4">
                        {getFrequencyLabel(source.frequency)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        ${source.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="budget-card">
            <h3 className="font-medium text-lg mb-4">Income Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Monthly Income</p>
                <p className="text-2xl font-bold text-budget-green">
                  ${getTotalMonthlyIncome().toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Income Sources</p>
                <p className="text-2xl font-bold">{sources.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Income Source</DialogTitle>
            <DialogDescription>
              Add a new source of income to track your earnings.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Salary, Freelance, Investments"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          $
                        </span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="pl-7"
                          step="0.01"
                          min="0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {frequencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Income Source</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Income;
