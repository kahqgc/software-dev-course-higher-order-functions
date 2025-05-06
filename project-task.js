/*
===========================================
🛒 Higher-Order Functions: Product Utilities
===========================================

🎯 Objective:
Students will create and work with higher-order functions to transform and manipulate data.

They will:
- Write higher-order functions that accept callbacks to apply transformations dynamically
- Practice returning functions from higher-order functions for reusable, customizable utilities
- Gain experience using `map`, `filter`, and `reduce` to perform practical data transformations
*/

// ============================================
// 📦 Starting Dataset: Product List
// ============================================

const products = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Phone", price: 500, inStock: false },
  { name: "Tablet", price: 800, inStock: true },
  { name: "Monitor", price: 300, inStock: true },
  { name: "Keyboard", price: 100, inStock: false },
];

// ============================================
// 🔧 Tasks
// ============================================

/*
🔹 Task 1: Filter Products by Availability

Create a function `filterProducts` that accepts:
- an array of products
- a callback function

The callback should determine which products to include.
Example: filter by availability or price threshold.

Step-by-Step:
1. Define the `filterProducts` function with appropriate parameters.
2. Use the `filter()` method to apply the callback to the array.
3. Return the filtered result.*/

//reworked based on answers
function productsInStockFiltered(product, callback){
  return product.filter(callback)
}
let inStock = productsInStockFiltered(products, (product) => product.inStock);
console.log(inStock)

//original
function filterProducts(product) {
  return products.filter(product => product.inStock);
}
console.log("What's in Stock: ", filterProducts());

/*
🔹 Task 2: Transform Product Names

Use `map()` to create a new array of product names in UPPERCASE.

Step-by-Step:
1. Use `map()` on the products array.
2. Extract and transform the `name` property to uppercase.
3. Store the result in a new variable.
*/
function productsUpperCase(product) {
  return products.map(product => product.name.toUpperCase());
}

let upperCaseOnly = productsUpperCase();
console.log("Upper Case Names: ", upperCaseOnly);

/*
🔹 Task 3: Generate Discounted Prices

Write a higher-order function `applyDiscount` that:
- Accepts a discount percentage
- Returns a function that takes a product and returns a discounted price

Step-by-Step:
1. Define a function `applyDiscount` that takes `discountPercent`.
2. Return a new function that takes a product object.
3. Use this returned function inside a `map()` call to apply discounts to all products.
*/
//OPTION 1
function appliesDiscount(product, discountPercentFn){
  let result = [];
  for (let product of products){
    result.push(discountPercentFn(product));}
  return result;
};

let discountApplied = appliesDiscount(products, (product) => product.price - (product.price * 0.25))
console.log("25% DISCOUNTED PRICES: ", discountApplied)

//OPTION 2
function applyDiscount(product) {
  let discountPrice = products.map(product => product.price - (product.price * 0.25));
  return discountPrice;
}
console.log(" 25% discounted prices: ", applyDiscount());

/*
🔹 Task 4: Calculate Total Inventory Value

Use `reduce()` to calculate the total value of products that are currently in stock.

Step-by-Step:
1. Use the `reduce()` method on the products array.
2. Add only the prices of products where `inStock` is true.
3. Store the total in a new variable.
*/
//OPTION 1
function totalIsInStock(accumulator, product) {
  let inStockProducts = filterProducts();
  let total = inStockProducts.reduce((accumulator, product) => accumulator + product.price,0);
  return total
  };
console.log("Total value in stock: ", totalIsInStock());
// OPTION 2 
let totalPriceIsInStock = products.filter(product => product.inStock).reduce((accumulator, product) => accumulator+product.price, 0);
console.log("Total value in stock", totalPriceIsInStock);

/* why did I need an initial value? Because if I don't specifiy where it starts, it starts at the first element
which is the entire first object. I need to start at 0 so I can make sure only numbers are being added, not objects.
Source MDN: "To sum up the values contained in an array of objects, you must supply an initialValue, so that each item passes through your function."
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
If I don't add the initial value, it results in this: [object Object]800300, basically adding the first object to the 
other two objects that have inStock:true and also concatenating them.
I'm thinking that every time I use .reduce to formulate a math problem, I should start at 0 expecially when objects are
already involved.

// ============================================
// 🧪 Console Test Your Work
// ============================================

// console.log("Filtered products:", ...);
// console.log("Uppercased names:", ...);
// console.log("Discounted products:", ...);
// console.log("Total value in stock:", ...);*/
