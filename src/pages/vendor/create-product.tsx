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
	Progress,
	Select,
	Text,
	Textarea,
	useMediaQuery,
} from "@chakra-ui/react";
import firebase from "firebase";
import { useRouter } from "next/router";
import "firebase/storage";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { category } from "../../components/category";
import {
	useCreateProductMutation,
	useVendorMeQueryQuery,
} from "../../generated/graphql";
import { firebaseConfig } from "../../utils/firebaseConfig";
import { notify } from "../../utils/toast";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Head from "next/head";

const CreateProduct = () => {
	const history = useRouter();
	!firebase.apps.length
		? firebase.initializeApp(firebaseConfig)
		: firebase.app();

	const [{ fetching, data }] = useVendorMeQueryQuery();
	const [, createProduct] = useCreateProductMutation();
	const [mobile] = useMediaQuery("(max-width: 813px)");
	const [files, setFiles] = useState([] as File[]);
	const [url, setUrl] = useState<string[]>([]);
	const [progressState, setProgressState] = useState(0);
	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		for (let i = 0; i < e.target.files!.length; i++) {
			const newFile = e.target.files![i];
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
		const promises: any[] = [];
		files.forEach((file) => {
			const metadata = {
				contentType: "image/*",
			};
			const uploadTask = firebase
				.storage()
				.ref()
				.child("test/" + file.name)
				.put(file, metadata);
			promises.push(uploadTask);
			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					if (snapshot.state === firebase.storage.TaskState.RUNNING) {
						setProgressState(progress);
					}
				},
				(error) => console.log(error),
				async () => {
					const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
					setUrl((prevState) => [...prevState, downloadUrl]);
				}
			);
		});
		Promise.all(promises)
			.then(() => alert("All files uploaded"))
			.catch((err) => console.log(err.code));
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
				<Text ml={4} fontFamily="body">
					by KEY EVENTS
				</Text>
			</Flex>
			<Container maxW="container.md">
				<Heading color="brand.300" mt={5}>
					Create Your First Product{" "}
				</Heading>
				<Text fontSize="1.6rem">Let all of India see your unique product</Text>
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
										<Input
											type="tel"
											placeholder="in Rupees"
											onChange={handleChange}
										/>
										<FormHelperText>should be a number</FormHelperText>
									</FormControl>
								</Box>
								<label>
									Upload files:
									<input type="file" multiple onChange={onFileChange} />
								</label>
								<Button
									variant="outline"
									aria-label="upload"
									mt={2}
									color="brand.200"
									disabled={isSubmitting}
									onClick={handleClick}
									rightIcon={<AttachmentIcon />}
								>
									Upload
								</Button>

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
								<Progress my={5} hasStripe value={progressState} />
							</Form>
						)}
					</Formik>
				</Box>
			</Container>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(CreateProduct);
