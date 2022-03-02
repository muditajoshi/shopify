import React, { Component } from 'react'
import Client from 'shopify-buy';

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';


const client = Client.buildClient({
  domain: 's3bg.myshopify.com',
  storefrontAccessToken: '7b036ffd844a4ddefa4e99c653c27bf3'
});


//
const httpLink = createHttpLink({ uri: 'http://s3bg.myshopify.com/api/graphql' })

const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': '7b036ffd844a4ddefa4e99c653c27bf3',

  }
}))

const apolloClient = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const ShopifyContext = React.createContext();

export class ShopifyProvider extends Component {

  state = {
    products: [],
    product: {},
    collections: [],
    imgs: [],
    cart: {},
    selectedProducts: [],
    searchedProducts: [],
    res: {},
    shippingPrice: {},
    metaField: ""
  };


  //fetch all products
  fetchProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
    console.log(products);

    products.map(product => {
      console.log(product.images)
    })
  }

  fetchProductByHandle = async handle => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product });
    //console.log(product);
  }


  //search
  fetchSearchProducts = (key) => {
    const searchedProducts = this.state.products.filter(x => x.title.toLowerCase().includes(key.toLowerCase()))
    this.setState({ searchedProducts: searchedProducts });
  }

 


  signUp = async (email, password, firstName, lastName, phone) => {
    const input ={
      email: email,
      password : password
    }
    // const input = {
    //   email : email,
    //   password : password,
    //   firstName : firstName,
    //   lastName: lastName,
    //   phone: phone
    // }

  //   const input = {
  //   email: email,
  //   phone: phone,
  //   firstName: firstName,
  //   lastName: lastName,
  //   acceptsMarketing: true,
  //   addresses: [
  //     {
  //      address1: "",
  //      city: "",
  //      province: "",
  //      phone : "",
  //      zip : "",
  //      lastName: "",
  //      firstName: "",
  //      country: ""
  //     }
  //   ]
  // }
    const mut = gql` mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }`

 
    const response = await apolloClient.mutate({
      mutation: mut, variables: {
        input: input
      }
    });

    console.log(response)
  }




  login = async (email, password) => {
    const mut = gql`mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }  `

    const input = {
      email: email,
      password: password
    }

    const response = await apolloClient.mutate({
      mutation: mut, variables: {
        input: input
      }
    });

    console.log(response)
    return response;
  }




//fetch collections
fetchCollections = async () => {
  const collections = await client.collection.fetchAll();
  console.log(collections)
  collections.map(collection => {
    console.log(collection.title);
  })
  this.setState({ collections: collections.map(x => ({ label: x.title, value: x.handle })) });
};

//fetch product info
fetchProductInfo = async (handle) => {
  const product = await client.product.fetchByHandle(handle);
  this.setState({ product: product });
  this.setState({ imgs: product.images })
};

//remove product
removeProduct = async (checkoutId, lineitemsIds) => {
  const cart = await client.checkout.removeLineItems(checkoutId, lineitemsIds);
  this.setState({ cart: cart })
}

removeDiscountCoupon = async (checkoutId, discountCode) => {
  const cart = await client.checkout.removeDiscount(checkoutId, discountCode);
  this.setState({ cart: cart })

}
addDiscountCoupon = async (checkoutId, discountCode) => {
  const cart = await client.checkout.addDiscount(checkoutId, discountCode);
  this.setState({ cart: cart })

}

//setshipping
setShippingPrice = (shippingPrice) => {
  this.setState({ shippingPrice: shippingPrice });
}

// localStorage.getItem(checkoutQuantity,lineitemsIds);

//fetch collection by handle
fetchCollectionByHandle = async (handle) => {
  const selectedCatalogProduct = await client.collection.fetchByHandle(handle)
  this.setState({ selectedProducts: selectedCatalogProduct.products });
};

//create cart
createCart = async () => {
  const cart = await client.checkout.create();
  localStorage.setItem("cart_id", cart.id);
  this.setState({ cart: cart });
}

//fetch cart
fetchCart = async () => {
  client.checkout.fetch(localStorage.getItem("cart_id")).then(cart => {
    this.setState({ cart: cart });
    console.log("cart :");
    console.log(cart);
  });
}

//add items to cart
addProductToCart = async (variantId, quantity) => {
  const productItem = {
    variantId: variantId,
    quantity: quantity
  }
  const cart = await client.checkout.addLineItems(this.state.cart.id, productItem);
  this.setState({ cart: cart });
}



//updateQuantity
updateQuantity = async (checkoutId, id, quantity) => {
  const cart = await client.checkout.updateLineItems(checkoutId, [{ id: id, quantity: quantity }])
  this.setState({ cart: cart });
}

updateShippingAddress = async (cartId, shippingAddress) => {
  const address = await client.checkout.updateShippingAddress(cartId, shippingAddress)
  this.setState({ updateAddress: address })
  //  const cart=await client.checkout.updateShippingAddress(cartId, shippingAddress)
  // this.setState({cart});
  // console.log(cart.shippingAddress);
};


