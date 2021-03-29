import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useDeleteVendorMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { notify } from "../../utils/toast";

const DelVendor = () => {
	const [, deleteVendor] = useDeleteVendorMutation();
	return (
		<Container maxW="md">
			<Formik
				initialValues={{
					phone: "",
				}}
				onSubmit={async (values) => {
					const res = await deleteVendor({ phone: values.phone });
					if (!res.data.deleteVendor) {
						notify("some error", true);
					} else if (res.data.deleteVendor) {
						notify("done", true);
					}
				}}
			>
				{({ isSubmitting, handleChange }) => (
					<Form>
						<FormControl id="phone" name="phone">
							<FormLabel>mobile</FormLabel>
							<Input onChange={handleChange} />
						</FormControl>
						<Button disabled={isSubmitting} type="submit">
							submit
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(DelVendor);
