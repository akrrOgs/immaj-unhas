import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "@/auth";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const Navbar = ({ name }: { name: string }) => {
  return (
    <div className="bg-blue-600 text-white py-4 px-20 h-16 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Welcome Back, {name} ...👋</h1>
      <div className="glex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="bg-white text-gray-900 cursor-pointer text-sm w-10 h-10 flex items-center justify-center">
              <AvatarFallback className="text-gray-900 font-bold">
                {name ? getInitials({ name: name }) : ""}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuLabel className="text-center font-semibold text-gray-900">
              {name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/">Front Pages</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/frontend/articles">Articles Pages</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full">
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/signin" });
                }}
                className="w-full cursor-pointer"
              >
                <Button
                  type="submit"
                  variant="destructive"
                  className="flex gap-2"
                >
                  <LogOut className="size-4 text-white" />
                  Logout
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
