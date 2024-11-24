import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/@ui/sidebar.tsx';
import {
  groups,
  SIDEBAR_MENU,
} from '@/components/app-sidebar/model/menu.constant.ts';
import {
  useCurrentMenu,
  useMenuActions,
} from '@/components/app-sidebar/model/menu.store.ts';

export function AppSidebar() {
  const currentMenu = useCurrentMenu();
  const { changeMenu } = useMenuActions();

  const checkIsCurrentMenu = (menu: SIDEBAR_MENU) => menu === currentMenu;
  const handleClickMenu = (menu: SIDEBAR_MENU) => changeMenu(menu);

  return (
    <Sidebar>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.key}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      isActive={checkIsCurrentMenu(item.key)}
                      onClick={() => handleClickMenu(item.key)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
