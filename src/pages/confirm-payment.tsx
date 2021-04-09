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
import { usePaymentConfirmationMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { notify } from "../utils/toast";

const ConfirmPayment = () => {
	const history = useRouter();
	const [, confirmPayment] = usePaymentConfirmationMutation();
	return (
		<Container maxW="md">
			<Heading>Payment Confirmation</Heading>
			<Formik
				initialValues={{ code: "" }}
				onSubmit={async (values) => {
					const res = await confirmPayment({ code: values.code });
					if (res.error) {
						let str = res.error.message.substring(9);
						notify(str, true);
					} else if (res.data?.confirmPayment) {
						notify("Confirmed Your Payment", false);
						history.push("/vendor/create-product");
					} else if (!res.data?.confirmPayment) {
						notify(
							"The OTP is incorrect or has expired. Please try again",
							true
						);
					}
				}}
			>
				{({ isSubmitting, handleChange, values }) => (
					<Form>
						<Box my={3}>
							<FormControl name="code" id="code" isRequired>
								<FormLabel>Enter the provided OTP</FormLabel>
								<Input type="tel" onChange={handleChange} />
							</FormControl>
						</Box>
						<Button
							isLoading={isSubmitting}
							disabled={values.code.length !== 4 ? true : false}
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

export default withUrqlClient(createUrqlClient)(ConfirmPayment);
