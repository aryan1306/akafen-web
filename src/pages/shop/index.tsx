import {
	Badge,
	Box,
	Center,
	Container,
	Flex,
	Heading,
	Img,
	SimpleGrid,
	Spinner,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import Navbar from "../../components/Navbar";
import { useAllProductsQuery } from "../../generated/graphql";
import NextLink from "next/link";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Head from "next/head";

const All = () => {
	const [mobile] = useMediaQuery("(max-width: 813px)");

	const [{ fetching, data, error }] = useAllProductsQuery();

	// const router = useRouter();

	if (fetching) {
		return (
			<>
				<Navbar />
				<Center p={5}>
					<Spinner size="xl" />
				</Center>
			</>
		);
	}
	if (!fetching && !data) {
		<>
			<Navbar />
			<Heading textAlign="center">
				Hang On tight this category will be filled Soon!!
			</Heading>
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
				<title>Shop All Products</title>
				<meta
					name="description"
					content="Dress Material, Kurtis, Ladies and Men Apparel, shoes, artificial jewelry and many unique products"
				/>
			</Head>
			<Navbar />
			<Heading my={8} textAlign="center" color="brand.300">
				Explore All Categories
			</Heading>

			{mobile ? (
				<Container p={4} maxW="container.xl">
					{data.allProducts.map((p) => (
						<Box my={3} w="100%" borderWidth="1px" borderRadius="lg">
							<Flex>
								<Img maxW="200" maxH="150" src={p.url[0]} alt={p.name} p={2} />
								<Box p={3} alignSelf="center">
									<Badge my={2} borderRadius="full" px="2" colorScheme="yellow">
										{p.category}
									</Badge>
									<NextLink href="/shop/[id]" as={`/shop/${p.id}`}>
										<Text fontWeight="semibold" color="brand.300">
											{p.name.length > 18
												? (p.name = p.name.substring(0, 18) + "...")
												: p.name}
										</Text>
									</NextLink>
									<Text fontSize="1.4em" color="brand.200" fontWeight="bold">
										₹ {p.price}
									</Text>
								</Box>
							</Flex>
						</Box>
					))}
				</Container>
			) : (
				<Container my={4} maxW="container.xl">
					<SimpleGrid columns={3} spacing="0.6rem">
						{data?.allProducts.map((p) => (
							<>
								<Box
									maxW="3xl"
									borderWidth="1px"
									borderRadius="lg"
									overflow="hidden"
								>
									<Img src={p.url[0]} alt={p.name} />
									<Box p={3}>
										<NextLink href="/shop/[id]" as={`/shop/${p.id}`}>
											<Text
												fontSize="1.4rem"
												fontWeight="semibold"
												as="h4"
												isTruncated
											>
												{p.name}
											</Text>
										</NextLink>

										<Badge
											my={2}
											borderRadius="full"
											px="2"
											colorScheme="yellow"
										>
											{p.category}
										</Badge>
										<Text fontSize="1.2rem" fontWeight="bold" as="h5">
											₹ {p.price}
										</Text>
										<Flex>
											<Text ml="auto">by {p.vendor.brandName}</Text>
										</Flex>
									</Box>
								</Box>
							</>
						))}
					</SimpleGrid>
				</Container>
			)}
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(All);
