import React from "react";
import { HStack, Text, Box, Pressable, Heading } from "native-base";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

export default function ComponentName() {
  return (
    <HStack
      px={10}
      py={3}
      bg={"black"}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Pressable>
        <Link href="/">
          <Image
            src={logo}
            alt="Picture of the author"
            width={40}
            height={30}
            objectFit="cover"
          />
        </Link>
      </Pressable>

      <Box>
        <Heading color="white" fontWeight="bold" fontSize={"lg"}>
          Food for the culture
        </Heading>
      </Box>
    </HStack>
  );
}
