import { getBuses } from "@/actions/ticketing";
import AddBus from "@/app/components/AddBus";
import BusList from "@/app/components/BusList";
import React from "react";

const bus =async () => {
  const buses = await getBuses()
  return (
    <div>
      <AddBus />
      <BusList buses={buses} />
    </div>
  );
};

export default bus;
