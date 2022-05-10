import React from "react";
import {
  Center,
  Text,
  Stack,
  Box,
  Image,
  Heading,
  HStack,
  IconButton,
  Spinner,
} from "native-base";
import { useRouter } from "next/dist/client/router";
import { FaHeart } from "react-icons/fa";

import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText,
} from "../../lib/sanity";

const recipeQuery = `*[_type == "recipe" && slug == $slug][0]{
  _id,
  name,
  slug,
  mainImage,
  ingredients[]{
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },
  instructions[],
  likes
}`;

export default function RecipePage({ data, preview }) {
  console.log(data);

  const router = useRouter();

  const [likes, setLikes] = React.useState(data?.likes);

  const addLike = async () => {
    const res = await fetch("/api/handle-likes", {
      method: "POST",
      body: JSON.stringify({ _id: data._id }),
    }).catch((error) => console.log(error));

    const dataJson = await res.json();

    setLikes(dataJson.likes);
  };

  if (router.isFallback) {
    return (
      <Center flex={1}>
        {" "}
        <Spinner size="sm" />
        <Text>Loading...</Text>
      </Center>
    );
  }

  return (
    <Stack flex={1} bg="green.200" alignItems={"center"} pt={10}>
      <Image
        src={urlFor(data.mainImage).url()}
        alt="Picture of the author"
        h="100%"
        w="100%"
        size="200"
        style={{
          objectFit: "contain",
        }}
      />
      <HStack alignItems={"center"} space={2}>
        <Heading fontWeight="bold" fontSize="3xl">
          {data.name}
        </Heading>
        <IconButton
          icon={<FaHeart size={30} color="red" />}
          onPress={addLike}
        />
        <Text fontSize="xl">{likes}</Text>
      </HStack>

      <Stack space={1} mt={5}>
        <Text fontWeight={"bold"}>INGREDIENTS</Text>

        {data.ingredients?.map((ingredient) => (
          <HStack key={ingredient._id} space={2}>
            <Text>{ingredient.wholeNumber}</Text>
            <Text>{ingredient.fraction}</Text>
            <Text>{ingredient.unit}</Text>
            <Text>{ingredient.ingredient.name}</Text>
          </HStack>
        ))}
      </Stack>
      {/* instructions */}
      <Box mt={5}>
        <Text fontWeight={"bold"}>Recipe</Text>
        <PortableText blocks={data.instructions} />
      </Box>
    </Stack>
  );
}

// getStatic path
export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "recipe" && defined(slug)]{
      "params":{
        "slug": slug
      }
    }`
  );

  console.log(paths, "paths");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log(params, "params");

  const { slug } = params;

  console.log({ slug }, "slug");

  const recipe = await sanityClient.fetch(recipeQuery, { slug });

  return {
    props: {
      data: { ...recipe },
      preview: true,
    },
  };
}
