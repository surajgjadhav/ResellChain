"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "../Header";
import { RoutePathEnum } from "@/enums/RoutePaths";
import { X } from "lucide-react";

export interface SideBarProps {
  navigation: Navigation[];
  open: boolean;
  onClose: () => void;
  onCloseDialog: (value: boolean) => void;
}

const SideBar = ({
  navigation,
  open,
  onClose,
  onCloseDialog,
}: SideBarProps) => {
  return (
    <Dialog open={open} onClose={onCloseDialog} className="lg:hidden">
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href={RoutePathEnum.HOME}>
            <Image
              alt="Resell Chain"
              src="/logo.png"
              width={512}
              height={512}
              className="w-12 h-12 rounded"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6">
              <ConnectButton />
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default SideBar;
