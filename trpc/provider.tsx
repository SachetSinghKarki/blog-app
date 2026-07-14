"use client";

import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "./query-client";

type Props = {
  children: React.ReactNode;
};

export function TRPCProvider({ children }: Props) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
