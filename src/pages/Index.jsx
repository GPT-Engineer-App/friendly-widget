import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    const response = await fetch("https://backengine-ks76.fly.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const errorData = await response.json();
      toast({
        title: "Login failed",
        description: errorData.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    const response = await fetch("https://backengine-ks76.fly.dev/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 204) {
      toast({
        title: "Signup successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const errorData = await response.json();
      toast({
        title: "Signup failed",
        description: errorData.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
          <Button leftIcon={<FaUserPlus />} colorScheme="gray" variant="outline" onClick={handleSignup}>
            Signup
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Index;
