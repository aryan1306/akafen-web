import { Container } from "@chakra-ui/layout";
import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useReconfirmPaymentMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { notify } from "../../utils/toast";

const ReconfirmPayment = () => {
	const [, reconfirm] = useReconfirmPaymentMutation();
	const router = useRouter();
	return (
		<Container maxW="md" mt={6}>
			<Heading color="brand.300">Confirm Payment</Heading>
			<Formik
				initialValues={{
					email: "",
				}}
				onSubmit={async (values) => {
					const res = await reconfirm({ ...values });
					if (res.data.reconfirmPayment) {
						router.push("/vendor/payment");
					} else if (!res.data.reconfirmPayment) {
						notify("This email is not registered yet", false);
					}
				}}
			>
				{({ isSubmitting, handleChange }) => (
					<Form>
						<FormControl mt={4} isRequired>
							<FormLabel>Email</FormLabel>
							<Input type="email" onChange={handleChange} />
							<FormHelperText>
								Enter the email you used at the time of registration
							</FormHelperText>
						</FormControl>
						<Button
							mt={2}
							bg="brand.300"
							color="white"
							_hover={{ bg: "brand.200" }}
							isLoading={isSubmitting}
							disabled={isSubmitting}
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

export default withUrqlClient(createUrqlClient)(ReconfirmPayment);
