import { Badge, Box, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const Card = (props: any) => {
	const [mobile] = useMediaQuery("(max-width: 813px)");
	return (
		<>
			<Box
				maxW={mobile ? "sm" : "3xl"}
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
			>
				<Img src={props.src} alt={props.name} />
				<Box p={3}>
					<Text fontSize="1.4rem" fontWeight="semibold" as="h4" isTruncated>
						{props.name}
					</Text>

					<Badge my={2} borderRadius="full" px="2" colorScheme="yellow">
						{props.category}
					</Badge>
					<Text fontSize="1.2rem" fontWeight="bold" as="h5">
						₹ {props.price}
					</Text>
					<Flex>
						<Text ml="auto">by {props.author}</Text>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default Card;
