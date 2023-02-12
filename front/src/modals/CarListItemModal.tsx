import { Modal } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import React from "react";
import photos from "@/assets/default_car.jpg";
import Image from "next/image";

const CarListItemModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal s centered opened={showModal} onClose={() => setShowModal(false)}>
      <div >
        <Carousel sx={{ maxWidth: 320 }} mx="auto" withIndicators height={200}>
          <Carousel.Slide>
            <Image
              src={photos}
              width={200}
              height={200}
              alt={""}
              className=""
            />
          </Carousel.Slide>
          <Carousel.Slide>2</Carousel.Slide>
          <Carousel.Slide>3</Carousel.Slide>
          {/* ...other slides */}
        </Carousel>
      </div>
    </Modal>
  );
};

export default CarListItemModal;
