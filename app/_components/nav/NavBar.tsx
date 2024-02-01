import Container from "../ui/Container";
import Link from "next/link";
import NavCart from "./NavCart";
import React from "react";
import Search from "./Search";
import UserMenu from "./UserMenu";
import userServices from "@/server/services/api/userServices";

const NavBar = async () => {
  const currentUser = await userServices.getCurrentUser();

  return (
    <>
      <div className="sticky top-0 w-full z-30 bg-slate-200 shadow-sm">
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex items-center justify-between gap-3 md:gap-0">
              <Link href="/" className="font-bold text-2xl text-slate-700">
                MYCOM
              </Link>
              <div className="hidden md:block">
                <Search />
              </div>
              <div className="flex items-center gap-8 md:gap-12">
                <NavCart />
                <div>
                  <UserMenu currentUser={currentUser} />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default NavBar;
