import { AttachmentIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Image,
	Input,
	InputGroup,
	InputLeftAddon,
	Progress,
	Select,
	Text,
	Textarea,
	useMediaQuery,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { category } from "../../components/category";
import {
	useCreateProductMutation,
	useVendorMeQueryQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { notify } from "../../utils/toast";

const CreateProduct = () => {
	const history = useRouter();

	const [{ fetching, data }] = useVendorMeQueryQuery({});
	const [, createProduct] = useCreateProductMutation();
	const [mobile] = useMediaQuery("(max-width: 813px)");
	const [files, setFiles] = useState([] as File[]);
	const [fileLength, setFileLength] = useState(0);
	const [url, setUrl] = useState<string[]>([]);
	const [clicked, setClicked] = useState(false);
	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setFileLength(e.target.files!.length);
		for (let i = 0; i < e.target.files!.length; i++) {
			const newFile = e.target.files![i];
			// const compFile = await imageCompression(newFile, options);
			setFiles((prevState) => [...prevState, newFile]);
			// console.log(newFile);
		}
		// console.log(files);
	};
	useEffect(() => {
		if (!fetching && !data.vendorMeQuery) {
			history.replace("/vendor-login");
			notify("Login to access that feature", false);
		}
	}, [fetching, data, history]);
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setClicked(!clicked);
		files.forEach(async (file) => {
			const data = new FormData();
			data.append("file", file);
			data.append("upload_preset", process.env.UPLOAD_PRESET!);
			data.append("cloud_name", process.env.CLOUD_NAME!);
			let res = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
				{ method: "POST", body: data, mode: "cors" }
			);
			let resData = await res.json();
			console.log(resData);
			setUrl((prevState) => [...prevState, resData.secure_url]);
		});
	};

	return (
		<>
			<Head>
				<title>Create Product</title>
			</Head>
			<Flex
				p={1}
				h="5.5rem"
				bg="brand.100"
				justifyContent="center"
				alignItems="center"
			>
				<Box>
					<Image
						src="https://res.cloudinary.com/ddeuqomyq/image/upload/v1615898033/akafen-logo_fmkzoj.svg"
						alt="logo"
						w="20"
					/>
				</Box>
				<Heading fontSize={mobile ? "1.5rem" : "3rem"} color="brand.300" ml={2}>
					Akafen Flea
				</Heading>
			</Flex>
			<Container maxW="container.md">
				<Heading color="brand.300" mt={5}>
					Add Product{" "}
				</Heading>
				<Text fontSize="1.6rem">Let all of India see your creativity</Text>
				<Box my={4}>
					<Formik
						initialValues={{
							name: "",
							description: "",
							category: "",
							price: "",
							url: [""],
						}}
						onSubmit={async (values) => {
							values.url = [...url];
							const res = await createProduct({
								data: {
									name: values.name,
									price: parseFloat(values.price),
									description: values.description,
									category: values.category,
									url: values.url,
								},
							});
							if (res.error) {
								let str = res.error.message.substring(9);
								notify(str, true);
							} else if (res.data.createProduct) {
								notify("Created Product Successfully", false);
								history.push("/vendor/my-products");
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
										<InputGroup>
											<InputLeftAddon children="₹" />
											<Input type="tel" onChange={handleChange} />
										</InputGroup>
										<FormHelperText>should be a number</FormHelperText>
									</FormControl>
								</Box>
								<label>
									Upload files:
									<input type="file" multiple onChange={onFileChange} />
								</label>
								<Text color="#718096" mt={2} textAlign="center">
									Max Photos: 5
								</Text>
								<Text color="#718096" mt={2} textAlign="center">
									Click on the upload button after selecting the photos
								</Text>
								<Button
									variant="outline"
									aria-label="upload"
									mt={2}
									color="brand.200"
									disabled={fileLength < 1 || fileLength > 5}
									isLoading={isSubmitting}
									onClick={handleClick}
									rightIcon={<AttachmentIcon />}
								>
									Upload
								</Button>
								<br />
								{clicked ? (
									<Text my={2}>
										Please wait this might take a while, DON'T press upload
										again
									</Text>
								) : null}
								<Text my={2}>No. of files uploaded</Text>
								<Text>{url.length}</Text>
								<Progress
									hasStripe
									my={2}
									colorScheme="yellow"
									value={
										url.length === 0 && fileLength === 0
											? 0
											: (url.length * 100) / fileLength
									}
								/>
								<br />
								<Button
									my={4}
									bg="brand.300"
									color="white"
									_hover={{ bg: "brand.200" }}
									disabled={isSubmitting}
									type="submit"
								>
									Submit
								</Button>
							</Form>
						)}
					</Formik>
				</Box>
			</Container>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(CreateProduct);
