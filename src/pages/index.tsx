import {
	Avatar,
	Box,
	Container,
	Flex,
	Heading,
	Link,
	SimpleGrid,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Navbar from "../components/Navbar";
import IndexCarousel from "../components/Carousel";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { list } from "../components/list";
import { IoChevronForwardOutline } from "react-icons/io5";
import NextLink from "next/link";
import Head from "next/head";
import { NextSeo } from "next-seo";
// import firebase from "firebase";

const Index = () => {
	const [mobile] = useMediaQuery("(max-width: 813px)");
	const date = new Date().getFullYear();

	return (
		<>
			<Head>
				<link
					rel="preload"
					as="image"
					href="https://res.cloudinary.com/ddeuqomyq/image/upload/q_70/v1617170313/akafen/vyi1xmp2gonysazek9bn.jpg"
				/>
				<link
					rel="preload"
					as="image"
					href="https://res.cloudinary.com/ddeuqomyq/image/upload/q_70/v1617170313/akafen/ss8zszuzbhyi9fbdjhlr.jpg"
				/>
			</Head>
			<NextSeo
				title="Akafen Flea Online- Online Flea Marketplace"
				description="We all love flea markets and we love to shop our favorite shirts, t-shirts, kurtis, dress material and many more unique products"
				canonical="https://akafenflea.online"
			/>
			<Navbar />
			<br />
			{mobile ? (
				<>
					<Container maxW="sm">
						<Heading fontSize="2rem" color="brand.300" textAlign="center">
							The Creators of these Successful Shows bring to You
						</Heading>
						<Heading
							fontSize="2rem"
							color="brand.300"
							textDecoration="underline"
							textAlign="center"
						>
							Akafen Flea{" "}
						</Heading>
					</Container>
				</>
			) : (
				<>
					<Heading fontSize="3.3rem" color="brand.300" textAlign="center">
						The Creators of these Successful Shows bring to You
					</Heading>
					<Heading
						fontSize="4rem"
						color="brand.300"
						textDecoration="underline"
						textAlign="center"
					>
						Akafen Flea{" "}
					</Heading>
				</>
			)}
			<br />
			<IndexCarousel />
			<Text
				mb="3rem"
				mt={2}
				fontSize="xx-large"
				color="brand.300"
				textAlign="center"
			>
				An Online Flea Market
			</Text>
			<Box bg="brand.100" p={7}>
				<Container maxW="container.lg">
					<Heading mb={5} color="brand.300">
						Testimonials
					</Heading>
				</Container>
				<TestimonialCarousel />
			</Box>
			<Box p={7}>
				<Container maxW="container.lg">
					<Heading mb={5} color="brand.300">
						Explore
					</Heading>
					<Text fontSize={mobile ? "1.1rem" : "1.6rem"}>
						The Flea Market You Love 💕
					</Text>
					<SimpleGrid mt={5} columns={2} spacing={1}>
						{list.map((li) => (
							<Box key={li.id}>
								<Flex justifyContent="center">
									<Avatar size="2xl" src={li.src} name={li.category} />
								</Flex>
								<Text
									py={3}
									color="brand.300"
									fontWeight="bold"
									textAlign="center"
								>
									{li.category}
								</Text>
							</Box>
						))}
					</SimpleGrid>
					<Flex mt={6} justifyContent="center" alignItems="center">
						<NextLink href="/shop">
							<Link fontSize="1.75rem">See All</Link>
						</NextLink>
						<IoChevronForwardOutline size="1.6rem" color="brand.300" />
					</Flex>
				</Container>
			</Box>
			<Flex
				mt={20}
				direction="column"
				bg="brand.100"
				alignItems="center"
				justifyContent="center"
				w="100%"
				bottom="0"
				mb="0"
				p={4}
			>
				<Text>{date}- Akafen Flea Online</Text>
				<Text>Venture by Key Events</Text>
				<br />
				<Text>Made with ❤ in India</Text>
			</Flex>
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
