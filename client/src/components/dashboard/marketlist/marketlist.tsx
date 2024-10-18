import { Button, FormControl, Tooltip, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import InputContainer from "../../InputContainer";
import { FaProductHunt } from "react-icons/fa";
import { PiMoney } from "react-icons/pi";
import { BsCart4 } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import ShowMarketList from "./show-marketlist";
import { useWindowSize } from "@reactuses/core";

interface formData {
  productName: string;
  price: number;
  quantity: number;
}

const marketItemSchema = z.object({
  productName: z.string().min(1, "Product name is required."),
  price: z.coerce.number().min(1, "Price must be a non-negative number."),
  quantity: z.coerce
    .number()
    .min(1, "Quantity must be a non-negative integer.")
    .default(1),
});

export type marketCartType = formData[];

const Marketlist = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<formData>({
    resolver: zodResolver(marketItemSchema),
  });

  const [marketCart, setMarketCart] = useState<marketCartType>([]);

  const { width } = useWindowSize();

  const onSubmit: SubmitHandler<formData> = (value) => {
    // console.log(value);
    setMarketCart([...marketCart, value]);
    reset();
  };

  const handleClearMarketCart = () => setMarketCart([]);

  const handleDeleteItems = (index: number) => {
    const result = marketCart.filter((_el, i) => i !== index);
    setMarketCart(result);
  };

  const boxShadowStyle = {
    boxShadow: "rgba(0,0,0,0.05) 0px 0px 0px 1px",
  };

  return (
    <section className="min-h-screen flex flex-col items-centery pt-10 gap-5 md:gap-10 justify-centery md:p-10 md:pt-28 bg-[#EDF4F2] w-fully">
      <h1 className="font-semibold text-lg md:text-2xl text-black px-4">
        Create Market List
      </h1>
      <section className="flex flex-col gap-5 md:grid md:grid-cols-2 w-fully md:gap-10">
        {/* left side */}
        <main
          style={boxShadowStyle}
          className="flex flex-col mx-2 md:mx-0 items-start gap-5 bg-[#EDF4F2] md:bg-[#EDF4F2]/30 md:w-fit p-5 rounded-md order-2 md:order-1"
        >
          <h2 className="font-semibold text-black/70 capitalize  md:text-xl">
            Market list Form
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 w-full md:min-w-[320px] md:w-[500px]"
          >
            <VStack spacing={width > 760 ? 6 : 3} align={"stretch"}>
              {/* email */}
              <InputContainer
                register={register}
                type="text"
                icon={<FaProductHunt />}
                inputname="productName"
                placeholder="What is the product name?"
                error={errors.productName}
              />
              {/* name */}
              <InputContainer
                register={register}
                type="number"
                icon={<PiMoney />}
                inputname="price"
                placeholder="What is the unit price in naira?"
                error={errors.price}
              />

              {/* Password */}
              <InputContainer
                register={register}
                type="number"
                icon={<BsCart4 />}
                inputname="quantity"
                placeholder="How many units did you buy?"
                error={errors.quantity}
              />
            </VStack>
            <div className="flex justify-between items-center">
              <Button
                type="submit"
                size={width > 760 ? "lg" : "md"}
                bgColor={"#7C8363"}
                textColor={"white"}
                padding={"0 40px"}
                //   isLoading={isLoading}
                loadingText="Processing"
              >
                <span className="text-[15px]">Add To List</span>
              </Button>
              {marketCart.length > 0 && (
                <Tooltip label="clear list" aria-label="A tooltip">
                  <button
                    type="button"
                    onClick={handleClearMarketCart}
                    className="font-semibold  border text-[#31473A] px-4 py-3 rounded-md"
                  >
                    <IoTrashBinOutline />
                  </button>
                </Tooltip>
              )}
            </div>
          </form>
        </main>
        {/* right side--MARKET LIST */}
        <div
          className={`overflow-y-scroll w-screen mb-5y md:order-2 ${
            marketCart.length > 0 ? "flex" : "hidden"
          }`}
        >
          <ShowMarketList
            marketCart={marketCart}
            clear={handleClearMarketCart}
            delete={(i: number) => handleDeleteItems(i)}
          />
        </div>
      </section>
    </section>
  );
};

export default Marketlist;
