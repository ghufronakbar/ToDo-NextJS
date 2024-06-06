import { Box, Center, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useQuery } from "@tanstack/react-query";
import { secondaryColor } from "@/lib/color";


export function SidebarMenu() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <Sidebar>
        <br />
        <Box
          p={3}
          mx={2}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Stack onClick={() => router.push(`/admin/profile`)}>
            <Text
              as="b"
              fontSize="2xl"
              color={secondaryColor}
              textAlign="center"
            >
              To Do App
            </Text>
          </Stack>
        </Box>
        <br />
        <br />
        <Menu>
          <MenuItem onClick={() => router.push(`/todo`)}>📃 To Do</MenuItem>
          <MenuItem onClick={handleLogout}>🔒 Logout</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
