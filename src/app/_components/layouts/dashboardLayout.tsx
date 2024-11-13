import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { auth } from "~/server/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-[100vw]">
        {/* Sidebar with a fixed width */}
        <AppSidebar />

        {/* Main content area should fill the rest of the space */}
        <div className="flex-1">
          <div className="flex items-center justify-between p-2 text-sm">
            <SidebarTrigger />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center justify-start gap-2 pr-1">
                  {session ? (
                    <>
                      <Avatar className="max-h-7 max-w-7">
                        <AvatarImage src={session.user.image ?? ""} />
                        <AvatarFallback>
                          {session.user.name ?? "G"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{session.user.name ?? "Guest"}</span>
                    </>
                  ) : (
                    <>
                      <Avatar className="max-h-7 max-w-7">
                        <AvatarImage src="" />
                        <AvatarFallback>G</AvatarFallback>
                      </Avatar>
                      <span>Guest</span>
                    </>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a
                    href={session ? "/api/auth/signout" : "/api/auth/signin"}
                    className="flex items-center justify-center gap-2"
                  >
                    <LogIn className="max-h-4 max-w-4" />
                    <span>{session ? "Sign out" : "Sign in"}</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
