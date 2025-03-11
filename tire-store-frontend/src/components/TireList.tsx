import React, { useEffect, useState } from "react";
import TireCard from "./TireCard";
import { Tire } from "../types/Tire";
import { fetchTires } from "../services/tireService";

const TireList: React.FC = () => {
  const [tires, setTires] = useState<Tire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTires = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTires();
        const processedData = data.map((tire) => ({
          ...tire,
          image: tire.image || "/images/default-tire.jpg", // ✅ Fallback pentru `image`
        }));
        setTires(processedData);
      } catch (err) {
        console.error("Eroare la încărcarea anvelopelor:", err);
        setError("Eroare la încărcarea anvelopelor. Te rugăm să încerci din nou.");
      } finally {
        setLoading(false);
      }
    };

    loadTires();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Toate Anvelopele</h2>

      {loading ? (
        <p className="text-center mt-6">Se încarcă...</p>
      ) : error ? (
        <p className="text-center mt-6 text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tires.length > 0 ? (
            tires.map((tire) => <TireCard key={tire.id} tire={tire} />)
          ) : (
            <p className="text-center mt-6">Nu s-au găsit anvelope.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TireList;
