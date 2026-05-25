"use client";

import { type PropsWithChildren } from "react";
import { Portal as RadixPortal } from "@radix-ui/react-portal";

type PortalProps = PropsWithChildren<{
  container?: HTMLElement | null;
}>;

export const Portal = ({ children, container }: PortalProps) => {
  return <RadixPortal container={container}>{children}</RadixPortal>;
};
