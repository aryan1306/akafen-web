import { Container, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import Navbar from "../../components/Navbar";
import NextLink from "next/link";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Auth = () => {
	return (
		<>
			<Navbar />
			<Heading my={4} textAlign="center" color="brand.300">
				Setup your Online Space Now
			</Heading>
			<Container p={6} maxW="container.md" borderWidth="1px" my={10}>
				<Flex justifyContent="center" alignItems="center">
					{/* <Image src="/auth.svg" layout="responsive" width={500} height={500} /> */}
					<Container ml={4} maxW="container.md">
						<Flex
							direction="column"
							justifyContent="center"
							alignItems="center"
						>
							<NextLink href="/vendor-register">
								<Button
									bg="brand.300"
									_hover={{ bg: "brand.200" }}
									color="white"
									isFullWidth
									mb={4}
								>
									Sign Up
								</Button>
							</NextLink>
							<NextLink href="/vendor-login">
								<Button variant="outline" colorScheme="yellow" isFullWidth>
									Login
								</Button>
							</NextLink>
						</Flex>
					</Container>
				</Flex>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Auth);
