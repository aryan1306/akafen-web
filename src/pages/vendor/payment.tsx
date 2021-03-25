import {
	Box,
	Heading,
	Flex,
	Button,
	Image,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Payment = () => {
	const history = useRouter();
	const [mobile] = useMediaQuery("(max-width: 813px)");
	return (
		<>
			<Box bg="brand.100">
				<Heading py={4} mb={5} color="brand.300" textAlign="center">
					Payment for Yearly Subscription
				</Heading>
			</Box>
			<Text fontSize="1.5rem" textAlign="center">
				Step 1: Pay your Yearly Subscription Amount on the given UPI ID
			</Text>
			<br />
			<Flex justifyContent="center">
				<Image
					w={!mobile ? "20%" : "100%"}
					src="https://res.cloudinary.com/ddeuqomyq/image/upload/v1615984835/akafen/16ca6856-b0b7-4912-9b58-bb571ed9fbfa_holjwv.jpg"
					alt="payment-qr"
				/>
			</Flex>
			<Text textAlign="center">UPI ID: q9795954@ybl</Text>
			<Heading my={4} fontFamily="body" textAlign="center">
				₹ 7999/year
			</Heading>
			<Text fontSize="1.5rem" textAlign="center">
				Step 2: Contact Us on 9284816254/7559495501 to receive your Payment
				Confirmation after you have made the payment OTP
			</Text>
			<br />
			<Text fontSize="1.5rem" textAlign="center">
				Step 3: Click the Next button to enter the OTP
			</Text>

			<Flex justifyContent="center">
				<Button
					bg="brand.300"
					mt={6}
					mb={10}
					onClick={(e) => {
						e.preventDefault();
						history.push("/confirm-payment");
					}}
					color="white"
					_hover={{ bg: "brand.200" }}
					type="submit"
				>
					Next
				</Button>
			</Flex>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Payment);
