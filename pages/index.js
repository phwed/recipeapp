import React from "react";
import {
  Box,
  Text,
  HStack,
  Heading,
  Button,
  Center,
  FlatList,
  Image as Img,
  Hidden,
  Pressable,
} from "native-base";
import Link from "next/link";
import Image from "next/image";
import food from "../public/food.png";

import { sanityClient, urlFor, usePreviewSubscription } from "../lib/sanity";

const recipesQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage
}`;

// Start editing here, save and see your changes.
export default function App({ data }) {
  console.log(data);

  return (
    <Box flex={1} bg="green.100">
      <Center
        mx={10}
        px={5}
        bg="green.600"
        borderBottomLeftRadius={50}
        borderBottomRightRadius={50}
      >
        <Box h="40vh" w="100%">
          <Image src={food} alt="Picture of the author" objectFit="contain" />
        </Box>

        <Heading color="white" fontWeight={"extraBlack"} fontSize="4xl">
          JOSIES KITCHEN
        </Heading>
        <Text mb={4} color="white" fontWeight={"bold"}>
          food for the culture
        </Text>
      </Center>

      <Box mx={10} bg="green.100" pt={100} top={-50} zIndex={-10} rounded="md">
        <HStack px={10} pb={10} flex={1} alignItems="center" space={10}>
          <Center flex={1}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={() => (
                <Box width={10} height={5} bg="green.100" />
              )}
              renderItem={({ item }) => (
                <Pressable>
                  <Link href={`recipes/${item.slug}`}>
                    <Center
                      px={10}
                      py={5}
                      bg="emerald.600"
                      borderRadius={10}
                      overflow="hidden"
                    >
                      <Img source={urlFor(item.mainImage).url()} size="xl" />

                      <Box mt={2}>
                        <Text fontSize="lg" fontWeight={"bold"} color="white">
                          {item.name}
                        </Text>
                      </Box>
                    </Center>
                  </Link>
                </Pressable>
              )}
            />
          </Center>
        </HStack>
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery);

  return {
    props: {
      data: recipes,
    },
  };
}
