"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTokenSchema, createTokenSchema } from "@/schemas/CreateTokenSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export default function TokenForm() {
  const form = useForm({
    resolver: zodResolver(createTokenSchema),
    defaultValues: {
      name: "",
      symbol: "",
      imageUrl: "",
      initialSupply: 0,
    },
  })

  async function onSubmit(data: CreateTokenSchema) {
    console.log("Form submitted with data:", data);
  }

  return (
    <div className="form-container mx-auto">
      <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-3xl"></div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="flex space-x-6 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Token Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Solana Token"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Token Symbol</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., SOL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initialSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Supply</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 1000000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
            >
              {true ? "Creating Token..." : "Create Token"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
