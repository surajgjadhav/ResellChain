"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import SideBar from "../SideBar";
import { RoutePathEnum } from "@/enums/RoutePaths";
import { Menu } from "lucide-react";

export interface Navigation {
  name: string;
  href: string;
}

const navigation: Navigation[] = [
  { name: "Marketplace", href: RoutePathEnum.MARKETPLACE },
  { name: "Ask AI", href: RoutePathEnum.ASK_AGENT },
  { name: "List Product", href: RoutePathEnum.LIST_PRODUCT },
  { name: "Portfolio", href: RoutePathEnum.PORTFOLIO },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href={RoutePathEnum.HOME}>
            <Image
              alt="Resell Chain"
              src="/logo.png"
              width={512}
              height={512}
              className="w-12 h-12 rounded"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ConnectButton />
        </div>
      </nav>
      <SideBar
        navigation={navigation}
        open={mobileMenuOpen}
        onCloseDialog={setMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
