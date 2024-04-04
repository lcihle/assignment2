import logo from './logo.png';
import './App.css';

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import Products from "./boards.json";
import { Categories } from "./Categories.js";

let productList = [];


function Shop() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataF, setDataF] = useState({});
    const [viewer, setViewer] = useState(0);
    const [query, setQuery] = useState('');
    const [ProductsCategory, setProductsCategory] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setProductsCategory(Products);
    }, [Products]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    const renderCart = () => {
        return (
            <div>
                <h2>Cart:</h2>
                {cart.map((item, index) => (
                    <div key={index}>
                        <p>{item.title} - ${item.price}</p>
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                    </div>
                ))}
            </div>
        );
    };

    const onSubmit = (data) => {
        setDataF(data);
        setViewer(1);
    };


    const render_products = (ProductsCategory) => {
  
        const addToCart = (product) => {
            setCart([...cart, product]);
        };
      
        const removeFromCart = (product) => {
            const updatedCart = cart.filter((item) => item !== product);
            setCart(updatedCart);
        };
      
        return (
          <div className='category-section fixed'>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
            <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll' }}>
              {/* Loop Products */}
              {ProductsCategory.map((product, index) => (
                <div key={index} className="group relative shadow-lg">
                  <div className="min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                    <img
                      alt="Product Image"
                      src={product.image}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="flex justify-between p-3">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                        </a>
                        <p>Tag - {product.category}</p>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                    </div>
                    <p className="text-sm font-medium text-green-600">${product.price}</p>
                  </div>
                  {/* Buttons with + and - signs */}
                  <div className="flex justify-between p-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(product)}>
                      +
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => removeFromCart(product)}>
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }

    function Checkout() {
        const updateHooks = () => {
            setViewer(0);
            setDataF({});
            setCart([]); // Clear cart when returning to browsing
        };

        return (
            <div>
                <h1>Confirmation:</h1>
                <h3>{dataF.fullName}</h3>
                <p>{dataF.email}</p>
                <p>{dataF.city},{dataF.state} {dataF.zip} </p>
                <div>
                    {/* Show cart if it's not empty */}
                    {cart.length > 0 && renderCart()}
                </div>
                <button onClick={updateHooks}>Back to Browse</button>
            </div>
        );
    }

    function Summary() {
        const updateHooks = () => {
            setViewer(0);
            setDataF({});
        };

        const updateHooks2 = () => {
            setViewer(2);
            setDataF(dataF);
        };

        return (
            <div>
                <h1>Cart:</h1>
                <div>
                    {/* Show cart if it's not empty */}
                    {cart.length > 0 && renderCart()}
                </div>
                <h1>Payment Information:</h1>
                {/* Payment form goes here */}
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
                {errors.email && <p>Email is required.</p>}
                <input {...register("creditCard", { required: true })} placeholder="Credit Card" />
                {errors.creditCard && <p>Credit Card is required.</p>}
                <input {...register("address", { required: true })} placeholder="Address" />
                {errors.address && <p>Address is required.</p>}
                <input {...register("address2")} placeholder="Address 2" />
                <input {...register("city", { required: true })} placeholder="City" />
                {errors.city && <p>City is required.</p>}
                <input {...register("state", { required: true })} placeholder="State" />
                {errors.state && <p>State is required.</p>}
                <input {...register("zip", { required: true })} placeholder="Zip" />
                {errors.zip && <p>Zip is required.</p>}

                <button onClick={updateHooks}>Back</button>
                <button onClick={updateHooks2}>Order</button>
            </div>
        );
    }

    function Payment() {
        const onSubmit = (data) => {
            setDataF(data);
            setViewer(1);
        };

        const handleClick = (tag) => {
            const filtered = Products.filter((cat) => cat.category === tag);
            setProductsCategory(filtered);
        };

        const handleChange = (e) => {
            setQuery(e.target.value);
            const results = Products.filter((eachProduct) => {
                if (e.target.value === "") return ProductsCategory;
                return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setProductsCategory(results);
        };

        return (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex fixed flex-row">
                        <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
                            <img className="w-full" src={logo} alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <h1 className="text-3xl mb-2 font-bold text-white"> Product Catalog App </h1>
                                <p className="text-gray-700 text-white">
                                    by - <b style={{ color: 'orange' }}>Design Shubham, Development Abraham</b>
                                </p>
                                <div className="py-10">
                                    {Categories && <p className='text-white'>Tags : </p>}
                                    {Categories && Categories.map(tag => (
                                        <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={() => handleClick(tag)}>
                                            {tag}
                                        </button>
                                    ))}
                                </div>

                                <div className="py-10">
                                    <input type="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={query} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="ml-5 p-10 xl:basis-4/5">
                            {console.log("Before render :", Products.length, ProductsCategory.length)}
                            {render_products(ProductsCategory)}
                        </div>
                    </div>

                    <div>
                        {/* Show cart if it's not empty */}
                        {cart.length > 0 && renderCart()}
                    </div>

                    <button type="submit">Cart</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            {viewer === 0 && <Payment />}
            {viewer === 1 && <Summary />}
            {viewer === 2 && <Checkout />}
        </div>
    );
}

export default Shop;
