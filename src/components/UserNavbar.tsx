import { Flex, Box, Heading, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useUserMeQuery } from "../generated/graphql";

const UserNav = () => {
	const [mobile] = useMediaQuery("(max-width: 813px)");
  const [{data, fetching}] = useUserMeQuery()
  let body = null;
  if(fetching){
    body = <div className="">Loading...</div>
  }
  if(!fetching && !data?.userMe){
    body= (

    )
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

export default UserNav;
