import { Container, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Auth = () => {
	return (
		<>
			<Navbar />
			<Heading mb={5} textAlign="center" color="brand.300">
				Setup your Online Space Now
			</Heading>
			<Container p={6} maxW="container.md" borderWidth="1px" my={10}>
				<Image src="/auth.svg" layout="responsive" width={500} height={500} />
				<Container maxW="container.md">
					<Flex direction="column" justifyContent="center" alignItems="center">
						<Button
							bg="brand.300"
							_hover={{ bg: "brand.200" }}
							color="white"
							isFullWidth
							mb={4}
						>
							Sign Up
						</Button>
						<Button variant="outline" colorScheme="yellow" isFullWidth>
							Login
						</Button>
					</Flex>
				</Container>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Auth);
