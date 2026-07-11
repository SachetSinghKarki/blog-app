import { UserButton } from "./user-button";

export function AppNavbar() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-lg font-semibold">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
}