import React from "react";
import Carousel from "react-elastic-carousel";

export const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
	{ width: 850, itemsToShow: 2 },
	{ width: 1150, itemsToShow: 2 },
	{ width: 1450, itemsToShow: 2 },
	{ width: 1750, itemsToShow: 2 },
];
const IndexCarousel = () => {
	const srcs = [
		{
			id: 1,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/q_72/v1617170313/akafen/vyi1xmp2gonysazek9bn.jpg",
		},
		{
			id: 2,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/q_72/v1617170313/akafen/ss8zszuzbhyi9fbdjhlr.jpg",
		},
		{
			id: 3,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/q_72/v1617170313/akafen/e2a0wpn1qkdb70jyaeoj.jpg",
		},
		{
			id: 4,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/q_72/v1617170314/akafen/zym8bklreuv5kkkgds5w.jpg",
		},
		{
			id: 5,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/q_72/v1617170314/akafen/a0sterrg22hl1pr5wxhh.jpg",
		},
		{
			id: 6,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/q_72/v1617170315/akafen/c66e23hogvkcuanjw415.jpg",
		},
		{
			id: 7,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/q_72/v1617170316/akafen/jyuvkpack8tffk0vesbv.jpg",
		},
		{
			id: 8,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/q_72/v1617170316/akafen/yaabrb9nxyltq87mofgw.jpg",
		},
	];
	return (
		<Carousel
			breakPoints={breakPoints}
			isRTL={false}
			showArrows={false}
			itemPadding={[5, 15]}
			enableAutoPlay
			autoPlaySpeed={7000}
		>
			{srcs.map((s) => (
				<img src={s.url} key={s.id} alt="flea-market" />
			))}
		</Carousel>
	);
};
export default IndexCarousel;
