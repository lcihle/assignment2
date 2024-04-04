import React, { useState, useEffect } from "react";
import Products from "./boards.json";
const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState(Products);

    useEffect(() => {
        total();
        }, [cart]);


        const handleChange = (e) => {
            setQuery(e.target.value);
            console.log("Step 6 : in handleChange, Target Value :",e.target.value," Query Value :",query);
            const results = Products.filter(eachProduct => {
            if (e.target.value === "") return ProductsCategory;
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
            });
            setProductsCategory(results);
            }
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

            const listItems = Products.map((el) => (
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
                    <span class ="small text-muted me-2">Order total:</span>
                    <span class ="lead fw-normal">${cartTotal}</span>
                    </p>
                    </div>
                    </div>
                    </div>
                    </div>
                    );
                    };
export default Shop;
