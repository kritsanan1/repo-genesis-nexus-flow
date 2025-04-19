
import { ReactNode } from "react";
import { Header } from "@/components/Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">{children}</main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>Repo Genesis © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
