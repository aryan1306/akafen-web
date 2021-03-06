import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useUserLoginMutation } from "../../generated/graphql";
import NextLink from "next/link";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { notify } from "../../utils/toast";
import Navbar from "../../components/Navbar";

const Login = ({}) => {
	const history = useRouter();
	const [, login] = useUserLoginMutation();
	return (
		<>
			<Navbar />
			<Container maxW="md">
				<Heading color="brand.300" my={4}>
					Login
				</Heading>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					onSubmit={async (values) => {
						const response = await login({
							data: {
								email: values.email,
								password: values.password,
							},
						});
						if (response.error) {
							let str = response.error.message.substring(9);
							notify(str, true);
						} else if (response.data?.userLogin) {
							history.push("/shop");
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
			</Container>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(Login);
