import { Flex, Img, Link } from "@chakra-ui/react";
import NextLink from "next/link";
export default function Custom404() {
	return (
		<Flex direction="column" justifyContent="center" alignItems="center">
			<Img src="/imgs/404.svg" width="md" />
			<Link color="brand.200" mt={3} as={NextLink} href="/">
				Go back Home
			</Link>
		</Flex>
	);
}
