import React, { useState } from "react";
import { marketCartType } from "./marketlist";
import { Button, useToast } from "@chakra-ui/react";
import api from "../../../api/ApiSettings";
import { userProp, userStore } from "../../../store/GlobalStore";
import { TbTrash } from "react-icons/tb";

type Props = {
  marketCart: marketCartType;
  clear: () => void;
  delete: (i: number) => void;
};

const ShowMarketList: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = userStore((state: unknown) => (state as userProp).token);

  const toast = useToast();

  const handleSaveList = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(
        "/api/marketlist",
        { items: props.marketCart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        // stop the button spinner
        setIsLoading(false);
        // clear the market cart
        props.clear();
        // tell the user the operation was successful.
        toast({
          title: "Operation Successful",
          description: "List Saved",
          status: "success",
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (error: any) {
      setIsLoading(false);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast({
          position: "top",
          status: "error",
          title: "Opeartion Failed",
          description: error?.response?.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          position: "top",
          status: "error",
          title: "Opeartion Failed",
          description: "Network Error,  Please check your internet connection",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast({
          position: "top",
          status: "error",
          title: "Opeartion Failed",
          description: "Our Fault, Please try again later ",
        });
      }
    }
  };
  return (
    <section className="flex flex-col items-start gap-2 bg-[#31473A]y p-2 mx-2">
      {props.marketCart.length !== 0 && (
        <>
          <table className="w-full md:min-w-fit table-auto  bg-[#EDF4F2]">
            <thead>
              <tr className="bg-[#31473A] text-white text-sm text-medium">
                <th className="px-4 py-2 whitespace-nowrap">S/N</th>
                <th className="px-4 py-2 whitespace-nowrap ">Product Name</th>
                <th className="px-4 py-2 whitespace-nowrap">Product Quantity</th>
                <th className="px-4 py-2 whitespace-nowrap">Product Price</th>
                <th className="px-4 py-2 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.marketCart.map((item, index) => (
                <tr className="bg-gray-200y odd:bg-[#EDF4F2] even:bg-[#D4DED8] text-sm">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.productName}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.price}</td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      onClick={() => props.delete(index)}
                      className="text-lg cursor-pointer"
                    >
                      <TbTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-start mt-5">
            <Button
              onClick={handleSaveList}
              isLoading={isLoading}
              loadingText={"saving"}
              fontSize={"14px"}
            >
              Create List
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default ShowMarketList;

{
  /* {marketCart.map((el, i) => (
            <li className="flex items-center justify-start gap-1 bg-[#7C8363]y rounded-md bordery text-white">
              <span className="inline-block px-2 py-1 bg-[#7C8363] border text-sm">
                {i + 1}
              </span>
              <span className="inline-block px-2 py-1 bg-[#7C8363] border text-sm font-medium">
                product: {el.productName}
              </span>
              <span className="inline-block px-2 py-1 bg-[#7C8363] border text-sm font-medium">
                quan: {el.quantity}
              </span>
              <span className="inline-block px-2 py-1 bg-[#7C8363] border text-sm font-medium">
                price: {el.price}
              </span>
            </li>
          ))} */
}
