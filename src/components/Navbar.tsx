import {
	Flex,
	Heading,
	Image,
	Link as RouteLink,
	Box,
	useMediaQuery,
	Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import {
	useLogoutMutation,
	useUserMeQuery,
	useVendorMeQueryQuery,
} from "../generated/graphql";
import { useRouter } from "next/router";
// import { isServer } from "../utils/isServer";

const Navbar = () => {
	const router = useRouter();
	const [mobile] = useMediaQuery("(max-width: 813px)");
	const [{ data, fetching }] = useVendorMeQueryQuery();
	const [{ data: userData, fetching: userFetching }] = useUserMeQuery();
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
	let body = null;

	if (fetching || userFetching) {
		body = <div>Loading...</div>;
	}
	if (
		(!fetching && !data?.vendorMeQuery) ||
		(!userFetching && !userData?.userMe)
	) {
		body = (
			<Flex
				h="3.1rem"
				bg="brand.200"
				justifyContent="space-evenly"
				alignItems="center"
			>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/aboutus">
					About Us
				</RouteLink>
				<RouteLink p={7} as={NextLink} href="/vendor/auth">
					Seller Panel
				</RouteLink>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/users/register">
					Customer
				</RouteLink>
			</Flex>
		);
	}
	if (userData?.userMe) {
		body = (
			<Flex
				h="3.1rem"
				bg="brand.200"
				justifyContent="space-evenly"
				alignItems="center"
			>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/aboutus">
					About Us
				</RouteLink>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/shop">
					Explore
				</RouteLink>
				<Button
					fontSize="1.4rem"
					disabled={logoutFetching}
					color="brand.300"
					onClick={() => {
						logout();
						router.replace("/");
					}}
					p={7}
					variant="link"
				>
					Logout
				</Button>
			</Flex>
		);
	}
	if (data?.vendorMeQuery) {
		body = (
			<Flex
				h="3.1rem"
				bg="brand.200"
				justifyContent="space-evenly"
				alignItems="center"
			>
				<RouteLink
					fontSize="1.4rem"
					p={7}
					as={NextLink}
					href="/vendor/create-product"
				>
					Add Product
				</RouteLink>
				<RouteLink
					fontSize="1.4rem"
					p={7}
					as={NextLink}
					href="/vendor/my-products"
				>
					My Products
				</RouteLink>
				<Button
					fontSize="1.4rem"
					disabled={logoutFetching}
					color="brand.300"
					onClick={() => {
						logout();
						router.replace("/");
					}}
					p={7}
					variant="link"
				>
					Logout
				</Button>
			</Flex>
		);
	}
	return (
		<>
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
			{body}
		</>
	);
};

export default Navbar;
