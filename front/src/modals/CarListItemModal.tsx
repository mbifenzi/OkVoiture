import { Avatar, Modal, Paper, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import React from "react";
import photos from "@/assets/default_car.jpg";
import Image from "next/image";
import data from "@/context/data.json";
import { AiOutlineHeart } from "react-icons/ai";
import { Card, Text, Badge, Button, Group } from "@mantine/core";

import defaultImage from "@/assets/author.jpg";

const AnnouncerCard = ({ announcerData }: { announcerData: any }) => {
  console.log(announcerData.name);
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
        {announcerData.name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {announcerData.email}
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
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useMantineTheme();
  // console.log(data);
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
        <div className="flex flex-row justify-center items-center">
          <div className="w-2/3 flex flex-col justify-around  gap-4">
            <div className=" h-400px w-full flex justify-center items-center">
              <Carousel
                sx={{ maxWidth: 320 }}
                height="100%"
                nextControlIcon={<AiOutlineHeart size={16} />}
                previousControlIcon={<AiOutlineHeart size={16} />}
              >
                {data[0].car_image.map((photo) => (
                  <Carousel.Slide key={photo}>
                    <Image src={photos} alt={""} width={320} height={300} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
            <Card.Section className="w-full flex justify-center items-center">
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
                <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-400 duration-300 text-center">
                  RENT NOW
                </button>
              </Group>
            </Card.Section>
          </div>
          <div className="w-1/3">
            <AnnouncerCard announcerData={data[0].owner} />
          </div>
        </div>
        <div className="pl-20">
          <div className="mt-3 h-px bg-gray-200 w-full" />
          <Group position="apart" mt="md" className="w-3/4">
            <div>
              <Text weight={500}>Tesla Model S</Text>
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
              {data[0].features.map((feature) => (
                <Badge key={feature} variant="outline" className="hover:bg-blue-500 hover:text-white duration-300 cursor-pointer">
                  {feature}
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
              {data[0].car_description}
            </Text>
          </Card.Section>
        </div>
      </div>
    </Modal>
  );
};

export default CarListItemModal;
