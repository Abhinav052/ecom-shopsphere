import React, { useEffect } from "react";
import { Button, CircularProgress } from "@chakra-ui/react";
import AdminHeader from "../components/AdminHeader";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import {
  AdminProductState,
  productError,
  productsLoaded,
  setProductsLoading,
} from "../../../redux/features/admin/admin.product.slice";
import ProductService from "../../../service/product.service";

const AdminProducts = () => {
  const productState: AdminProductState = useSelector(
    (state: RootState) => state.adminProduct
  );
  const dispatch = useDispatch();

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
    <AdminHeader>
      <div className="p-4">
        <div className="flex justify-between mt-4 items-center">
          <h2 className="text-xl font-bold">All Products</h2>
          <Link to={"/admin/products/add"}>
            <Button variant="outline" className="items-center cursor-pointer">
              Add Product
            </Button>
          </Link>
        </div>
        {productState.isLoading ? (
          <div className="flex items-center justify-center mt-[40%]">
            <CircularProgress />
          </div>
        ) : (
          productState.product.map((items, index) => {
            console.log(productState.product);
            return (
              <div className="flex bg-slate-100 my-4 rounded-lg flex-col p-4">
                {/* <div className="flex gap-2 flex-col p-4"> */}
                <h2 className="font-semibold overflow-ellipsis line-clamp-1">
                  {items.title}
                </h2>
                <div className="text-sm text-slate-500 overflow-ellipsis line-clamp-1">
                  {items.description}
                </div>
                <div className="mt-2 flex justify-end ml-auto gap-4">
                  <Button
                    variant="outline"
                    className="items-center cursor-pointer bg-white text-slate-100 hover:bg-slate-600"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    className="items-center cursor-pointer bg-white text-slate-100 hover:bg-slate-600"
                  >
                    View Details
                  </Button>
                </div>
                {/* </div> */}
              </div>
            );
          })
        )}
      </div>
    </AdminHeader>
  );
};

export default AdminProducts;
