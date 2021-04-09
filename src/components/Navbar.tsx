import {
	Flex,
	Heading,
	Image,
	Link as RouteLink,
	Box,
	useMediaQuery,
	Button,
	IconButton,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import {
	useLogoutMutation,
	useUserLogoutMutation,
	useUserMeQuery,
	useVendorMeQueryQuery,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import DrawerContents from "./DrawerContents";
// import { isServer } from "../utils/isServer";

const Navbar = () => {
	const router = useRouter();
	const [mobile] = useMediaQuery("(max-width: 813px)");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const [{ data, fetching }] = useVendorMeQueryQuery();
	const [{ data: userData, fetching: userFetching }] = useUserMeQuery();
	const [
		{ fetching: userLogoutFetching },
		userLogout,
	] = useUserLogoutMutation();
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
					disabled={userLogoutFetching}
					color="brand.300"
					onClick={() => {
						userLogout();
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
				<RouteLink
					fontSize="1.4rem"
					p={7}
					as={NextLink}
					href="/vendor/edit-profile"
				>
					Edit Profile
				</RouteLink>
				<Button
					as={RouteLink}
					disabled={logoutFetching}
					color="brand.300"
					onClick={() => {
						``;
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
			{mobile ? (
				<Flex zIndex={1} position="sticky" top={0} bg="brand.100">
					<IconButton
						aria-label="menu"
						ref={btnRef}
						onClick={onOpen}
						icon={<IoMenu style={{ fontSize: "1.5em" }} />}
						p={4}
						alignSelf="center"
						justifyContent="center"
						bg="brand.100"
						color="brand.300"
						justifySelf="left"
					/>
					<Drawer
						isOpen={isOpen}
						placement="left"
						onClose={onClose}
						finalFocusRef={btnRef}
					>
						<DrawerOverlay>
							<DrawerContent bg="brand.100">
								<DrawerContents />
							</DrawerContent>
						</DrawerOverlay>
					</Drawer>
					<Flex
						p={1}
						ml={4}
						h="5.5rem"
						bg="brand.100"
						justifyContent="center"
						alignItems="center"
					>
						<Box>
							<Image
								src="https://res.cloudinary.com/ddeuqomyq/image/upload/q_76/v1615898033/akafen-logo_fmkzoj.svg"
								alt="logo"
								w="20"
							/>
						</Box>
						<NextLink href="/">
							<Heading fontSize={mobile ? "1.5rem" : "2rem"} color="brand.300">
								Akafen Flea
							</Heading>
						</NextLink>
					</Flex>
				</Flex>
			) : (
				<>
					<Flex
						p={1}
						h="5.5rem"
						bg="brand.100"
						justifyContent="center"
						alignItems="center"
					>
						<Box>
							<Image
								src="https://res.cloudinary.com/ddeuqomyq/image/upload/q_76/v1615898033/akafen-logo_fmkzoj.svg"
								alt="logo"
								w="20"
							/>
						</Box>
						<NextLink href="/">
							<Heading fontSize={mobile ? "1.5rem" : "2rem"} color="brand.300">
								Akafen Flea
							</Heading>
						</NextLink>
					</Flex>
					{body}
				</>
			)}
			{/* <Flex zIndex={1} position="sticky" top={0} bg="brand.100">
				<IconButton
					aria-label="menu"
					icon={<IoMenu style={{ fontSize: "1.5em" }} />}
					p={4}
					alignSelf="center"
					justifyContent="center"
					bg="brand.100"
					color="brand.300"
					justifySelf="left"
				/>

				<Flex
					p={1}
					ml={4}
					h="5.5rem"
					bg="brand.100"
					justifyContent="center"
					alignItems="center"
				>
					<Box>
						<Image
							src="https://res.cloudinary.com/ddeuqomyq/image/upload/q_76/v1615898033/akafen-logo_fmkzoj.svg"
							alt="logo"
							w="20"
						/>
					</Box>
					<NextLink href="/">
						<Heading fontSize={mobile ? "1.5rem" : "2rem"} color="brand.300">
							Akafen Flea
						</Heading>
					</NextLink>
				</Flex>
			</Flex> */}
		</>
	);
};

export default Navbar;
