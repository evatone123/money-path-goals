
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, X } from "lucide-react";
import { currencies as initialCurrencies } from "@/lib/data";

const Settings = () => {
  const { toast } = useToast();
  const [currencies, setCurrencies] = useState(initialCurrencies);
  const [newCurrency, setNewCurrency] = useState({ code: "", symbol: "", name: "" });
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };

  const handleAddCurrency = () => {
    // Validate inputs
    if (!newCurrency.code || !newCurrency.symbol || !newCurrency.name) {
      toast({
        title: "Error",
        description: "All currency fields are required",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate currency code
    if (currencies.some(c => c.code === newCurrency.code)) {
      toast({
        title: "Error",
        description: "A currency with this code already exists",
        variant: "destructive"
      });
      return;
    }

    const updatedCurrencies = [...currencies, newCurrency];
    setCurrencies(updatedCurrencies);
    setNewCurrency({ code: "", symbol: "", name: "" });
    
    toast({
      title: "Currency added",
      description: `${newCurrency.name} (${newCurrency.code}) has been added successfully`,
    });
  };

  const removeCurrency = (codeToRemove) => {
    // Prevent removing default currency
    if (codeToRemove === defaultCurrency) {
      toast({
        title: "Error",
        description: "Cannot remove default currency",
        variant: "destructive"
      });
      return;
    }
    
    setCurrencies(currencies.filter(c => c.code !== codeToRemove));
    toast({
      description: "Currency removed successfully",
    });
  };

  const setAsDefaultCurrency = (code) => {
    setDefaultCurrency(code);
    toast({
      description: `${code} set as default currency`,
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="currencies">Currencies</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="A short bio about yourself" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="currencies">
          <Card>
            <CardHeader>
              <CardTitle>Currency Management</CardTitle>
              <CardDescription>Add, remove, and set default currencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency-code">Currency Code</Label>
                  <Input 
                    id="currency-code" 
                    placeholder="e.g., USD" 
                    value={newCurrency.code}
                    onChange={(e) => setNewCurrency({...newCurrency, code: e.target.value.toUpperCase()})}
                    maxLength={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency-symbol">Currency Symbol</Label>
                  <Input 
                    id="currency-symbol" 
                    placeholder="e.g., $" 
                    value={newCurrency.symbol}
                    onChange={(e) => setNewCurrency({...newCurrency, symbol: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency-name">Currency Name</Label>
                  <Input 
                    id="currency-name" 
                    placeholder="e.g., US Dollar" 
                    value={newCurrency.name}
                    onChange={(e) => setNewCurrency({...newCurrency, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddCurrency} className="gradient-purple">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Currency
                </Button>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Available Currencies</h3>
                <div className="space-y-2">
                  {currencies.map((currency) => (
                    <div key={currency.code} className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
                      <div className="flex items-center">
                        <span className="w-10 text-center font-bold">{currency.symbol}</span>
                        <span className="ml-2">
                          {currency.name} ({currency.code})
                          {defaultCurrency === currency.code && (
                            <span className="ml-2 text-xs bg-budget-purple text-white px-2 py-0.5 rounded-full">Default</span>
                          )}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {defaultCurrency !== currency.code && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setAsDefaultCurrency(currency.code)}
                          >
                            Set as Default
                          </Button>
                        )}
                        {defaultCurrency !== currency.code && (
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-destructive hover:bg-destructive hover:text-white"
                            onClick={() => removeCurrency(currency.code)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Currency Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email about account activity</p>
                </div>
                <Switch defaultChecked id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Budget Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when you're close to your budget limit</p>
                </div>
                <Switch defaultChecked id="budget-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Expense Reminders</p>
                  <p className="text-sm text-gray-500">Remind you of recurring expenses</p>
                </div>
                <Switch id="expense-reminders" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how MoneyPath looks for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compact View</p>
                  <p className="text-sm text-gray-500">Show more information on screen</p>
                </div>
                <Switch id="compact-view" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;
