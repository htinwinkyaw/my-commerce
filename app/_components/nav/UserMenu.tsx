"use client";

import React, { useState } from "react";

import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "./Avatar";
import Backdrop from "../ui/Backdrop";
import Link from "next/link";
import { User } from "@prisma/client";
import UserMenuItem from "./UserMenuItem";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  currentUser: User | null;
}

const UserMenu: React.FC<Props> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative z-30">
      <div
        onClick={toggleMenu}
        className="flex items-center gap-1 p-2 text-slate-700
         border-[1px] border-slate-400 rounded-full cursor-pointer transition"
      >
        <Avatar src={currentUser ? currentUser.image : null} />
        <div className="hidden md:block">{currentUser && currentUser.name}</div>
        <AiFillCaretDown />
      </div>
      {isMenuOpen && <Backdrop onClick={toggleMenu} />}
      {isMenuOpen && (
        <div
          className="absolute flex flex-col w-[170px] top-12 right-0 z-30
          text-sm bg-white overflow-hidden shadow-md cursor-pointer rounded-md"
        >
          {!currentUser && (
            <>
              <Link href="/signin">
                <UserMenuItem onClick={toggleMenu}>Sign In</UserMenuItem>
              </Link>
              <Link href="/signup">
                <UserMenuItem onClick={toggleMenu}>Sign Up</UserMenuItem>
              </Link>
            </>
          )}
          {currentUser && currentUser.role === "ADMIN" && (
            <>
              <Link href="/admin">
                <UserMenuItem onClick={toggleMenu}>Admin</UserMenuItem>
              </Link>
            </>
          )}
          {currentUser && (
            <>
              <Link href="/profile">
                <UserMenuItem onClick={toggleMenu}>Profile</UserMenuItem>
              </Link>

              <Link href="/orders">
                <UserMenuItem onClick={toggleMenu}>Orders</UserMenuItem>
              </Link>

              <UserMenuItem
                onClick={() => {
                  toggleMenu();
                  signOut().then(() => {
                    toast.success("Signed out.");
                    router.push("/");
                  });
                }}
              >
                Sign Out
              </UserMenuItem>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
