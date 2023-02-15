import styles from "../page.module.css";
import "../../app/globals.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

const AnnoucementsCard = ({ annoucementsData }: { annoucementsData: any }) => {
  const mockdata = [
    { label: "4 passengers", icon: avatar },
    { label: "100 km/h in 4 seconds", icon: avatar },
    { label: "Automatic gearbox", icon: avatar },
    { label: "Electric", icon: avatar },
  ];
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={18} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text weight={500}>Tesla Model S</Text>
          <Text size="xs" color="dimmed">
            Free recharge at any station
          </Text>
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text size="sm" color="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group spacing={8} mb={-8}>
          blabla
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
              $168.00
            </Text>
            <Text
              size="sm"
              color="dimmed"
              weight={500}
              sx={{ lineHeight: 1 }}
              mt={3}
            >
              per day
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }}>
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

const UserCardImage = () => {
  const { classes, theme } = useStyles();

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
          bif
        </Text>
        <Text align="center" size="sm" color="dimmed">
          engineer
        </Text>
        <Group mt="md" position="center" spacing={30}>
          test
        </Group>
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
      <Grid className="mt-4">
        {userData.posts.map((annoucementsData) => (
          <Grid.Col span={4} key={annoucementsData.id}>
            <AnnouncementsMiniCards key={annoucementsData.id} />
          </Grid.Col>
        ))}
      </Grid>
    </main>
  );
};

export default UserCardImage;
