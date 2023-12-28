"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Backdrop from "../Backdrop";
import Link from "next/link";
import UserMenuItem from "./UserMenuItem";
import { signOut } from "next-auth/react";

interface Props {
  currentUser: User | null;
}

const UserMenu: React.FC<Props> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div>{currentUser && currentUser.name}</div>
        <AiFillCaretDown />
      </div>
      {isMenuOpen && <Backdrop onClick={toggleMenu} />}
      {isMenuOpen && (
        <div
          className="absolute flex flex-col w-[170px] top-12 right-0 z-30
          text-sm bg-white overflow-hidden shadow-md cursor-pointer rounded-md"
        >
          {!currentUser && (
            <div>
              <Link href="/signin">
                <UserMenuItem onClick={toggleMenu}>Sign In</UserMenuItem>
              </Link>
              <Link href="/signup">
                <UserMenuItem onClick={toggleMenu}>Sign Up</UserMenuItem>
              </Link>
            </div>
          )}
          {currentUser && currentUser.role === "ADMIN" && (
            <div>
              <Link href="/admin">
                <UserMenuItem onClick={toggleMenu}>Admin</UserMenuItem>
              </Link>
            </div>
          )}
          {currentUser && (
            <div>
              <div>
                <Link href="/dashboard">
                  <UserMenuItem onClick={toggleMenu}>Dashboard</UserMenuItem>
                </Link>
              </div>
              <div>
                <Link href="/orders">
                  <UserMenuItem onClick={toggleMenu}>Orders</UserMenuItem>
                </Link>
              </div>
              <UserMenuItem
                onClick={() => {
                  toggleMenu();
                  signOut();
                }}
              >
                Sign Out
              </UserMenuItem>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
