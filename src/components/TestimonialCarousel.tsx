import { Container, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-elastic-carousel";

const TestimonialCarousel = () => {
	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 550, itemsToShow: 1, itemsToScroll: 1, pagination: false },
		{ width: 850, itemsToShow: 1 },
		{ width: 1150, itemsToShow: 1 },
		{ width: 1450, itemsToShow: 1 },
		{ width: 1750, itemsToShow: 1 },
	];
	const [mobile] = useMediaQuery("(max-width: 760px)");
	const reviews = [
		{
			id: 1,
			rev:
				"My Experience with KEY EVENTS has been very good and the business in their Events has been great",
			person: "Umesh",
			des: "Proud Seller who has been part in our various events",
		},
		{
			id: 2,
			rev:
				"I am happy to be a part of events oraganised KEY EVENTS and I like their arrangement",
			person: "Kalpana",
			des: "Proud Seller who has been part in our various events",
		},
		{
			id: 3,
			rev:
				"I loved the colours of the canopies and the products were unique and awesome",
			person: "Kavita Agarwal",
			des: "Happy customer that shopped in one of our events",
		},
		{
			id: 4,
			rev: "Footfall in their Events is amazing and business is great",
			person: "Govind",
			des: "Proud Seller who has been part in our various events",
		},
		{
			id: 5,
			rev: "I am always waiting for their event that happens in our company",
			person: "Pran",
			des: "Happy customer that shops at our event in Tech Mahindra Hinjawadi",
		},
	];
	return (
		<Carousel
			breakPoints={breakPoints}
			isRTL={false}
			// itemPadding={[5, 15]}
			enableAutoPlay
			showArrows={false}
			autoPlaySpeed={6000}
		>
			{reviews.map((re) => (
				<Container key={re.id} maxW="container.md">
					<Flex direction="column" alignItems="center" justifyContent="center">
						<Text
							textAlign="center"
							fontFamily="test"
							fontSize={mobile ? "1.5rem" : "2.5rem"}
							my={3}
						>
							"{re.rev}"
						</Text>
						<Text fontSize={mobile ? "1rem" : "1.8rem"} marginLeft="auto">
							- {re.person}
						</Text>
						<Text textAlign="right" marginLeft="auto">
							{re.des}
						</Text>
					</Flex>
				</Container>
			))}
		</Carousel>
	);
};
export default TestimonialCarousel;
