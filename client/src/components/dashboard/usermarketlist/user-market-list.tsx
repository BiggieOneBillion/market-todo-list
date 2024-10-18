import React, { ReactNode, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { v4 } from "uuid";

import DeleteListItem from "./delete-list-item";
import MorePopOverMenu from "./more-menu";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { VscCalendar } from "react-icons/vsc";
import { useWindowSize } from "@reactuses/core";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/ApiSettings";
import { userProp, userStore } from "../../../store/GlobalStore";

type Iinfo = {
  message: string;
  data: {
    items: {
      productName: string;
      price: number;
      quantity: number;
      _id: string;
    }[];
    userId: string;
    _id: string;
    createdAt: string;
  }[];
};

type Iitems = {
  productName: string;
  price: number;
  quantity: number;
  _id: string;
};

type MeunProps = {
  children: React.ReactNode;
};

const UserMarketList = () => {
  // const info: Iinfo | any = useLoaderData();

  // console.log(info);

  const [index, setIndex] = useState<number>(0);

  let record: { i: string; indexs: number[] }[] = [];

  const handleUpdate = (i: number) => setIndex(i);

  const { width } = useWindowSize();

  const Tabs = (): ReactNode => {
    return info.data.map((item: any, i: number) => {
      if (
        i !== 0 &&
        new Date(info.data[i - 1].createdAt).toLocaleDateString() ===
          new Date(info.data[i].createdAt).toLocaleDateString()
      ) {
        let update = record.findIndex(
          (el) => el.i === new Date(item.createdAt).toLocaleDateString()
        );
        update !== -1 && record[update].indexs.push(i);
      } else {
        record.push({
          i: new Date(item.createdAt).toLocaleDateString(),
          indexs: [i],
        });

        return (
          <li
            key={v4()}
            className="py-2 md:border-b px-4  text-sm font-medium cursor-pointer"
          >
            <span>Date: {new Date(item.createdAt).toLocaleDateString()}</span>
            {record.filter(
              (el) =>
                el.i === new Date(item.createdAt).toLocaleDateString() &&
                el.indexs.length > 0
            ).length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                {record
                  .filter(
                    (el) =>
                      el.i === new Date(item.createdAt).toLocaleDateString() &&
                      el.indexs.length > 0
                  )[0]
                  .indexs.map((el, i: number) => (
                    <span
                      key={v4()}
                      className="inline-block px-2 py-1 text-center bg-[#7C8363]/50 rounded-md text-white"
                      onClick={() => handleUpdate(el)}
                    >
                      {i + 1}
                    </span>
                  ))}
              </div>
            )}
          </li>
        );
      }
    });
  };

  const token = userStore((state: unknown) => (state as userProp).token);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-user-marketlist"],
    queryFn: async () => {
      const response = await api.get(`api/marketlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Response("Product not found", { status: 404 });
      }

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/20 grid place-content-center">
        <p className="text-xl text-white font-semibold"> Loading....</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 bg-black/20 grid place-content-center">
        <p className="text-xl text-white font-semibold flex items-center gap-2">
          Network Issue{" "}
          <span
            onClick={() => refetch()}
            className="border px-2 py-1 bg-[#7C8363] text-white cursor-pointer"
          >
            Click to retry
          </span>
        </p>
      </div>
    );
  }

  const info: Iinfo | any = data;

  return (
    <section className="space-y-20y h-screen  flex flex-col gap-10 py-20 md:py-20 px-3 md:px-10">
      <header className="space-y-1">
        <h1 className="text-lg md:text-2xl font-semibold text-green-950">
          Your market list
        </h1>
        <p className="text-sm font-medium text-black/70 flex items-center gap-4">
          The list of all your market list{" "}
          <span
            onClick={() => refetch()}
            className="border px-2 py-1 bg-[#7C8363] text-white cursor-pointer"
          >
            Click to refresh list
          </span>
        </p>
      </header>
      {info.data.length === 0 ? (
        <p className="font-extrabold text-2xl bg-black/10">No List Saved</p>
      ) : (
        <main className="flex flex-col md:flex-row items-start gap-4 md:gap-10 flex-1 relative">
          {width < 768 ? (
            <section className="flex items-center gap-2 w-full md:hidden">
              <MenuPopUp>
                <ul className="flex md:hidden flex-col gap-5 min-w-[200px] h-full bg-white">
                  <Tabs key={v4()} />
                </ul>
              </MenuPopUp>
              <div className="md:hidden">
                <MorePopOverMenu id={info.data[index]["_id"]} />
              </div>
            </section>
          ) : (
            <ul className="hidden md:flex flex-col gap-5 border-r min-w-[200px] h-full">
              <Tabs key={v4()} />
            </ul>
          )}
          <section className="flex-1 w-[93vw] md:w-full overflow-x-scroll">
            {info.data.length !== 0 && (
              <>
                <table className="min-w-fit table-auto bg-[#EDF4F2]">
                  <caption className="caption-top w-full text-left text-xs font-medium mb-3">
                    Date -{" "}
                    {new Date(info.data[index].createdAt).toLocaleDateString()}
                  </caption>
                  <thead>
                    <tr className="bg-[#31473A] text-white text-sm text-medium">
                      <th className="px-4 py-2 whitespace-nowrap">S/N</th>
                      <th className="px-4 py-2 whitespace-nowrap">
                        Product Name
                      </th>
                      <th className="px-4 py-2 whitespace-nowrap">
                        Product Quantity
                      </th>
                      <th className="px-4 py-2 whitespace-nowrap">
                        Product Price
                      </th>
                      <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                      <td className="px-4 py-2 bg-[#EDF4F2] border text-black text-xl hidden md:flex">
                        <MorePopOverMenu id={info.data[index]["_id"]} />
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {info.data[index].items.map(
                      (el: Iitems, indexd: number) => (
                        <tr
                          key={v4()}
                          className="bg-gray-200y odd:bg-[#EDF4F2] even:bg-[#D4DED8] text-sm"
                        >
                          <td className="border px-4 py-2">{indexd + 1}</td>
                          <td className="border px-4 py-2">{el.productName}</td>
                          <td className="border px-4 py-2">{el.quantity}</td>
                          <td className="border px-4 py-2">{el.price}</td>
                          <td className="border px-4 py-2 text-center">
                            <DeleteListItem
                              index={indexd}
                              id={info.data[index]["_id"]}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </>
            )}
          </section>
        </main>
      )}
    </section>
  );
};

export default UserMarketList;

function MenuPopUp({ children }: MeunProps) {
  return (
    <Popover offset={[70, 10]}>
      <PopoverTrigger>
        <Button
          size={"sm"}
          fontSize={"14px"}
          border={"1px solid black"}
          leftIcon={<VscCalendar />}
        >
          Date
        </Button>
      </PopoverTrigger>
      <PopoverContent width={"fit"} padding={"0px"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
