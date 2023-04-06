// "use client"
import styles from "../page.module.css";
import "../../app/globals.css";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import userData from "@/context/User.json";
import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Image,
  Badge,
  Center,
  Grid,
  useMantineTheme,
} from "@mantine/core";
import Navbar from "@/components/Navbar";
// import image from "../../assets/default_car.jpg";
import avatar from "../../assets/author.jpg";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons";
import { AnnouncementsMiniCards } from "@/components/AnnouncementsMiniCards";
import { TPost } from "@/global/types";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const UserCardImage = () => {
  const { classes, theme } = useStyles();
  const [userData, setUserData] = useState<any>(null);
  const [posts, setPosts] = useState<any>(null);
  const [postImageLink, setPostImageLink] = useState<any>(null);
  const Axios = axios.create({
    withCredentials: true,
  });

  const fetchPosts = async () => {
    try {
      const res = await Axios.get("http://localhost:3000/post/").then(
        (res) => {
          setPosts(res.data);
          console.log("poooosts", posts);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
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
    setUserData(data);
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);
  // console.log(posts);
  // const breakpoint = useBreakpoint();
  return (
    <main>
      <Navbar />
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Card.Section
          sx={{
            backgroundImage: `url(${"https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"})`,
            height: 300,
          }}
        />
        <Avatar
          src={avatar.src}
          size={180}
          radius={90}
          mx="auto"
          mt={-80}
          className={classes.avatar}
        />
        <Text align="center" size="xl" weight={500} mt="lg">
          {userData?.firstName} {userData?.lastName}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          {userData?.email}
        </Text>
        {/* <Group mt="md" position="center" spacing={30}>
          test
        </Group> */}
        <Group mt="md" position="center" spacing={30}>
          <Button
            radius="md"
            mt="xl"
            size="md"
            color={theme.colorScheme === "dark" ? undefined : "dark"}
          >
            Follow
          </Button>
        </Group>
      </Card>
      <Grid className="mt-4 flex justify-center items-center w-full">
        {posts?.map((annoucementsData: any) => (
          <div
            key={annoucementsData.id}
            className="  flex sm:w-1/2 md:w-1/3 w-full justify-center items-center"
          >
            <AnnouncementsMiniCards
              post={annoucementsData}
              key={annoucementsData.id}
            />
          </div>
        ))}
      </Grid>
    </main>
  );
};

export default UserCardImage;
