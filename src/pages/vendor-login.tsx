import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Text,
	Input,
	Link,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React from "react";
import { useVendorLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { notify } from "../utils/toast";
import Head from "next/head";

const VendorLogin = () => {
	const history = useRouter();
	const [, login] = useVendorLoginMutation();

	return (
		<>
			<Head>
				<title>Akafen Seller Login</title>
			</Head>
			<Container maxW="md">
				<Heading color="brand.300" my={4}>
					Seller Login
				</Heading>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					onSubmit={async (values) => {
						const response = await login({
							email: values.email,
							password: values.password,
						});
						if (response.error) {
							let str = response.error.message.substring(9);
							notify(str, true);
						} else if (response.data?.login) {
							history.push("/vendor/my-products");
						}
					}}
				>
					{({ isSubmitting, handleChange }) => (
						<Form>
							<Box my={4}>
								<FormControl name="email" id="email" isRequired>
									<FormLabel>Email</FormLabel>
									<Input type="email" onChange={handleChange} />
								</FormControl>
							</Box>

							<Box my={4}>
								<FormControl name="password" id="password" isRequired>
									<FormLabel>Password</FormLabel>
									<Input type="password" onChange={handleChange} />
								</FormControl>
							</Box>
							<Flex my={2} alignItems="center">
								<Box ml="auto">
									<NextLink href="vendor-register">
										<Link>Don't have an account? click here</Link>
									</NextLink>
								</Box>
							</Flex>
							<Button
								bg="brand.300"
								color="white"
								_hover={{ bg: "brand.200" }}
								isLoading={isSubmitting}
								disabled={isSubmitting}
								type="submit"
							>
								Login
							</Button>
						</Form>
					)}
				</Formik>
				<Flex direction="column" justifyContent="center" alignItems="center">
					<Text color="brand.200">Useful Links</Text>
					<ul style={{ listStyleType: "none" }}>
						<NextLink href="/vendor/reconfirm-payment">
							<li>
								<Link>Confirm Payment</Link>
							</li>
						</NextLink>
						{/* <NextLink href="/vendor/confirm-email">
							<li>
								<Link>Confirm Email</Link>
							</li>
						</NextLink> */}
					</ul>
				</Flex>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(VendorLogin);
