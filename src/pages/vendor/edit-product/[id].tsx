import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
	Spinner,
	Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { category } from "../../../components/category";
import Navbar from "../../../components/Navbar";
import {
	useEditProductMutation,
	useProductQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { notify } from "../../../utils/toast";
import { useGetProdId } from "../../../utils/useGetProdId";

const EditPost = () => {
	const router = useRouter();
	const prodId = useGetProdId();
	const [, editProduct] = useEditProductMutation();

	const [{ fetching, data: productData }] = useProductQuery({
		pause: prodId === "asta",
		variables: {
			id: prodId,
		},
	});

	if (fetching) {
		return (
			<>
				<Navbar />
				<Spinner size="xl" my={9} />
			</>
		);
	}

	if (!productData?.product) {
		return (
			<>
				<Navbar />
				<Heading>Could not Find Post</Heading>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<Container maxW="container.lg">
				<Flex>
					<Button my={2} variant="link" onClick={() => router.back()}>
						Back
					</Button>
				</Flex>
				<Heading textAlign="center">Edit Product</Heading>
				<Box m={4}>
					<Formik
						initialValues={{
							name: productData.product.name,
							description: productData.product.description,
							category: productData.product.category,
							price: productData.product.price.toString(),
						}}
						onSubmit={async (values) => {
							let p = parseFloat(values.price);
							console.log(prodId);
							const res = await editProduct({
								id: prodId,
								data: {
									name: values.name,
									description: values.description,
									category: values.category,
									price: p,
								},
							});
							if (res.error) {
								notify("Some error occured", true);
								console.log(res.error);
							} else if (res.data?.editProduct) {
								notify("Product updated!", false);
								router.back();
							}
						}}
					>
						{({ isSubmitting, handleChange }) => (
							<Form>
								<Box my={3}>
									<FormControl id="name" name="name" isRequired>
										<FormLabel>Product Name</FormLabel>
										<Input onChange={handleChange} />
									</FormControl>
								</Box>
								<Box my={3}>
									<FormControl id="description" name="description" isRequired>
										<FormLabel>Description</FormLabel>
										<Textarea
											placeholder="My product is awesome because..."
											onChange={handleChange}
										/>
									</FormControl>
								</Box>
								<Box my={3}>
									<FormControl id="category" name="category" isRequired>
										<Select
											onChange={handleChange}
											placeholder="Select Category"
										>
											{category.map((cat, index) => (
												<option key={index} value={cat}>
													{cat}
												</option>
											))}
										</Select>
									</FormControl>
								</Box>
								<Box my={3}>
									<FormControl id="price" name="price" isRequired>
										<FormLabel>Price</FormLabel>
										<Input
											type="tel"
											placeholder="in Rupees"
											onChange={handleChange}
										/>
									</FormControl>
								</Box>
								<Button
									isLoading={isSubmitting}
									type="submit"
									bg="brand.300"
									color="white"
									_hover={{ bg: "brand.200" }}
								>
									Submit Changes
								</Button>
							</Form>
						)}
					</Formik>
				</Box>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(EditPost);
