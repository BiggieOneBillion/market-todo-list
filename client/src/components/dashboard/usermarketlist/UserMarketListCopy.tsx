import React, { ReactNode, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";

// Define the Tabs component above the UserMarketList component
type TabsProps = {
  record: { i: string; indexs: number[] }[];
  handleUpdate: (i: number) => void;
};

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

type Idata = {
  items: {
    productName: string;
    price: number;
    quantity: number;
    _id: string;
  }[];
  userId: string;
  _id: string;
  createdAt: string;
};
[];

const Tabs = ({ record, handleUpdate }: TabsProps): ReactNode => {
  return (
    <>
      {record.map(({ i, indexs }, idx) => (
        <li
          key={idx}
          className="py-2 border-b px-4 text-sm font-medium cursor-pointer"
          onClick={() => handleUpdate(indexs[0])}
        >
          <span>Date: {i}</span>
          {indexs.length > 1 && (
            <div className="flex flex-col gap-2 mt-1">
              {indexs.map((el, i) => (
                <span
                  key={i}
                  className="inline-block px-2 py-1 text-center bg-[#7C8363]/50 rounded-md text-white"
                  onClick={() => handleUpdate(el)}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </>
  );
};

const UserMarketList = () => {
  const info: Iinfo | any = useLoaderData(); // Assume data is properly typed
  const [index, setIndex] = useState<number>(0);

  // Generate record array only when info.data changes
  const record = useMemo(() => {
    let tempRecord: { i: string; indexs: number[] }[] = [];
    info.data.forEach((item: Idata, i: number) => {
      const createdDate = new Date(item.createdAt).toLocaleDateString();
      if (
        i !== 0 &&
        new Date(info.data[i - 1].createdAt).toLocaleDateString() ===
          createdDate
      ) {
        let update = tempRecord.findIndex((el) => el.i === createdDate);
        update !== -1 && tempRecord[update].indexs.push(i);
      } else {
        tempRecord.push({ i: createdDate, indexs: [i] });
      }
    });
    return tempRecord;
  }, [info.data]);

  const handleUpdate = (i: number) => setIndex(i);

  return (
    <section className="space-y-20 h-screen flex flex-col gap-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-green-950">
          Your market list
        </h1>
        <p className="text-sm font-medium text-black/70">
          The list of all your market lists - {info.message}
        </p>
      </header>
      <main className="flex items-start gap-10 flex-1">
        <ul className="flex flex-col gap-5 border-r min-w-[200px] h-full">
          {/* Pass record and handleUpdate to the Tabs component */}
          <Tabs record={record} handleUpdate={handleUpdate} />
        </ul>
        <section className="flex-1">
          {info.data.length > 0 ? (
            <table className="min-w-fit table-auto bg-[#EDF4F2]">
              <thead>
                <tr className="bg-[#31473A] text-white text-sm text-medium">
                  <th className="px-4 py-2">S/N</th>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Product Quantity</th>
                  <th className="px-4 py-2">Product Price</th>
                </tr>
              </thead>
              <tbody>
                {info.data[index].items.map(
                  (
                    el: {
                      productName: string;
                      price: number;
                      quantity: number;
                      _id: string;
                    },
                    idx: number
                  ) => (
                    <tr
                      key={idx}
                      className="odd:bg-[#EDF4F2] even:bg-[#D4DED8] text-sm"
                    >
                      <td className="border px-4 py-2">{idx + 1}</td>
                      <td className="border px-4 py-2">{el.productName}</td>
                      <td className="border px-4 py-2">{el.quantity}</td>
                      <td className="border px-4 py-2">{el.price}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p>No market lists available.</p>
          )}
        </section>
      </main>
    </section>
  );
};

export default UserMarketList;