componentDidMount() {
  if (localStorage.cart_id) {
    console.log("Dont Create cart")
    this.fetchCart();
  } else {
    this.createCart();
    console.log("Cart Created")
  }
  this.getShippingMethod();
  // this.testApollo();
}

//
testGraphQL = async () => {



  const productsQuery = client.graphQLClient.query((root) => {
    root.addConnection('products', { args: { first: 10 } }, (product) => {
      product.add('title');

    });
  });
  const { data } = await client.graphQLClient.send(productsQuery);

  console.log("***");
  console.log("***");
  console.log(data);
  console.log("***");

  const collectionQuery = client.graphQLClient.query((root) => {
    root.addConnection('collections', { args: { first: 10 } }, (product) => {
      product.add('id');

    });
  });
  const res = await client.graphQLClient.send(collectionQuery);
  console.log("***");
  console.log(res);
  console.log("***");

  const checkoutQuery = client.graphQLClient.query((root) => {
    root.add('node', { args: { id: localStorage.cart_id } }, (node) => {

      node.addInlineFragmentOn('Checkout', (checkout) => {
        checkout.add('totalTax');
        checkout.add('taxesIncluded');
        checkout.add('taxExempt');
        checkout.add('subtotalPrice');
        checkout.add('totalPrice');
        checkout.add('email');
        checkout.add('createdAt');
        checkout.add('webUrl');
        checkout.add('requiresShipping');

      });
    });
  });

  const shopRes = await client.graphQLClient.send(checkoutQuery);
  console.log("***");
  console.log(shopRes);
  console.log("***");
}

testApollo = async () => {
  const query = gql`
  query {
    shop {
      name
      description
      products(first:20) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            options {
              name
              values
            }
            variants(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    src
                  }
                  price
                }
              }
            }
            images(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
  const res = await apolloClient.query({ query: query });
  console.log("***");
  console.log(res);
  console.log("***");
}




getShippingMethod = async () => {

  const query = gql`

  query checkout($checkoutid: ID!){

      node(id: $checkoutid) {

        ... on Checkout {

            totalTax

            taxesIncluded

            taxExempt

            subtotalPrice

            totalPrice

            email

            createdAt

            requiresShipping

            availableShippingRates {

              ready

              shippingRates {

                handle

                priceV2 {

                  amount

                }

                title

              }

            }

        }

    }

  }
  `

  const res = await apolloClient.query({
    query: query, variables: {

      checkoutid: localStorage.cart_id

    }
  });

  console.log("**checkoutid**");

  console.log(res);
  this.setState({ res: res.data.node })

  console.log("*******");



}

updateShipping = async (shippingHandle) => {
  const mut = gql`mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
  checkout {
    id
  }
  checkoutUserErrors {
    code
    field
    message
  }
}
}
`

  const response = await apolloClient.mutate({
    mutation: mut, variables: {

      checkoutId: localStorage.cart_id,
      shippingRateHandle: shippingHandle

    }
  });

  console.log(response)

}


getMetaField = async (handle) => {
  const query = gql` query($handle: String!){
        productByHandle(handle: $handle) {
          partNo: metafield(namespace: "my_fields", key: "part_number") {
            value
          }
        }
      }
`
  const res = await apolloClient.query({
    query: query, variables: {
      handle: handle
    }
  });
  this.setState({ metaField: res?.data?.productByHandle?.partNo?.value })
}

updatepayment = async (shippingHandle) => {
  const muta = gql`mutation checkoutCompleteWithCreditCardV2($checkoutId: ID!, $payment: CreditCardPaymentInputV2!) {
            checkoutCompleteWithCreditCardV2(checkoutId: $checkoutId, payment: $payment) {
              checkout {
                id
              }
              checkoutUserErrors {
                code
                field
                message
              }
              payment {
                id
              }
            }
          }
`

  const resp = await apolloClient.mutate({
    mutation: muta, variables: {

      checkoutId: localStorage.cart_id,
      shippingRateHandle: shippingHandle

    }
  });

  console.log(resp)

}




render() {
  return (
    <div>

      <ShopifyContext.Provider
        value={{
          ...this.state, fetchAllProducts: this.fetchProducts,
          fetchProductInfo: this.fetchProductInfo,
          fetchCollections: this.fetchCollections,
          addProductToCart: this.addProductToCart,
          fetchCart: this.fetchCart,
          fetchCollectionByHandle: this.fetchCollectionByHandle,
          removeProduct: this.removeProduct,
          addDiscountCoupon: this.addDiscountCoupon,
          removeDiscountCoupon: this.removeDiscountCoupon,
          updateQuantity: this.updateQuantity,
          updateShippingAddress: this.updateShippingAddress,
          fetchSearchProducts: this.fetchSearchProducts,
          getShippingMethod: this.getShippingMethod,
          setShippingPrice: this.setShippingPrice,
          updateShipping: this.updateShipping,
          getMetaField: this.getMetaField,
          login: this.login,
          signUp: this.signUp
        }}>
        {this.props.children}
      </ShopifyContext.Provider>
    </div>
  )
}
}

const ShopConsumer = ShopifyContext.Consumer;

export { ShopConsumer, ShopifyContext };

export default ShopifyProvider