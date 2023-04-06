import { Avatar, Modal, Paper, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import React from "react";
import photos from "@/assets/default_car.jpg";
import { Image } from "@mantine/core";
import data from "@/context/data.json";
import { AiOutlineHeart } from "react-icons/ai";
import { Card, Text, Badge, Button, Group } from "@mantine/core";

import defaultImage from "@/assets/author.jpg";
import { Tex } from "tabler-icons-react";
import axios from "axios";

const AnnouncerCard = ({ announcerData }: { announcerData: any }) => {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={defaultImage.src} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {announcerData?.firstName} {announcerData?.lastName}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {announcerData?.email}
      </Text>

      <Button variant="default" fullWidth mt="md">
        show profile
      </Button>
      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
};

const CarListItemModal = ({
  post,
  showModal,
  setShowModal,
}: {
  post: any;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useMantineTheme();
  // console.log("post", post);
  const [announcer, setAnnouncer] = React.useState<any>();

  const fetchAnnouncer = async () => {
    try {
      const res = await axios
        .get(`http://localhost:3000/users/${post.authorId}`)
        .then((res) => {
          // console.log(res.data);
          setAnnouncer(res.data);
          // console.log(posts.car_image);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const imageLink = post.car_image[0].split("./");
  const configs = post.car_config.split(",");

  React.useEffect(() => {
    fetchAnnouncer();
    // console.log("announcer", announcer);
  }, []);

  return (
    <Modal
      overflow="inside"
      centered
      opened={showModal}
      onClose={() => setShowModal(false)}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      transitionDuration={300}
      transitionTimingFunction="ease"
      size="80%"
    >
      <div className="w-full flex flex-col justify-between gap-8">
        <div className="flex h-96 flex-row justify-center items-center">
          <div className="w-1/2 h-60 flex flex-col justify-around  gap-4">
            <div className=" h-60  w-full flex justify-center items-center">
              <Image
                src={`http://localhost:3000/${imageLink[1]}`}
                width="auto"
                height={350}
                alt="car"
              />
            </div>
          </div>
          <div className="w-1/3 p-2">
            <AnnouncerCard announcerData={announcer} />
          </div>
        </div>
        <div className="pl-20">
          <div className="mt-3 h-px bg-gray-200 w-full" />
          <Group position="apart" mt="md" className="w-3/4">
            <div>
              <div className="flex flex-row justify-between">
                <Text weight={500}>{post.car_price}</Text>
                <Text weight={500}>{post.car_name}</Text>
              </div>
              <Text size="xs" color="dimmed">
                Free recharge at any station
              </Text>
            </div>
            <Badge variant="outline">25% off</Badge>
          </Group>
          <div className="my-3 h-px bg-gray-200 w-full" />
          <Card.Section mt="md">
            <Text size="sm" color="dimmed">
              Basic configuration
            </Text>
            <Group spacing={8}>
              {configs.map((config: any) => (
                <Badge key={config} variant="outline">
                  {config}
                </Badge>
              ))}
            </Group>
          </Card.Section>
          <div className="mt-4 h-px bg-gray-200 w-full" />
          <Card.Section mt="md">
            <Text size="md" color="dimmed">
              Description
            </Text>
            <Text size="sm" color="dimmed">
              {post.car_description}
            </Text>
          </Card.Section>
        </div>
      </div>
      <Button
        variant="default"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => alert("Booking Coming Soon")}
      >
        Book Now
      </Button>
    </Modal>
  );
};

export default CarListItemModal;
