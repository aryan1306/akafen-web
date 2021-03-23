import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Vendor = {
  __typename?: 'Vendor';
  id: Scalars['ID'];
  email: Scalars['String'];
  city: Scalars['String'];
  createdAt: Scalars['DateTime'];
  brandName: Scalars['String'];
  mobile: Scalars['String'];
  website?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  whatsapp: Scalars['String'];
  instaURL?: Maybe<Scalars['String']>;
};


export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  price: Scalars['Int'];
  url?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  vendorId: Scalars['String'];
  vendor: Vendor;
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  isVerified: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};

export type ProductInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  price: Scalars['Float'];
  url?: Maybe<Array<Scalars['String']>>;
};

export type EditProductInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type UsersInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UsersLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type VendorInput = {
  brandName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  city: Scalars['String'];
  mobile?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  whatsapp?: Maybe<Scalars['String']>;
  instaURL?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  myProducts?: Maybe<Array<Product>>;
  allProducts: Array<Product>;
  allProductsByCategory: Array<Product>;
  product: Product;
  userMe?: Maybe<Users>;
  hello: Scalars['String'];
  vendorMeQuery?: Maybe<Vendor>;
};


export type QueryAllProductsByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  editProduct?: Maybe<Product>;
  deleteProduct: Product;
  createProduct: Product;
  userRegister: Users;
  userLogin: Users;
  confirmUser: Scalars['Boolean'];
  register: Vendor;
  login: Vendor;
  confirmVendor: Scalars['Boolean'];
  confirmPayment: Scalars['Boolean'];
  logout: Scalars['Boolean'];
};


export type MutationEditProductArgs = {
  data: EditProductInput;
  id: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationCreateProductArgs = {
  data: ProductInput;
};


export type MutationUserRegisterArgs = {
  data: UsersInput;
};


export type MutationUserLoginArgs = {
  data: UsersLoginInput;
};


export type MutationConfirmUserArgs = {
  code: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: VendorInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationConfirmVendorArgs = {
  code: Scalars['String'];
};


export type MutationConfirmPaymentArgs = {
  code: Scalars['String'];
};

export type PaymentConfirmationMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type PaymentConfirmationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmPayment'>
);

export type ConfirmUserMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type UserLoginMutationVariables = Exact<{
  data: UsersLoginInput;
}>;


export type UserLoginMutation = (
  { __typename?: 'Mutation' }
  & { userLogin: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'email' | 'createdAt'>
  ) }
);

export type UserRegisterMutationVariables = Exact<{
  data: UsersInput;
}>;


export type UserRegisterMutation = (
  { __typename?: 'Mutation' }
  & { userRegister: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'email' | 'createdAt'>
  ) }
);

export type ConfirmVendorMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type ConfirmVendorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmVendor'>
);

export type VendorLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type VendorLoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'email' | 'brandName'>
  ) }
);

export type VendorRegisterMutationVariables = Exact<{
  data: VendorInput;
}>;


export type VendorRegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'createdAt' | 'brandName' | 'email' | 'city' | 'mobile' | 'whatsapp' | 'facebook' | 'website' | 'instaURL'>
  ) }
);

export type CreateProductMutationVariables = Exact<{
  data: ProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'category' | 'description' | 'vendorId'>
  ) }
);

export type DeleteMyProductMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMyProductMutation = (
  { __typename?: 'Mutation' }
  & { deleteProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name'>
  ) }
);

export type EditProductMutationVariables = Exact<{
  id: Scalars['String'];
  data: EditProductInput;
}>;


export type EditProductMutation = (
  { __typename?: 'Mutation' }
  & { editProduct?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'category' | 'description'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UserMeQueryVariables = Exact<{ [key: string]: never; }>;


export type UserMeQuery = (
  { __typename?: 'Query' }
  & { userMe?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'email'>
  )> }
);

export type VendorMeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type VendorMeQueryQuery = (
  { __typename?: 'Query' }
  & { vendorMeQuery?: Maybe<(
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'brandName' | 'email'>
  )> }
);

export type AllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProductsQuery = (
  { __typename?: 'Query' }
  & { allProducts: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'category' | 'url'>
    & { vendor: (
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'brandName'>
    ) }
  )> }
);

export type MyProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProductsQuery = (
  { __typename?: 'Query' }
  & { myProducts?: Maybe<Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'category' | 'price' | 'description' | 'url'>
    & { vendor: (
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'brandName'>
    ) }
  )>> }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'category' | 'price' | 'description' | 'url'>
    & { vendor: (
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'brandName' | 'mobile' | 'whatsapp' | 'facebook' | 'website' | 'instaURL'>
    ) }
  ) }
);

export type ProductByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type ProductByCategoryQuery = (
  { __typename?: 'Query' }
  & { allProductsByCategory: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'category' | 'price' | 'description' | 'url'>
    & { vendor: (
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'brandName'>
    ) }
  )> }
);


