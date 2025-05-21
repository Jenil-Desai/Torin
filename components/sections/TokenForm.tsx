"use client";
import { CreateTokenSchema, createTokenSchema } from "@/schemas/CreateTokenSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtensionType, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, getMintLen } from "@solana/spl-token";
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export default function TokenForm() {
  const { connection } = useConnection();
  const wallet = useWallet();
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
    if (!wallet.connected || !wallet.publicKey) {
      toast.error("Please connect your wallet first.");
      return;
    }
    const mintKeypair = Keypair.generate();

    const metadata = {
      mint: mintKeypair.publicKey,
      name: data.name,
      symbol: data.symbol,
      uri: data.imageUrl,
      additionalMetadata: [],
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
      createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mintKeypair.publicKey,
        metadata: mintKeypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      }),
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(mintKeypair);

    await wallet.sendTransaction(transaction, connection);
    toast.success("Token created successfully!");
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
                disabled={form.formState.isSubmitting}
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
                disabled={form.formState.isSubmitting}
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
              disabled={form.formState.isSubmitting}
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
              disabled={form.formState.isSubmitting}
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
              disabled={form.formState.isSubmitting}
              className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
            >
              {form.formState.isSubmitting ? "Creating Token..." : "Create Token"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
