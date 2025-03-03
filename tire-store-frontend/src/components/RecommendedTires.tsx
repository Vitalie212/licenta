import React, { useEffect, useState } from "react";
import TireCard from "./TireCard";
import { fetchTires } from "../services/tireService";

const RecommendedTires: React.FC = () => {
  const [recommendedTires, setRecommendedTires] = useState<any[]>([]);

  useEffect(() => {
    const loadTires = async () => {
      const data = await fetchTires();
      setRecommendedTires(data.slice(0, 4)); // Afișăm doar primele 4 produse recomandate
    };
    loadTires();
  }, []);

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-center">Produse Recomandate</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {recommendedTires.map((tire, index) => (
          <TireCard key={index} tire={tire} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedTires;
