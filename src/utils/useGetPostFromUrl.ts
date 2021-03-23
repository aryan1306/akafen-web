import { useRouter } from "next/router";
import { useProductQuery } from "../generated/graphql";

export const useGetProductFromUrl = () => {
	const router = useRouter();

	const prodId =
		typeof router.query.id === "string" ? router.query.id.toString() : "asta";

	return useProductQuery({
		pause: prodId === "asta",
		variables: {
			id: prodId,
		},
	});
};
