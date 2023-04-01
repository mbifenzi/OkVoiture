import { Button, FileInput, Modal, Textarea, TextInput } from "@mantine/core";
import React, { SyntheticEvent } from "react";
import { Box, Select } from "tabler-icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Group, Text, useMantineTheme}  from '@mantine/core';
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

  const [title, setTitle] = React.useState("test");
  const [car_model, setCarModel] = React.useState("test");
  const [car_year, setCarYear] = React.useState("2010");
  const [car_color, setCarColor] = React.useState("test");
  const [car_price, setCarPrice] = React.useState("test");
  const [car_description, setCarDescription] = React.useState("test");
  const [car_image, setCarImage] = React.useState<File[]>([]);
  const [link, setLink] = React.useState("test");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log(car_image);
    try {
      const response = await fetch("http://localhost:3000/post", {
        method: "POST",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          car_model,
          car_year,
          car_color,
          car_price,
          car_description,
          car_image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("post data");
        console.log(data);
        // onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const testSubmit = async () => {
    console.log("testSubmit");
    try 
    {
      const response = await fetch("http://localhost:3000/post/single", {
        method: "POST",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Content-Type": "image/jpeg",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  const FileZone = (props: Partial<DropzoneProps>) => {
    const theme = useMantineTheme();
    const setFiles = (files: File[]) => {
      setCarImage(files);
      console.log("files set", files);
    };
    return (
      <Dropzone
        onDrop={(files) => setFiles(files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Group position="center" spacing="xl" style={{ minHeight: 200, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
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
        <TextInput label="Title" name="title" placeholder="Enter post title" />
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
        {/* <FileZone /> */}
        <input type="file" onChange={(e) => {
          if (e.target.files) {
            setCarImage(Array.from(e.target.files));
          }
        }} />
        <TextInput label="Link" name="link" placeholder="Enter link" />
        <Button
          variant="default"
          onClick={() => {
            testSubmit();
          }}
        >
          Create Post
        </Button>
      </Modal>
    </div>
  );
};

export default PostModal;
