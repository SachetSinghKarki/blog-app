import Image from "next/image";
import Link from "next/link";

import { dashboardNavigation } from "../constants/navigation";

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-background">
      {/* Logo */}
      <div className="border-b p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="MindSpace Logo"
            width={40}
            height={40}
            priority
          />

          <span className="text-xl font-bold">
            MindSpace
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2 p-4">
        {dashboardNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-muted flex items-center gap-3 rounded-lg px-4 py-3 transition-colors"
            >
              <Icon className="h-5 w-5" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}