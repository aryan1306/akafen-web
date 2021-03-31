import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import {
	LogoutMutation,
	UserLoginMutation,
	UserMeDocument,
	UserMeQuery,
	UserRegisterMutation,
	VendorLoginMutation,
	VendorMeQueryDocument,
	VendorMeQueryQuery,
	VendorRegisterMutation,
} from "../generated/graphql";
import { isServer } from "./isServer";

function betterUpdateQuery<Result, Query>(
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: Result, q: Query) => Query
) {
	return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
	let cookie = "";
	if (isServer()) {
		cookie = ctx?.req?.headers?.cookie;
	}
	return {
		url: process.env.NEXT_PUBLIC_API_URL!,
		fetchOptions: {
			credentials: "include" as const,
			headers: cookie ? { cookie } : undefined,
		},
		exchanges: [
			dedupExchange,
			cacheExchange({
				updates: {
					Mutation: {
						// createProduct: (_result, _args, cache, _info) => {
						// 	cache.invalidate({ __typename: "Query" }, "allProducts");
						// },
						createProduct: (_result, _args, cache, _info) => {
							const key = "Query";
							//@ts-ignore
							const fields = cache
								.inspectFields(key)
								.filter((field) => field.fieldName.includes("Products"))
								.forEach((field) => {
									cache.invalidate(key, field.fieldKey);
								});
						},
						editProduct: (_result, _args, cache, _info) => {
							const key = "Query";
							//@ts-ignore
							const fields = cache
								.inspectFields(key)
								.filter((field) => field.fieldName.includes("Products"))
								.forEach((field) => {
									cache.invalidate(key, field.fieldKey);
								});
						},
						logout: (_result, _args, cache, _info) => {
							betterUpdateQuery<LogoutMutation, VendorMeQueryQuery>(
								cache,
								{ query: VendorMeQueryDocument },
								_result,
								() => ({ vendorMeQuery: null })
							);
						},
						deleteProduct: (_result, _args, cache, _info) => {
							const key = "Query";
							//@ts-ignore
							const fields = cache
								.inspectFields(key)
								.filter((field) => field.fieldName.includes("Products"))
								.forEach((field) => {
									cache.invalidate(key, field.fieldKey);
								});
						},
						userRegister: (_result, _args, cache, _info) => {
							betterUpdateQuery<UserRegisterMutation, UserMeQuery>(
								cache,
								{ query: UserMeDocument },
								_result,
								(result, query) => {
									if (!result.userRegister) {
										return query;
									} else {
										return {
											userMe: result.userRegister,
										};
									}
								}
							);
						},
						userLogin: (_result, _args, cache, _info) => {
							betterUpdateQuery<UserLoginMutation, UserMeQuery>(
								cache,
								{ query: UserMeDocument },
								_result,
								(result, query) => {
									if (!result.userLogin) {
										return query;
									} else {
										return {
											userMe: result.userLogin,
										};
									}
								}
							);
						},
						login: (_result, _args, cache, _info) => {
							betterUpdateQuery<VendorLoginMutation, VendorMeQueryQuery>(
								cache,
								{ query: VendorMeQueryDocument },
								_result,
								(result, query) => {
									if (!result.login) {
										return query;
									} else {
										return {
											vendorMeQuery: result.login,
										};
									}
								}
							);
						},
						register: (_result, _args, cache, _info) => {
							betterUpdateQuery<VendorRegisterMutation, VendorMeQueryQuery>(
								cache,
								{ query: VendorMeQueryDocument },
								_result,
								(result, query) => {
									if (!result.register) {
										return query;
									} else {
										return {
											vendorMeQuery: result.register,
										};
									}
								}
							);
						},
					},
				},
			}),
			ssrExchange,
			fetchExchange,
		],
	};
};
