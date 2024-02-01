"use client";

import {
  MdDashboard,
  MdDiamond,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";

import AdminNavItem from "./AdminNavItem";
import Container from "../ui/Container";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full pt-4 border-b-[1px] shadow-sm">
      <Container>
        <div className="flex flex-nowrap items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/banners">
            <AdminNavItem
              label="Banners"
              icon={MdDiamond}
              selected={pathname === "/admin/banners"}
            />
          </Link>
          <Link href="/admin/add-product">
            <AdminNavItem
              label="Add Product"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-product"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
          <Link href="/admin/manage-categories">
            <AdminNavItem
              label="Manage Categories"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-categories"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
