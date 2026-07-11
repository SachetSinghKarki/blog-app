"use client";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserButton() {
  const { data: session } = authClient.useSession();
  const router= useRouter()

  if (!session) {
    return null;
  }

  const initials = session.user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="ghost" className="h-auto gap-3 px-2 py-2">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={session.user.image ?? ""}
              alt={session.user.name}
            />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{session.user.name}</span>

            <span className="text-muted-foreground text-xs">
              {session.user.email}
            </span>
          </div>

          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();

            router.push('/sign-in')
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
