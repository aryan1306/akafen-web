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
				"https://res.cloudinary.com/ddeuqomyq/image/upload/v1615919110/akafen/IMG_20181218_141556_bfewwz.jpg",
		},
		{
			id: 2,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/v1615919109/akafen/IMG_20181206_140132_htablc.jpg",
		},
		{
			id: 3,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/v1615919108/akafen/IMG_20181024_141549_tzd19i.jpg",
		},
		{
			id: 4,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/v1615919108/akafen/IMG_20181009_134908_t9wvxe.jpg",
		},
		{
			id: 5,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/v1615919108/akafen/IMG_20181204_142308_jwzxh7.jpg",
		},
		{
			id: 6,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/v1615919108/akafen/IMG_20181009_134905_jdzmqd.jpg",
		},
		{
			id: 7,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/v1615919108/akafen/IMG_20180617_195124_nmnfpb.jpg",
		},
		{
			id: 8,
			url:
				"https://res.cloudinary.com/ddeuqomyq/image/upload/v1615919107/akafen/IMG_20181004_141606_xtaxog.jpg",
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
