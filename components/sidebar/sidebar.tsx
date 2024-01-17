import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, AvatarIcon ,Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import { PeopleAlt, SettingsSuggest } from "@mui/icons-material";
export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const pathsNotUsingDefaultLayout = ["/login", "/signup", "/signin"]

  if(pathsNotUsingDefaultLayout.includes(pathname)) {
    return (
      <div>
      </div>
    )
  }

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/users"}
                title="Users"
                icon={<PeopleAlt />}
                href="users"
              />
              <SidebarItem
                isActive={pathname === "/menu"}
                title="Menu"
                href="menu"
                icon={<MenuIcon />}
              />
              {/* <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              /> */}
              <SidebarItem
                isActive={pathname === "/features"}
                title="Features"
                icon={<SettingsSuggest />}
                href="features"
              />
              {/* <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              /> */}
            </SidebarMenu>

            <SidebarMenu title="General">
              {/* <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              /> */}
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="success">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            {/* <Tooltip content={"Adjustments"} color="success">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip> */}
            <Tooltip content={"Profile"} color="success">
              <Avatar
                as="button"
                color="secondary"
                size="md"
                icon={<AvatarIcon />}
                classNames={{
                base: "bg-[#15b24b]",
                icon: "text-black/80",
              }}
                // isBordered
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
