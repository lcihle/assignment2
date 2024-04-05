import React, { useState, useEffect } from "react";
import Products from "./boards.json";
const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);

    


    

    // const render_products = (ProductsCategory) => {
    //     return <div className='category-section fixed'>
    //     <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
    //     <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{ maxHeight: '800px', overflowY:
    //     'scroll' }}>
    //     {/* Loop Products */}
    //     {ProductsCategory.map((product, index) => (
    //     <div key={index} className="group relative shadow-lg" >
    //     <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
    //     <img
    //     alt="Product Image"
    //     src={product.image}
    //     className="w-full h-full object-center object-cover lg:w-full lg:h-full"
    //     />
    //     </div>
    //     <div className="flex justify-between p-3">
    //     <div>
    //     <h3 className="text-sm text-gray-700">
    //     <a href={product.href}>
    //     <span aria-hidden="true" className="absolute inset-0" />
    //     <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
    //     </a>
    //     <p>Tag - {product.category}</p>
    //     </h3>
    //     <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
    //     </div>
    //     <p className="text-sm font-medium text-green-600">${product.price}</p>
    //     </div>
    //     </div>
    //     ))}
    //     </div>
    //     </div>
    //     }


    useEffect(() => {
        total();
        }, [cart]);


        // const handleChange = (e) => {
        //     setQuery(e.target.value);
        //     console.log("Step 6 : in handleChange, Target Value :",e.target.value," Query Value :",query);
        //     const results = Products.filter(eachProduct => {
        //     if (e.target.value === "") return ProductsCategory;
        //     return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
        //     });
        //     setProductsCategory(results);
        //     }

            const handleChange = (e) => {
                setQuery(e.target.value);
                console.log("Step 6 : in handleChange, Target Value :", e.target.value, " Query Value :", query);
                const results = Products.filter((eachProduct) => {
                    if (e.target.value === "") return true; // Return all products if the search query is empty
                    return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
                });
                setProductsCategory(results);
            };

   // const [cartTotal, setCartTotal] = useState(0);
   // const [cart, setCart] = useState([]);
   function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
    }

    const addToCart = (el) => {
        setCart([...cart, el]);
        };


        const total = () => {
            let totalVal = 0;
            for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
            }
            setCartTotal(totalVal);
            };


        const cartItems = cart.map((el) => (
            <div key={el.id}>
            <img class="img-fluid" src={el.image} width={100} />
            {el.title}
            ${el.price}
            </div>
            ));

        const removeFromCart = (el) => {
            let hardCopy = [...cart];
            hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
            setCart(hardCopy);
            };

            

           

           

            const listItems = ProductsCategory.map((el) => (
                // PRODUCT
                <div class="row border-top border-bottom" key={el.id}>
                <div class="row main align-items-center">
                <div class="col-2">
                <img class="img-fluid" src={el.image} />
                </div>
                <div class="col">
                <div class="row text-muted">{el.title}</div>
                <div class="row">{el.category}</div>
                </div>
                <div class="col">
                <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div class="col">
                ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
                </div>
                </div>
                ));
                return (
                    <div>
                    STORE SE/ComS319
                    <div class="card">
                    <div class="row">
                    {/* HERE, IT IS THE SHOPING CART */}

                    <div className="py-10">
<input type="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500" value={query} onChange={handleChange} />
</div>

{/* <div className="ml-5 p-10 xl:basis-4/5">
  {console.log("Before render :",Products.length,ProductsCategory.length)}
  {render_products(ProductsCategory)}
  </div> */}
                    <div class="col-md-8 cart">
                    <div class="title">
                    <div class="row">
                    <div class="col">
                    <h4>
                    <b>319 Shopping Cart</b>
                    </h4>
                    </div>
                    <div class="col align-self-center text-right text-muted">
                    Products selected {cart.length}
                    </div>
                    </div>
                    </div>
                    <div>{listItems}</div>
                    </div>
                    <div class ="float-end">
                    <p class ="mb-0 me-5 d-flex align-items-center">
                   
                   
                    </p>
                    </div>
                    </div>
                    </div>
                    </div>
                    );
                    };
export default Shop;
