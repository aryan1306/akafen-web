import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import React from "react";
import { list } from "./list";

const CategoryCard = () => {
	list;
	return (
		<>
			{list.map((li) => (
				<Box key={li.id}>
					<Flex justifyContent="center">
						<Avatar size="2xl" src={li.src} name={li.category} />
					</Flex>
					<Text py={3} color="brand.300" fontWeight="bold" textAlign="center">
						{li.category}
					</Text>
				</Box>
			))}
		</>
	);
};

export default CategoryCard;
