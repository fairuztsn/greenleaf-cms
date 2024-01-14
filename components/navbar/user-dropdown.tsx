import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Loading from "../loading/loading";
import { getSupabaseSession } from "@/utils/session";

export const UserDropdown = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push("/login")
  }

  useEffect(() => {
    async function getUser() {
      const user = (await supabase.auth.getUser()).data.user
      setUser(user)
    }
    getUser();
  }, []);

  if(isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading/>
      </div>
    )
  }
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger " onClick={handleSignOut}>
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};