export const PaymentConfirmationDocument = gql`
    mutation PaymentConfirmation($code: String!) {
  confirmPayment(code: $code)
}
    `;

export function usePaymentConfirmationMutation() {
  return Urql.useMutation<PaymentConfirmationMutation, PaymentConfirmationMutationVariables>(PaymentConfirmationDocument);
};
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($code: String!) {
  confirmUser(code: $code)
}
    `;

export function useConfirmUserMutation() {
  return Urql.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument);
};
export const UserLoginDocument = gql`
    mutation UserLogin($data: UsersLoginInput!) {
  userLogin(data: $data) {
    id
    name
    email
    createdAt
  }
}
    `;

export function useUserLoginMutation() {
  return Urql.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument);
};
export const UserRegisterDocument = gql`
    mutation UserRegister($data: UsersInput!) {
  userRegister(data: $data) {
    id
    name
    email
    createdAt
  }
}
    `;

export function useUserRegisterMutation() {
  return Urql.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument);
};
export const ConfirmVendorDocument = gql`
    mutation ConfirmVendor($code: String!) {
  confirmVendor(code: $code)
}
    `;

export function useConfirmVendorMutation() {
  return Urql.useMutation<ConfirmVendorMutation, ConfirmVendorMutationVariables>(ConfirmVendorDocument);
};
export const VendorLoginDocument = gql`
    mutation VendorLogin($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    brandName
  }
}
    `;

export function useVendorLoginMutation() {
  return Urql.useMutation<VendorLoginMutation, VendorLoginMutationVariables>(VendorLoginDocument);
};
export const VendorRegisterDocument = gql`
    mutation VendorRegister($data: VendorInput!) {
  register(data: $data) {
    id
    createdAt
    brandName
    email
    city
    createdAt
    mobile
    whatsapp
    facebook
    website
    instaURL
  }
}
    `;

export function useVendorRegisterMutation() {
  return Urql.useMutation<VendorRegisterMutation, VendorRegisterMutationVariables>(VendorRegisterDocument);
};
export const CreateProductDocument = gql`
    mutation CreateProduct($data: ProductInput!) {
  createProduct(data: $data) {
    id
    name
    price
    category
    description
    vendorId
  }
}
    `;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const DeleteMyProductDocument = gql`
    mutation deleteMyProduct($id: String!) {
  deleteProduct(id: $id) {
    id
    name
  }
}
    `;

export function useDeleteMyProductMutation() {
  return Urql.useMutation<DeleteMyProductMutation, DeleteMyProductMutationVariables>(DeleteMyProductDocument);
};
export const EditProductDocument = gql`
    mutation EditProduct($id: String!, $data: EditProductInput!) {
  editProduct(id: $id, data: $data) {
    id
    name
    price
    category
    description
  }
}
    `;

export function useEditProductMutation() {
  return Urql.useMutation<EditProductMutation, EditProductMutationVariables>(EditProductDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const UserMeDocument = gql`
    query UserMe {
  userMe {
    id
    name
    email
  }
}
    `;

export function useUserMeQuery(options: Omit<Urql.UseQueryArgs<UserMeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserMeQuery>({ query: UserMeDocument, ...options });
};
export const VendorMeQueryDocument = gql`
    query VendorMeQuery {
  vendorMeQuery {
    id
    brandName
    email
  }
}
    `;

export function useVendorMeQueryQuery(options: Omit<Urql.UseQueryArgs<VendorMeQueryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<VendorMeQueryQuery>({ query: VendorMeQueryDocument, ...options });
};
export const AllProductsDocument = gql`
    query AllProducts {
  allProducts {
    id
    name
    price
    category
    url
    vendor {
      id
      brandName
    }
  }
}
    `;

export function useAllProductsQuery(options: Omit<Urql.UseQueryArgs<AllProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllProductsQuery>({ query: AllProductsDocument, ...options });
};
export const MyProductsDocument = gql`
    query MyProducts {
  myProducts {
    id
    name
    category
    price
    description
    url
    vendor {
      id
      brandName
    }
  }
}
    `;

export function useMyProductsQuery(options: Omit<Urql.UseQueryArgs<MyProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyProductsQuery>({ query: MyProductsDocument, ...options });
};
export const ProductDocument = gql`
    query Product($id: String!) {
  product(id: $id) {
    id
    name
    category
    price
    description
    vendor {
      id
      brandName
      mobile
      whatsapp
      facebook
      website
      instaURL
    }
    url
  }
}
    `;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductByCategoryDocument = gql`
    query ProductByCategory($category: String!) {
  allProductsByCategory(category: $category) {
    id
    name
    category
    price
    description
    vendor {
      id
      brandName
    }
    url
  }
}
    `;

export function useProductByCategoryQuery(options: Omit<Urql.UseQueryArgs<ProductByCategoryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductByCategoryQuery>({ query: ProductByCategoryDocument, ...options });
};