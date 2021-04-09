import { DrawerBody } from "@chakra-ui/modal";
import {
	Stack,
	Link as RouteLink,
	DrawerHeader,
	Button,
} from "@chakra-ui/react";
import React from "react";
import {
	useVendorMeQueryQuery,
	useUserMeQuery,
	useUserLogoutMutation,
	useLogoutMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";

const DrawerContents = ({}) => {
	const router = useRouter();
	const [{ data, fetching }] = useVendorMeQueryQuery();
	const [{ data: userData, fetching: userFetching }] = useUserMeQuery();
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
	const [
		{ fetching: userLogoutFetching },
		userLogout,
	] = useUserLogoutMutation();
	let body = null;
	if (fetching || userFetching) {
		body = <div>Loading...</div>;
	}
	if (
		(!fetching && !data?.vendorMeQuery) ||
		(!userFetching && !userData?.userMe)
	) {
		body = (
			<Stack spacing={3}>
				<DrawerHeader p={2} color="brand.300" borderBottomWidth="1px">
					Welcome to Akafen Flea
				</DrawerHeader>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/aboutus">
					About Us
				</RouteLink>
				<DrawerHeader color="brand.300" borderBottomWidth="1px">
					Sign Up/Login to Shop
				</DrawerHeader>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/users/register">
					Sign Up
				</RouteLink>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/users/login">
					Login
				</RouteLink>
				<DrawerHeader color="brand.300" borderBottomWidth="1px">
					Seller Panel
				</DrawerHeader>
				<RouteLink p={7} as={NextLink} href="/vendor-register">
					Seller Sign Up
				</RouteLink>
				<RouteLink p={7} as={NextLink} href="/vendor-login">
					Seller Login
				</RouteLink>
			</Stack>
		);
	}
	if (userData?.userMe) {
		body = (
			<Stack spacing={3}>
				<DrawerHeader color="brand.300">
					Welcome back {userData.userMe.name}!
				</DrawerHeader>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/">
					Home
				</RouteLink>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/shop">
					Explore
				</RouteLink>
				<RouteLink fontSize="1.4rem" p={7} as={NextLink} href="/aboutus">
					About Us
				</RouteLink>
				<Button
					fontSize="1.4rem"
					disabled={userLogoutFetching}
					onClick={() => {
						userLogout();
						router.replace("/");
					}}
					p={7}
					color="black"
					fontWeight="normal"
					variant="link"
				>
					Logout
				</Button>
			</Stack>
		);
	}
	if (data?.vendorMeQuery) {
		body = (
			<Stack spacing={3}>
				<DrawerHeader borderBottomWidth="1px">
					{data.vendorMeQuery.brandName}
				</DrawerHeader>
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
				<RouteLink
					fontSize="1.4rem"
					p={7}
					as={NextLink}
					href="/vendor/edit-profile"
				>
					Edit Profile
				</RouteLink>
				<Button
					fontSize="1.4rem"
					disabled={logoutFetching}
					onClick={() => {
						logout();
						router.replace("/");
					}}
					p={7}
					color="black"
					fontWeight="normal"
					variant="link"
				>
					Logout
				</Button>
			</Stack>
		);
	}
	return <DrawerBody>{body}</DrawerBody>;
};
export default DrawerContents;
