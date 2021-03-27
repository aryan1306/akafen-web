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
import NextLink from "next/link";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { notify } from "../../utils/toast";
import { useUserRegisterMutation } from "../../generated/graphql";
import Navbar from "../../components/Navbar";

const Register = ({}) => {
	const history = useRouter();
	const [, register] = useUserRegisterMutation();
	return (
		<>
			<Navbar />
			<Container maxW="md">
				<Heading my={4} color="brand.300">
					Register
				</Heading>
				<Formik
					initialValues={{
						name: "",
						email: "",
						password: "",
					}}
					onSubmit={async (values) => {
						const response = await register({ data: values });
						if (response.error) {
							let str = response.error.message.substring(9);
							notify(str, true);
						} else if (response.data?.userRegister) {
							history.push("/users/confirm");
						}
					}}
				>
					{({ isSubmitting, handleChange }) => (
						<Form>
							<Box my={4}>
								<FormControl name="name" id="name" isRequired>
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
								<FormControl name="password" id="password" isRequired>
									<FormLabel>Password</FormLabel>
									<Input type="password" onChange={handleChange} />
								</FormControl>
							</Box>
							<Flex my={2} alignItems="center">
								<Box ml="auto">
									<NextLink href="/users/login">
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
export default withUrqlClient(createUrqlClient)(Register);
