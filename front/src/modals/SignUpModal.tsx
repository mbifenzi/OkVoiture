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
              <TextInput label="First name" placeholder="John" required />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Last name" placeholder="Doe" required />
            </Grid.Col>
          </Grid>
          <TextInput mt="md" label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Confirm password"
            required
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="I agree to your terms" sx={{ lineHeight: 1 }} />
            
          </Group>
          
          <Button fullWidth mt="xl">
            Sign up
          </Button>

        </Paper>
      </Container>
    </Modal>
  );
};

export default SignUpModal;
