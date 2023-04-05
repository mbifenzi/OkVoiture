import { TPost } from "@/global/types";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
// import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons';
import { AiOutlineHeart } from "react-icons/ai";
import {
  FaGasPump,
  FaTruck,
  FaBolt,
  FaCarAlt,
  FaExchangeAlt,
  FaDoorOpen,
  FaCouch,
  FaWind,
  FaMusic,
  FaMapMarkedAlt,
  FaCruise,
  FaParking,
  FaCameraRear,
  FaAirbag,
  FaLock,
  FaBalanceScale,
  FaChair,
  FaThermometerThreeQuarters,
  FaSun,
  FaCogs,
  FaCog,
  FaMotorcycle,
  FaTractor,
  FaTrailer,
} from "react-icons/fa";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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

const mockdata = [
  { label: "4 passengers", icon: AiOutlineHeart },
  { label: "100 km/h in 4 seconds", icon: AiOutlineHeart },
  { label: "Automatic gearbox", icon: AiOutlineHeart },
  { label: "Electric", icon: AiOutlineHeart },
];

export function AnnouncementsMiniCards(post: any) {
  const Post = post.post;
  let carImageLink = Post.car_image[0].split("./");
  carImageLink = carImageLink[1];
  // const [carImage, setCarImage] = useState<any>(null);


  const configs = Post.car_config.split(",");

  const dataWithIcons = configs.map((value: any) => {
    let icon;
    switch (value) {
      case "gasoline":
        icon = <FaGasPump />;
        break;
      case "diesel":
        icon = <FaTruck />;
        break;
      case "electric":
        icon = <FaBolt />;
        break;
      case "hybrid":
        icon = <FaCarAlt />;
        break;
      case "manual":
        icon = <FaExchangeAlt />;
        break;
      case "automatic":
        icon = <FaCog />;
        break;
      case "2-door":
        icon = <FaDoorOpen />;
        break;
      case "4-door":
        icon = <FaDoorOpen />;
        break;
      case "5-door":
        icon = <FaDoorOpen />;
        break;
      case "2-seater":
        icon = <FaCouch />;
        break;
      case "4-seater":
        icon = <FaCouch />;
        break;
      case "5-seater":
        icon = <FaCouch />;
        break;
      case "air-conditioning":
        icon = <FaWind />;
        break;
      case "power-steering":
        icon = <FaCogs />;
        break;
      case "power-windows":
        icon = <FaCogs />;
        break;
      case "stereo-system":
        icon = <FaMusic />;
        break;
      case "gps-navigation":
        icon = <FaMapMarkedAlt />;
        break;
      case "cruise-control":
        icon = <FaCruise />;
        break;
      case "parking-sensors":
        icon = <FaParking />;
        break;
      case "rear-camera":
        icon = <FaCameraRear />;
        break;
      case "airbags":
        icon = <FaAirbag />;
        break;
      case "anti-lock-brakes":
        icon = <FaLock />;
        break;
      case "stability-control":
        icon = <FaBalanceScale />;
        break;
      case "leather-seats":
        icon = <FaChair />;
        break;
      case "heated-seats":
        icon = <FaThermometerThreeQuarters />;
        break;
      case "sunroof":
        icon = <FaSun />;
        break;
      case "alloy-wheels":
        icon = <FaCogs />;
        break;
      case "steel-wheels":
        icon = <FaCogs />;
        break;
      case "small-engine":
        icon = <FaMotorcycle />;
        break;
      case "medium-engine":
        icon = <FaTractor />;
        break;
      case "large-engine":
        icon = <FaTrailer />;
        break;
      default:
        icon = null; // No icon for values without a matching case
    }
    return { value, icon };
  });


  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={18} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  console.log(`https://localhost:3000/${carImageLink}`);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h={700} className="flex flex-col justify-between m-3">
      <Card.Section component="a" href="https://mantine.dev/" className=" border-b-2 border-gray-100">
        <Image
          src={`http://localhost:3000/${carImageLink}`}
          height={300}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{Post.car_name}</Text>
        <Badge color="pink" variant="light">
          Available
        </Badge>
      </Group>
      <div className="h-64">
      <Text size="sm" color="dimmed" className={classes.label}>
          Basic configuration
        </Text>
        <Group spacing={8} mb={-8}>
          {dataWithIcons.map((item: any) => (
            <div key={item.value} className={classes.section}>
              <Text size="sm" weight={500}>
                {item.value}
              </Text>
              <Text size="sm" color="dimmed" className="flex justify-center">
                {item.icon}
              </Text>
            </div>
          ))}
        </Group>
      </div>

      <Text size="sm" color="dimmed">
        lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor
        sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book Now
      </Button>
    </Card>
  );
}
