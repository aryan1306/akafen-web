import {
	Box,
	Container,
	Flex,
	Heading,
	Text,
	useMediaQuery,
	Image,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import NextLink from "next/link";

const AboutUs = () => {
	const [mobile] = useMediaQuery("max-width: 760px");
	return (
		<>
			<Head>
				<title>About Us</title>
				<meta
					name="description"
					content="We have been doing monthly events in corporate , malls and
							apartments. We are best in concept and theme based events and we
							are committed to bring new products in any event possible. We
							don't like boring stalls and we maintain monopoly to an extent to
							provide the customers with variety of exciting products."
				/>
			</Head>
			<Flex
				zIndex={1}
				position="sticky"
				top={0}
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
				<NextLink href="/">
					<Heading
						fontSize={mobile ? "1.5rem" : "2rem"}
						color="brand.300"
						ml={2}
					>
						Akafen Flea
					</Heading>
				</NextLink>
			</Flex>
			<Heading color="brand.300" textAlign="center" my={3}>
				About Us
			</Heading>
			{mobile ? (
				<>
					<Container mt={5} maxW="container.sm">
						<Text textAlign="justify" fontSize="lg">
							The outset, we KEY EVENTS are into the flea market, in various
							types of areas like malls, society apartments and corporate hubs.
							KEY EVENTS started its journey in 2016, with its first Successful
							Corporate Event in CommerceZone IT Park Pune. We have been also
							doing events in various cities like Pune, Mumbai, Hyderabad and
							Bangalore.
							<br />
							<br />
							We have been doing monthly events in corporate , malls and
							apartments. We are best in concept and theme based events and we
							are committed to bring new products in any event possible. We
							don't like boring stalls and we maintain monopoly to an extent to
							provide the customers with variety of exciting products. In the
							midst of the COVID situation we have come up with this idea to
							bring the very excitement and idea of flea market to an online
							platform through Akafen Flea. With Akafen Flea we aim to bring
							customers and sellers from all over India to connect and shop the
							flea market items and goodies that you love. Akafen comes from
							Luxemborgish word akafen which means shopping. To keep the spirit
							of shopping alive we bring you this platform so that customers and
							sellers benefit.
						</Text>
					</Container>
				</>
			) : (
				<Container mt={5} maxW="container.lg">
					<Text textAlign="justify" fontSize="lg">
						The outset, we KEY EVENTS are into the flea market, in various types
						of areas like malls, society apartments and corporate hubs. KEY
						EVENTS started its journey in 2016, with its first Successful
						Corporate Event in CommerceZone IT Park Pune. We have been also
						doing events in various cities like Pune, Mumbai, Hyderabad and
						Bangalore.
						<br />
						<br />
						We have been doing monthly events in corporate , malls and
						apartments. We are best in concept and theme based events and we are
						committed to bring new products in any event possible. We don't like
						boring stalls and we maintain monopoly to an extent to provide the
						customers with variety of exciting products. In the midst of the
						COVID situation we have come up with this idea to bring the very
						excitement and idea of flea market to an online platform through
						Akafen Flea. With Akafen Flea we aim to bring customers and sellers
						from all over India to connect and shop the flea market items and
						goodies that you love. Akafen comes from Luxemborgish word akafen
						which means shopping. To keep the spirit of shopping alive we bring
						you this platform so that customers and sellers benefit.
					</Text>
				</Container>
			)}
		</>
	);
};

export default AboutUs;
