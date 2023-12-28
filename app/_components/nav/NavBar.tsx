import Link from "next/link";
import React from "react";
import Container from "../Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import UserMenu from "./UserMenu";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full z-30 bg-slate-200 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/" className="font-bold text-2xl text-slate-700">
              MYCOMM
            </Link>
            <div className="hidden md:block">SEARCH BAR</div>
            <div className="flex items-center gap-8 md:gap-12">
              <div>CART</div>
              <div>
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
