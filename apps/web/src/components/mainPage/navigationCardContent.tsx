"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ClerkLoading, OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Skeleton } from "@convoform/ui/components/ui/skeleton";
import { toast } from "@convoform/ui/components/ui/use-toast";
import { useAtom } from "jotai";
import { Loader2, Plus } from "lucide-react";

import {
  isLoadingWorkspacesAtom,
  workspacesAtom,
} from "@/lib/atoms/workspaceAtoms";
import {
  createWorkspaceController,
  getWorkspacesController,
} from "@/lib/controllers/workspace";
import { NavigationConfig } from "@/lib/types/navigation";
import BrandName from "../common/brandName";
import { NavigationLinks } from "./mainNavigation/mainNavigation";

type State = {
  isCreatingWorkspace: boolean;
};

type Props = {
  orgId: string;
};

export function NavigationCardContent({ orgId }: Readonly<Props>) {
  const [state, setState] = useState<State>({
    isCreatingWorkspace: false,
  });
  const { isCreatingWorkspace } = state;
  const [workspaces, setWorkspaces] = useAtom(workspacesAtom);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useAtom(
    isLoadingWorkspacesAtom,
  );
  const router = useRouter();

  const createWorkspaceActionIcon = isCreatingWorkspace ? (
    <Loader2 className=" h-4 w-4 animate-spin" />
  ) : (
    <Plus className="h-5 w-5" />
  );

  const pathname = usePathname();

  const createNewWorkspace = async () => {
    setState((cs) => ({ ...cs, isCreatingWorkspace: true }));
    try {
      const newWorkspace = await createWorkspaceController("New Workspace");

      toast({
        title: "Workspace created",
        duration: 1500,
      });
      setWorkspaces([...workspaces, newWorkspace]);
      router.push(`/workspaces/${newWorkspace.id}/`);
    } catch (error) {
      toast({
        title: "Unable to create workspace",
        duration: 1500,
        variant: "destructive",
      });
    } finally {
      setState((cs) => ({ ...cs, isCreatingWorkspace: false }));
    }
  };

  const workspacesLinks = useMemo(() => {
    return workspaces.length > 0
      ? workspaces.map((workspace) => ({
          name: workspace.name,
          path: `/workspaces/${workspace.id}`,
          isActive: pathname.includes(`${workspace.id}`),
        }))
      : [
          {
            text: "No workspaces",
          },
        ];
  }, [workspaces, pathname]);

  const navigationLinks = useMemo<NavigationConfig>(
    () =>
      [
        {
          name: "Dashboard",
          path: "/dashboard",
          isActive: pathname.includes("dashboard"),
        },
        {
          title: "Workspaces",
          action: {
            icon: createWorkspaceActionIcon,
            onClick: createNewWorkspace,
            disabled: isCreatingWorkspace,
          },
          links: isLoadingWorkspaces
            ? [
                {
                  text: "Loading workspaces",
                },
              ]
            : workspacesLinks,
        },
      ] as NavigationConfig,
    [workspacesLinks, pathname, isCreatingWorkspace, isLoadingWorkspaces],
  );

  const UserActions = () => (
    <>
      <ClerkLoading>
        <Skeleton className="h-10 w-full animate-pulse rounded-full" />
        <Skeleton className="h-10 w-10 animate-pulse rounded-full" />
      </ClerkLoading>
      <OrganizationSwitcher
        afterSelectOrganizationUrl="/dashboard"
        hidePersonal
        afterLeaveOrganizationUrl="/organizations"
      />
      <UserButton />
    </>
  );

  useEffect(() => {
    setWorkspaces([]);
    setIsLoadingWorkspaces(true);
    if (orgId) {
      (async () => {
        try {
          const workspaces = await getWorkspacesController(orgId);
          setWorkspaces(workspaces);
          setIsLoadingWorkspaces(false);
        } catch (error) {
          toast({
            title: "Unable to fetch workspaces",
            duration: 1500,
            variant: "destructive",
          });
        }
      })();
    }
  }, [orgId]);

  return (
    <nav className="flex h-full flex-col justify-between lg:p-5">
      <div>
        <div className="mb-5 flex flex-col gap-3 ps-4">
          <div>
            <BrandName className="text-xl lg:text-2xl" />
          </div>
          <div className="flex items-center justify-between gap-2 lg:hidden lg:justify-evenly">
            <UserActions />
          </div>
        </div>
        <NavigationLinks navigationLinks={navigationLinks} />
      </div>
      <div className="max-lg:hidden">
        <div className="flex items-center justify-between gap-2 lg:justify-evenly">
          <UserActions />
        </div>
      </div>
    </nav>
  );
}

export default NavigationCardContent;
