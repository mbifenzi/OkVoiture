import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import React from "react";
import { Box, Select } from "tabler-icons-react";

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

  const [title, setTitle] = React.useState("");
  const [car_model, setCarModel] = React.useState("");
  const [car_year, setCarYear] = React.useState("");
  const [car_color, setCarColor] = React.useState("");
  const [car_price, setCarPrice] = React.useState("");
  const [car_description, setCarDescription] = React.useState("");
  const [car_image, setCarImage] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleSubmit = async () => {
    console.log("handleSubmit");
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

  return (
    <div className="">
      <Modal
        title="Modal title"
        onClose={() => setShowPostModal(false)}
        opened={showPostModal}
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
        <TextInput
          label="Car Image"
          name="car_image"
          placeholder="Upload car image"
            onChange={(e) => {
            setCarImage(e.target.value);
            }}
        />
        <TextInput label="Link" name="link" placeholder="Enter link" />
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
