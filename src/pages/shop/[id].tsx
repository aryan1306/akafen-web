import {
	Center,
	Spinner,
	Heading,
	useMediaQuery,
	Container,
	Text,
	Box,
	useDisclosure,
	Flex,
	Collapse,
	Badge,
	Link,
	Button,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import Carousel from "react-elastic-carousel";
import { breakPoints } from "../../components/Carousel";
import Navbar from "../../components/Navbar";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { nanoid } from "nanoid";
import { useGetProductFromUrl } from "../../utils/useGetPostFromUrl";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { SiFacebook, SiWhatsapp, SiInstagram } from "react-icons/si";
import { FiGlobe } from "react-icons/fi";
import { useUserMeQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const Post = () => {
	const history = useRouter();
	const [mobile] = useMediaQuery("(max-width: 813px");
	const { isOpen, onToggle } = useDisclosure();
	const [{ data: userData }] = useUserMeQuery();
	// useEffect(() => {
	// 	if(!userData && !userFetch){

	// 	}
	// }, [userFetch, userData, history]);
	const [{ data, fetching, error }] = useGetProductFromUrl();
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
				<Heading textAlign="center" mt={4} color="red.300">
					There was some error loading this page
				</Heading>
			</>
		);
	}

	return (
		<>
			<NextSeo
				title={`Shop ${data.product.name}`}
				description={`${data.product.description}`}
				canonical="https://akafenflea.online"
				openGraph={{
					type: "website",
					url: `https://akafenflea.online/${data.product.id}`,
					title: `Shop ${data.product.name}`,
					description: data.product.description,
					images: [
						{
							url: data.product.url[0],
							width: 160,
							height: 250,
							alt: `${data.product.name}`,
						},
					],
				}}
			/>
			<Navbar />
			<Carousel
				breakPoints={breakPoints}
				isRTL={false}
				showArrows={!mobile}
				itemPadding={[5, 15]}
			>
				{data.product.url.map((u) => (
					<img
						width={!mobile ? "67%" : "100%"}
						key={nanoid(10)}
						src={u}
						alt={data.product.name}
					/>
				))}
			</Carousel>
			<Container maxW="container.lg">
				<Badge my={2} borderRadius="full" px="2" colorScheme="yellow">
					{data.product.category}
				</Badge>
				<Heading color="brand.300">{data.product.name}</Heading>
				<Text mt={2} color="brand.300">
					by {data.product.vendor.brandName}
				</Text>
				<Text color="brand.200" fontSize="2.5rem">
					₹ {data.product.price}
				</Text>
				<Box borderRadius="xl" borderWidth="1px" my={4}>
					<Flex alignItems="center">
						<Text
							fontWeight="semibold"
							color="brand.300"
							pl={4}
							fontSize="1.5rem"
						>
							Description
						</Text>
						<Button
							onClick={onToggle}
							ml="auto"
							aria-label="more"
							leftIcon={<ChevronDownIcon />}
							variant="ghost"
						>
							See More
						</Button>
					</Flex>
					<Collapse in={isOpen} animateOpacity>
						<Box p={4}>
							<Text fontSize="1.2rem" color="gray.500">
								{data.product.description}
							</Text>
						</Box>
					</Collapse>
				</Box>
				<Box my={4}>
					<Heading color="brand.300" textAlign="center">
						Did you like this product?
					</Heading>
					<Text textAlign="center" my={4}>
						Here are the ways to get in Touch with the Seller
					</Text>
					{!userData?.userMe ? (
						<Flex justifyContent="center">
							<Box my={3}>
								<Button
									color="white"
									bg="brand.300"
									mr={5}
									_hover={{ bg: "brand.200" }}
									onClick={() => history.push("/users/register")}
								>
									Sign Up
								</Button>
								<Button
									color="white"
									bg="brand.200"
									_hover={{ color: "brown" }}
									onClick={() => history.push("/users/login")}
								>
									Login
								</Button>
							</Box>
						</Flex>
					) : (
						<>
							<Text textAlign="center" fontSize="1.3rem">
								Contact {data.product.vendor.mobile}
							</Text>
							<Flex my={5} alignItems="center" justifyContent="center">
								<SiWhatsapp size="1.2em" />
								<Text ml={2} textAlign="center" fontSize="1.3rem">
									{data.product.vendor.whatsapp}
								</Text>
							</Flex>
							<Flex alignItems="center" justifyContent="center">
								{data.product.vendor.facebook && (
									<Link
										target="_blank"
										rel="noopener noreferrer"
										ml={8}
										href={`${data.product.vendor.facebook}`}
									>
										<SiFacebook color="blue" size="2.3em" />
									</Link>
								)}
								{data.product.vendor.instaURL && (
									<Link
										target="_blank"
										rel="noopener noreferrer"
										ml={8}
										href={`${data.product.vendor.instaURL}`}
									>
										<SiInstagram size="2.3em" />
									</Link>
								)}
								{data.product.vendor.website && (
									<Link
										target="_blank"
										rel="noopener noreferrer"
										ml={8}
										href={`${data.product.vendor.website}`}
									>
										<FiGlobe color="gray" size="2.3em" />
									</Link>
								)}
							</Flex>
						</>
					)}
				</Box>
			</Container>
		</>
	);
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
