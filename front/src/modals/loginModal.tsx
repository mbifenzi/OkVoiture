import { Modal, useMantineTheme } from "@mantine/core";
import React, {useState} from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import SignUpModal from "./SignUpModal";

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
  onSuccess,
}: {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
}) => {
  const theme = useMantineTheme();

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    console.log("handleLogin");
    try 
    {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        console.log("@@@@@@@@@data");
        onSuccess();
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      overflow="inside"
      centered
      opened={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      transitionDuration={300}
      transitionTimingFunction="ease"
      size="50%"
    >
      <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={() => setShowSignupModal(true)}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" onChange={(event) => setEmail(event.target.value)} required />
        <PasswordInput label="Password" placeholder="Your password" onChange={(event) => setPassword(event.target.value)} required mt="md" />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
          <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={() => handleLogin()}>
          Sign in
        </Button>
      </Paper>
      {showSignupModal && (
        <SignUpModal
          showSignupModal={showSignupModal}
          setShowSignupModal={setShowSignupModal}
        />
      )}
    </Container>

    </Modal>
  );
};

export default LoginModal;
