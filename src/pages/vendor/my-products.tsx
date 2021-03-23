import {
	Badge,
	Box,
	Center,
	Container,
	Text,
	Flex,
	Heading,
	Img,
	SimpleGrid,
	Spinner,
	useMediaQuery,
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
	useDeleteMyProductMutation,
	useMyProductsQuery,
	useVendorMeQueryQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { MdAdd } from "react-icons/md";
import NextLink from "next/link";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { notify } from "../../utils/toast";
import Head from "next/head";

const MyProducts = () => {
	const history = useRouter();
	const [mobile] = useMediaQuery("(max-width: 813px)");
	const [isOpen, setIsOpen] = React.useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = React.useRef();
	const [, deleteProduct] = useDeleteMyProductMutation();
	const [{ fetching, data, error }] = useMyProductsQuery();
	const [{ fetching: vendorFetch, data: meData }] = useVendorMeQueryQuery();
	useEffect(() => {
		if (!vendorFetch && !meData.vendorMeQuery) {
			history.replace("/vendor-login");
			notify("Login to access that feature", false);
		}
	}, [vendorFetch, meData, history]);

	if (fetching) {
		return (
			<>
				<Center p={5}>
					<Spinner size="xl" />
				</Center>
			</>
		);
	}
	if (!data.myProducts) {
		<>
			<Heading textAlign="center">Go ahead and create a product!!</Heading>
			<Flex justifyContent="center">
				<Button
					variant="link"
					leftIcon={<MdAdd />}
					onClick={() => history.push("vendor/create-product")}
				>
					Click here to add a product
				</Button>
			</Flex>
		</>;
	}
	if (error) {
		return (
			<>
				<Navbar />
				<Heading mt={4} color="red.300">
					There was some error loading this page
				</Heading>
			</>
		);
	}
	return (
		<>
			<Head>
				<title>My Inventory</title>
			</Head>
			<Navbar />
			<Heading my={4} color="brand.300" textAlign="center">
				My Products
			</Heading>
			<Container my={3} maxW="container.lg">
				<SimpleGrid columns={mobile ? 2 : 3} spacing={mobile ? 1 : "0.6rem"}>
					{data.myProducts.map((p) => (
						<div key={nanoid()}>
							<Box
								maxW={mobile ? "sm" : "3xl"}
								borderWidth="1px"
								borderRadius="lg"
								overflow="hidden"
							>
								<Img src={p.url[0]} alt={p.name} />
								<Box p={3}>
									<NextLink href={`/shop/${p.id}`}>
										<Text fontWeight="semibold" as="h4" isTruncated>
											{p.name}
										</Text>
									</NextLink>

									<Badge my={2} borderRadius="full" px="2" colorScheme="yellow">
										{p.category}
									</Badge>
									<Text fontSize="1.2rem" fontWeight="bold" as="h5">
										₹ {p.price}
									</Text>
									<Flex alignItems="center" p={3} justifyContent="flex-end">
										<NextLink href={`/vendor/edit-product/${p.id}`}>
											<Button mr={2} variant="link" color="brand.200">
												Edit
											</Button>
										</NextLink>
										<Button
											variant="outline"
											colorScheme="red"
											onClick={() => setIsOpen(true)}
										>
											Delete
										</Button>

										<AlertDialog
											isOpen={isOpen}
											leastDestructiveRef={cancelRef}
											onClose={onClose}
										>
											<AlertDialogOverlay>
												<AlertDialogContent>
													<AlertDialogHeader fontSize="lg" fontWeight="bold">
														Delete Customer
													</AlertDialogHeader>

													<AlertDialogBody>
														Are you sure? You can't undo this action afterwards.
													</AlertDialogBody>

													<AlertDialogFooter>
														<Button ref={cancelRef} onClick={onClose}>
															Cancel
														</Button>
														<Button
															colorScheme="red"
															onClick={() => {
																deleteProduct({ id: p.id });
																history.reload();
															}}
															ml={3}
														>
															Delete
														</Button>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialogOverlay>
										</AlertDialog>
									</Flex>
								</Box>
							</Box>
						</div>
					))}
				</SimpleGrid>
			</Container>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(MyProducts);
