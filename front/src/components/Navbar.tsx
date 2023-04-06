"use client";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  Image,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../assets/logo.png";

import { useState, useEffect, Fragment } from "react";
import SignUpModal from "@/modals/SignUpModal";
import Link from "next/link";
import LoginModal from "@/modals/loginModal";
import PostModal from "@/modals/PostModal";
import { Menu, Transition } from "@headlessui/react";
import avatar from "../assets/author.jpg";
const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];
const DropDown = (id: any) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  const [showPostModal, setShowPostModal] = useState(false);

  const handleSignout = async () => {
    const res = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.status === 200) {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("jwt");
      window.location.reload();
    }
  };

  // console.log("id", id);

  return (
    <div className="hidden md:flex">
      <Menu as="div" className="relative inline-block text-left rounded-full">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Image
              src={avatar.src}
              width={20}
              height={20}
              alt="profil"
              radius={50}
            />

            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Home
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    href={`/u/${id.id} `}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Profil
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <p
                    onClick={() => {
                      setShowPostModal(true);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Create Post
                  </p>
                )}
              </Menu.Item>

              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                      onClick={() => {
                        handleSignout();
                      }}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {showPostModal && (
        <PostModal
          showPostModal={showPostModal}
          setShowPostModal={setShowPostModal}
        />
      )}
    </div>
  );
};

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [userData, setUseData] = useState(null as any);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const fetchUser = async () => {
    console.log("fetching user");
    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        credentials: "include",
        method: "GET",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUseData(data);
      setIsLoggedin(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // }, []);
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link href="/" className="p-2">
              <Image src={logo.src} width={160} height={44} alt="logo" />
            </Link>
          </Group>
          {userData ? (
            // <Group className={classes.hiddenMobile}>
            //   <Button
            //     onClick={() => {
            //       setShowPostModal(true);
            //       console.log("test");
            //     }}
            //     variant="default"
            //   >
            //     Create Post
            //   </Button>
            //   <Button
            //     onClick={() => {
            //       setShowLoginModal(true);
            //     }}
            //     variant="default"
            //   >
            //     Log out
            //   </Button>
            // </Group>
            <>
              <DropDown id={userData?.id} />
            </>
          ) : (
            <Group className={classes.hiddenMobile}>
              <Button
                onClick={() => {
                  setShowLoginModal(true);
                }}
                variant="default"
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  setShowSignupModal(true);
                  console.log(showSignupModal);
                }}
                variant="default"
              >
                Sign up
              </Button>
            </Group>
          )}
          {/* <Group className={classes.hiddenMobile}>
            <Button onClick={() => {setShowLoginModal(true)}} variant="default">Log in</Button>
            <Button onClick={() => {setShowSignupModal(true);console.log(showSignupModal)}} >Sign up</Button>
          </Group> */}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link href="/" className={classes.link}>
            Home
          </Link>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link href={`/u/${userData?.id}`} className={classes.link}>
            profilem
          </Link>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          {userData ? (
            <Group position="center" grow pb="xl" px="md">
              <Button
                variant="default"
                onClick={() => {
                  setShowPostModal(true);
                  toggleDrawer();
                }}
              >
                Create Post
              </Button>
              <Button
                onClick={() => {
                  setShowLoginModal(true);
                }}
                variant="default"
              >
                Log out
              </Button>
            </Group>
          ) : (
            <Group position="center" grow pb="xl" px="md">
              <Button
                variant="default"
                onClick={() => {
                  setShowLoginModal(true);
                  toggleDrawer();
                }}
              >
                log inm
              </Button>
              <Button
                onClick={() => {
                  setShowSignupModal(true);
                  toggleDrawer();
                }}
                variant="default"
              >
                Sign up
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
      <div>
        {showSignupModal && (
          <SignUpModal
            showSignupModal={showSignupModal}
            setShowSignupModal={setShowSignupModal}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onSuccess={() => {
              fetchUser();
              setShowLoginModal(false);
            }}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
        )}
        {showPostModal && (
          <PostModal
            showPostModal={showPostModal}
            setShowPostModal={setShowPostModal}
          />
        )}
      </div>
    </Box>
  );
};

export default Navbar;
