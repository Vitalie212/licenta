import React, { useEffect, useState } from "react";
import TireCard from "./TireCard";
import { Tire } from "../types/Tire";
import { fetchTires } from "../services/tireService";

const TireList: React.FC = () => {
  const [tires, setTires] = useState<Tire[]>([]);

  useEffect(() => {
    const loadTires = async () => {
      const data = await fetchTires();
      setTires(data);
    };
    loadTires();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Toate Anvelopele</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tires.map((tire) => (
          <TireCard key={tire.id} tire={tire} />
        ))}
      </div>
    </div>
  );
};

export default TireList;
