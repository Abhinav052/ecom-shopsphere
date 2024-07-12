"use client";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import SignIn from "../../Auth/pages/SignIn";
import {
  HomeState,
  openAuthModal,
  productError,
  productsLoaded,
  setProductsLoading,
} from "../../../redux/features/home/home.slice";
import { RootState } from "../../../redux/store/store";
import { AuthState } from "../../../models/auth.model";
import { useNavigate } from "react-router";
import ProductService from "../../../service/product.service";
import DragScroll from "../components/DragScroll";
import { Button } from "@chakra-ui/react";
import { ChevronRightCircle } from "lucide-react";
export default function Home() {
  const dispatch = useDispatch();
  // const {isauth : boolean}= useSelector((state : RootState) : AuthState => state.auth)
  const onOpen = () => {
    dispatch(openAuthModal());
  };

  const navigate = useNavigate();

  const auth: AuthState = useSelector((state: RootState) => state.auth);

  const homeState: HomeState = useSelector((state: RootState) => state.home);

  async function getProducts() {
    dispatch(setProductsLoading());
    const data = await ProductService.getProducts();
    if (!data) {
      dispatch(productError());
      return;
    }
    console.log(data.products);
    dispatch(
      productsLoaded({ product: data.products, page: data.currentPage })
    );
  }

  useEffect(() => {
    console.log("use effect running");
    getProducts();
  }, []);

  return (
    <Header>
      <div className="">
        {/* <button onClick={onOpen}>Open modal</button>
        <div>{auth?.isAuthenticated}</div>
        <div>{auth?.user?.role}</div> */}
        <div className="mb-4 mt-6">
          <div className="block">
            {" "}
            <Carousel
              autoPlay={true}
              emulateTouch={true}
              className="select-none m-2 md:m-16 h-[200px] rounded-lg"
              showThumbs={false}
              // dynamicHeight={false}
              // onClickItem={(index, item) => navigate("/product/" + index)}
              renderItem={(
                item: React.ReactNode,
                options?: { isSelected: boolean }
              ) => {
                return <div className="max-h-[200px]">{item}</div>;
              }}
            >
              <div className="" onClick={(e) => navigate("/product/id")}>
                <img
                  // className="rounded-lg "
                  src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  onClick={(e) => navigate("/product/id")}
                />
              </div>
              <div className="">
                <img
                  // className="rounded-lg"
                  src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
            </Carousel>
          </div>
          <div className="bg-slate-100 py-4">
            <div className="mt-4 pl-2 md:pl-16 md:mr-16">
              <div className="flex justify-between items-center mr-2 my-4">
                <h2 className="text-2xl font-semibold">Products</h2>{" "}
                <ChevronRightCircle />
              </div>
              <DragScroll>
                {homeState.product.map((item, index) => {
                  return (
                    <div className="inline-block mr-4 my-4 md:mr-8 border-slate-200 border-[.1px] rounded-lg max-w-[250px] h-[280px] bg-white hover:shadow-lg hover:scale-105 hover:duration-300">
                      <div>
                        <img
                          src="https://fastly.picsum.photos/id/1/600/300.jpg?hmac=ulrvXoIbCG5eh63T-Wk14x6W626yVftOS3D8AJiAfkw"
                          alt=""
                          className="w-[250px] rounded-t-lg"
                        />
                      </div>
                      <div className="flex flex-col justify-between p-2 h-[calc(300px-150px)] ">
                        {" "}
                        {/* Adjust height to account for the image height */}
                        <div className="flex-grow">
                          <h2 className="my-1">{item.title}</h2>
                          <div className="overflow-hidden text-wrap text-sm text-slate-500 max-w-[250px] h-[40px] my-4">
                            {item.description}
                          </div>
                        </div>
                        <Button className="">Buy Now</Button>
                      </div>
                    </div>
                  );
                })}
              </DragScroll>
            </div>
          </div>
        </div>
        <SignIn />
      </div>
    </Header>
  );
}
