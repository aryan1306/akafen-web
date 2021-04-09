import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Heading } from "@chakra-ui/layout";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "../../components/Navbar";
import {
	useEditProfileMutation,
	useGetVendorQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { notify } from "../../utils/toast";

const EditProfile = () => {
	const [{ data }] = useGetVendorQuery();
	const [, editProfile] = useEditProfileMutation();
	const router = useRouter();
	return (
		<>
			<Navbar />
			<Heading color="brand.300" textAlign="center" mt={3}>
				Edit Profile
			</Heading>
			<Container mt={2} maxW="container.md">
				<Formik
					initialValues={{
						brandName: data?.getVendor.brandName.toString(),
						website: data?.getVendor.website,
						facebook: data?.getVendor.facebook,
						whatsapp: data?.getVendor.whatsapp,
						mobile: data?.getVendor.mobile,
						instaURL: data?.getVendor.instaURL,
					}}
					onSubmit={async (values) => {
						const res = await editProfile({ data: values });
						if (res.data.editProfile) {
							notify("Profile edited sucessfully", false);
							router.push("/vendor/my-products");
						} else {
							notify("Something went wrong", true);
						}
					}}
				>
					{({ isSubmitting, handleChange }) => (
						<Form>
							<Stack spacing={2}>
								<FormControl id="brandName" name="brandName">
									<FormLabel>Brand Name</FormLabel>
									<Input onChange={handleChange} />
								</FormControl>
								<FormControl id="website" name="website">
									<FormLabel>Website</FormLabel>
									<Input onChange={handleChange} />
								</FormControl>
								<FormControl id="facebook" name="facebook">
									<FormLabel>Facebook URL</FormLabel>
									<Input onChange={handleChange} />
								</FormControl>
								<FormControl id="instaURL" name="instaURL">
									<FormLabel>Instagram URL</FormLabel>
									<Input onChange={handleChange} />
								</FormControl>
								<FormControl id="mobile" name="mobile">
									<FormLabel>Mobile</FormLabel>
									<Input onChange={handleChange} />
								</FormControl>
								<FormControl id="whatsapp" name="whatsapp">
									<FormLabel>WhatsApp Number</FormLabel>
									<Input onChange={handleChange} />
								</FormControl>
							</Stack>
							<ButtonGroup spacing={3}>
								<Button
									my={4}
									bg="brand.300"
									color="white"
									_hover={{ bg: "brand.200" }}
									disabled={isSubmitting}
									type="submit"
								>
									Confirm Changes
								</Button>
								<Button
									my={4}
									variant="outline"
									colorScheme="yellow"
									onClick={() => {
										router.push("/vendor/my-products");
									}}
									_hover={{ bg: "brand.200" }}
									disabled={isSubmitting}
								>
									Cancel
								</Button>
							</ButtonGroup>
						</Form>
					)}
				</Formik>
			</Container>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(EditProfile);
