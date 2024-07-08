"use client";
import React, { useState } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import SignIn from "../../Auth/pages/SignIn";
import { openAuthModal } from "../../../redux/features/home/home.slice";
import { RootState } from "../../../redux/store/store";
import { AuthState } from "../../../models/auth.model";
export default function Home() {
  const dispatch = useDispatch();
  // const {isauth : boolean}= useSelector((state : RootState) : AuthState => state.auth)
  const onOpen = () => {
    dispatch(openAuthModal());
  };

  const auth: AuthState = useSelector((state: RootState) => state.auth);

  return (
    <Header>
      <div>Home</div>
      <div className="h-96 flex">
        <button onClick={onOpen}>Open modal</button>
        <div>{auth?.isAuthenticated}</div>
        <div>{auth?.user?.role}</div>
        {/* <Carousel
          autoPlay={true}
          emulateTouch={true}
          className="select-none m-20 h-[100px]"
          showThumbs={false}
          dynamicHeight={false}
        >
          <div className="h-[200px] bg-[url('https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
          <div className="h-[100px] bg-[url('https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
          <div className="h-[100px] bg-[url('https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
          <div className="h-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="h-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </Carousel> */}
        <SignIn />
      </div>
    </Header>
  );
}
