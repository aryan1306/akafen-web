import {
	Container,
	Heading,
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

import React from "react";
import { useConfirmUserMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { notify } from "../../utils/toast";

const Confirm = ({}) => {
	const history = useRouter();
	const [, confirm] = useConfirmUserMutation();
	return (
		<>
			<Container maW="md">
				<Heading>Confirm Your Email</Heading>
				<Formik
					initialValues={{ code: "" }}
					onSubmit={async (values) => {
						const res = await confirm({ code: values.code });
						if (res.error) {
							let str = res.error.message.substring(9);
							notify(str, true);
						} else if (res.data?.confirmUser) {
							notify("Confirmed Your Email", false);
							history.push("/shop");
						} else if (!res.data?.confirmUser) {
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
									<Input onChange={handleChange} />
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
		</>
	);
};
export default withUrqlClient(createUrqlClient)(Confirm);
