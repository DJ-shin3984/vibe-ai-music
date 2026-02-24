"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { WorkspaceBar } from "@/components/WorkspaceBar";

/**
 * 경로에 따라 AppHeader 또는 WorkspaceBar를 렌더한다.
 */
export function HeaderRouter() {
  const pathname = usePathname();
  const isWorkspace = pathname?.startsWith("/workspace") ?? false;

  return isWorkspace ? <WorkspaceBar /> : <AppHeader />;
}
