import { Button, FileInput, Modal, Textarea, TextInput } from "@mantine/core";
import React, { SyntheticEvent } from "react";
import { Box, Select } from "tabler-icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Group, Text, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { MultiSelect } from "@mantine/core";
// import { rem } from '@mantine/styles';

const PostModal = ({
  showPostModal,
  setShowPostModal,
  onSuccess,
}: {
  showPostModal: boolean;
  setShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
}) => {
  const carYears = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    // add more years as needed
  ];
  const data = [
    { value: "gasoline", label: "Gasoline" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Electric" },
    { value: "hybrid", label: "Hybrid" },
    { value: "manual", label: "Manual Transmission" },
    { value: "automatic", label: "Automatic Transmission" },
    { value: "2-door", label: "2 Doors" },
    { value: "4-door", label: "4 Doors" },
    { value: "5-door", label: "5 Doors" },
    { value: "2-seater", label: "2 Seater" },
    { value: "4-seater", label: "4 Seater" },
    { value: "5-seater", label: "5 Seater" },
    { value: "air-conditioning", label: "Air Conditioning" },
    { value: "power-steering", label: "Power Steering" },
    { value: "power-windows", label: "Power Windows" },
    { value: "stereo-system", label: "Stereo System" },
    { value: "gps-navigation", label: "GPS Navigation System" },
    { value: "cruise-control", label: "Cruise Control" },
    { value: "parking-sensors", label: "Parking Sensors" },
    { value: "rear-camera", label: "Rear Camera" },
    { value: "airbags", label: "Airbags" },
    { value: "anti-lock-brakes", label: "Anti-lock Brakes" },
    { value: "stability-control", label: "Stability Control" },
    { value: "leather-seats", label: "Leather Seats" },
    { value: "heated-seats", label: "Heated Seats" },
    { value: "sunroof", label: "Sunroof" },
    { value: "alloy-wheels", label: "Alloy Wheels" },
    { value: "steel-wheels", label: "Steel Wheels" },
    { value: "small-engine", label: "Small Engine" },
    { value: "medium-engine", label: "Medium Engine" },
    { value: "large-engine", label: "Large Engine" },
  ];

  const [title, setTitle] = React.useState("");
  const [car_model, setCarModel] = React.useState("");
  const [car_year, setCarYear] = React.useState("2010");
  const [car_color, setCarColor] = React.useState("");
  const [car_price, setCarPrice] = React.useState("");
  const [car_description, setCarDescription] = React.useState("");
  const [car_image, setCarImage] = React.useState<File[]>([]);
  // const [link, setLink] = React.useState("");
  const [car_config, setCarConfig] = React.useState<string>("");

  const handleSubmit = async () => {
    const Axios = axios.create({
      withCredentials: true,
    });
    console.log(car_config);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("car_model", car_model);
    formData.append("car_year", car_year);
    formData.append("car_color", car_color);
    formData.append("car_price", car_price);
    formData.append("car_description", car_description);
    formData.append("car_image", car_image[0]);
    formData.append("car_config", car_config);

    try {
      Axios.post("http://localhost:3000/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        console.log(res);
        // onSuccess();
        setShowPostModal(false);
      });
    } catch (error) {
      console.log(error);
      console.log("error here");
    }
  };

  const testSubmit = async () => {
    // e.preventDefault();
    // console.log(car_image);
    const Axios = axios.create({
      withCredentials: true,
    });
    const formData = new FormData();
    formData.append("car_image", car_image[0]);

    console.log("testSubmit");
    try {
      Axios.post("http://localhost:3000/post/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
      console.log("error here");
    }
  };

  const FileZone = (props: Partial<DropzoneProps>) => {
    const theme = useMantineTheme();
    const setFiles = (files: File[]) => {
      setCarImage(files);
    };
    return (
      <Dropzone
        onDrop={(files) => setFiles(files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 200, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    );
  };

  return (
    <div className="">
      <Modal
        title="Modal title"
        onClose={() => setShowPostModal(false)}
        opened={showPostModal}
        centered
        size="50%"
      >
        <TextInput
          label="Title"
          name="title"
          placeholder="Enter post title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextInput
          label="Car Model"
          name="car_model"
          placeholder="Enter car model"
          onChange={(e) => {
            setCarModel(e.target.value);
          }}
        />
        {/* <Select
          label="Car Year"
          name="car_year"
          data={carYears}
          placeholder="Select car year"
        /> */}
        <TextInput
          label="Car Color"
          name="car_color"
          placeholder="Enter car color"
          onChange={(e) => {
            setCarColor(e.target.value);
          }}
        />
        <MultiSelect
          data={data}
          label="Your favorite frameworks/libraries"
          placeholder="Pick all that you like"
          onChange={(values) => setCarConfig(values.toString())}
        />
        <TextInput
          label="Car Price"
          name="car_price"
          placeholder="Enter car price"
          onChange={(e) => {
            setCarPrice(e.target.value);
          }}
        />
        <Textarea
          label="Car Description"
          name="car_description"
          placeholder="Enter car description"
          onChange={(e) => {
            setCarDescription(e.target.value);
          }}
        />
        {/* <FileInput label="Car Image" name="car_image" /> */}
        <FileZone />
        {/* <input
          type="file"
          name="car_image"
          onChange={(e) => {
            if (e.target.files) {
              setCarImage(Array.from(e.target.files));
            }
          }}
        /> */}
        {/* <TextInput label="Link" name="link" placeholder="Enter link" /> */}
        <Button
          variant="default"
          onClick={() => {
            handleSubmit();
          }}
        >
          Create Post
        </Button>
      </Modal>
    </div>
  );
};

export default PostModal;
