import { useRouter } from "next/router";

export const useGetProdId = () => {
	const router = useRouter();
	const prodId =
		typeof router.query.id === "string" ? router.query.id.toString() : "asta";
	return prodId;
};
