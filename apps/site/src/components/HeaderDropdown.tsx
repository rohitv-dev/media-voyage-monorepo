import { Menu, Button, Divider } from "@mantine/core";
import { IconChevronDown, IconSettings, IconUser, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

export const HeaderDropdown = () => {
  const navigate = useNavigate();

  return (
    <Menu position="bottom-end" width={200} closeOnItemClick={true}>
      <Menu.Target>
        <Button rightSection={<IconChevronDown />} variant="outline">
          wow
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>General</Menu.Label>
        <Menu.Item disabled leftSection={<IconSettings size={18} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconUser size={18} />}>Profile</Menu.Item>
        <Divider size={1} mx="xs" />
        <Menu.Item leftSection={<IconLogout size={18} />} color="red">
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
