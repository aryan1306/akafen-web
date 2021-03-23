import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useConfirmVendorMutation } from "../generated/graphql";
import React from "react";

import { useRouter } from "next/router";
import { notify } from "../utils/toast";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ConfirmVendor = () => {
	const history = useRouter();
	const [, confirm] = useConfirmVendorMutation();
	return (
		<Container maW="md">
			<Heading>Confirm Your Email</Heading>
			<Formik
				initialValues={{ code: "" }}
				onSubmit={async (values) => {
					const res = await confirm({ code: values.code });
					if (res.error) {
						let str = res.error.message.substring(9);
						notify(str, true);
					} else if (res.data?.confirmVendor) {
						notify("Confirmed Your Email", false);
						history.push("/payment");
					} else if (!res.data?.confirmVendor) {
						notify(
							"The OTP is incorrect or has expired. Please try again",
							true
						);
					}
				}}
			>
				{({ isSubmitting, handleChange }) => (
					<Form>
						<Box my={3}>
							<FormControl name="code" id="code" isRequired>
								<FormLabel>Your OTP goes here</FormLabel>
								<Input type="tel" onChange={handleChange} />
							</FormControl>
						</Box>
						<Button
							disabled={isSubmitting}
							isLoading={isSubmitting}
							type="submit"
						>
							Confirm
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};
export default withUrqlClient(createUrqlClient)(ConfirmVendor);
