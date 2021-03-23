import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Link,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { useVendorRegisterMutation } from "../generated/graphql";
import { notify } from "../utils/toast";
import { createUrqlClient } from "../utils/createUrqlClient";
import React from "react";
import Head from "next/head";

const VendorRegister = () => {
	const history = useRouter();
	const [, register] = useVendorRegisterMutation();

	return (
		<>
			<Head>
				<title>Akafen Seller Registration</title>
			</Head>
			<Container maxW="md">
				<Heading my={4} color="brand.300">
					Seller Registration
				</Heading>
				<Formik
					initialValues={{
						brandName: "",
						email: "",
						city: "",
						mobile: "",
						whatsapp: "",
						facebook: "",
						instaURL: "",
						password: "",
					}}
					onSubmit={async (values) => {
						const response = await register({ data: values });
						if (response.error) {
							let str = response.error.message.substring(9);
							notify(str, true);
						} else if (response.data?.register) {
							history.push("/confirm-vendor");
						}
					}}
				>
					{({ isSubmitting, handleChange }) => (
						<Form>
							<Box my={4}>
								<FormControl name="brandName" id="brandName" isRequired>
									<FormLabel>Name</FormLabel>
									<Input onChange={handleChange} />
								</FormControl>
							</Box>
							<Box my={4}>
								<FormControl name="email" id="email" isRequired>
									<FormLabel>Email</FormLabel>
									<Input type="email" onChange={handleChange} />
								</FormControl>
							</Box>
							<Box my={4}>
								<FormControl name="city" id="city" isRequired>
									<FormLabel>City</FormLabel>
									<Input onChange={handleChange} />
								</FormControl>
							</Box>
							<Box my={4}>
								<FormControl name="facebook" id="facebook">
									<FormLabel>Facebook Page/Profile Link</FormLabel>
									<Input
										placeholder="eg: https://facebook.com/your-page-id"
										onChange={handleChange}
									/>
								</FormControl>
							</Box>
							<Box my={4}>
								<FormControl name="instaURL" id="instaURL">
									<FormLabel>Instagram Page/Profile Link</FormLabel>
									<Input
										placeholder="eg: https://instagram.com/your-page-id"
										onChange={handleChange}
									/>
								</FormControl>
							</Box>
							<Box my={4}>
								<FormControl name="mobile" id="mobile" isRequired>
									<FormLabel>Mobile</FormLabel>
									<Input type="tel" onChange={handleChange} />
								</FormControl>
							</Box>
							<Box my={4}>
								<FormControl name="whatsapp" id="whatsapp" isRequired>
									<FormLabel>WhatsApp Number</FormLabel>
									<Input type="tel" onChange={handleChange} />
								</FormControl>
							</Box>
							<Box my={4}>
								<FormControl name="password" id="password" isRequired>
									<FormLabel>Password</FormLabel>
									<Input type="password" onChange={handleChange} />
									<FormHelperText>
										should be more than 8 characters long
									</FormHelperText>
								</FormControl>
							</Box>
							<Flex my={2} alignItems="center">
								<Box ml="auto">
									<NextLink href="vendor-login">
										<Link>Already have an account? click here</Link>
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
								Register
							</Button>
						</Form>
					)}
				</Formik>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(VendorRegister);
