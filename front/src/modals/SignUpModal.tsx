import {
  Grid,
  Input,
  Modal,
  PasswordInput,
  useMantineTheme,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import React from "react";
import {
  TextInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";



const SignUpModal = ({
  showSignupModal,
  setShowSignupModal,
}: {
  showSignupModal: boolean;
  setShowSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useMantineTheme();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [privacy, setPrivacy] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);


  const handleSignup = async () => {

   console.log("handleSignup");
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();

    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  };
  return (
    <Modal
      overflow="inside"
      centered
      opened={showSignupModal}
      onClose={() => setShowSignupModal(false)}
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
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Create an account to get started
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Grid>
            <Grid.Col span={6}>
              <TextInput label="First name" placeholder="John" onChange={(event) => setFirstName(event.target.value)} required />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Last name" placeholder="Doe" onChange={(event) => setLastName(event.target.value)} required />
            </Grid.Col>
          </Grid>
          <TextInput mt="md" label="Email" placeholder="you@mantine.dev" onChange={(event) => setEmail(event.target.value)}required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(event) => setPassword(event.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Confirm password"
            required
            mt="md"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="I agree to your terms" sx={{ lineHeight: 1 }} />
            
          </Group>
          
          <Button fullWidth mt="xl" variant="default" color="blue" onClick={() => handleSignup()}>
            Sign up
          </Button>

        </Paper>
      </Container>
    </Modal>
  );
};

export default SignUpModal;
