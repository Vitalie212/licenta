import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TireCard from "../components/TireCard";
import { Tire } from "../types/Tire"; // ✅ Import corect
import { fetchTires } from "../services/tireService";

const SearchResultsPage: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [tires, setTires] = useState<Tire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchTires = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchTires();

        const processedData: Tire[] = data.map((tire) => ({
          ...tire,
          description: tire.description ?? "Descriere indisponibilă", // ✅ Fix pentru `undefined`
          width: tire.width ?? 0,
          height: tire.height ?? 0,
          diameter: tire.diameter ?? 0,
          image: tire.image && !tire.image.startsWith("/images/")
            ? `/images/${tire.image}`
            : "/images/default-tire.jpg",
        }));

        const filteredTires = processedData.filter((tire) =>
          `${tire.brand} ${tire.model} ${tire.width}/${tire.height}R${tire.diameter}`
            .toLowerCase()
            .includes(query?.toLowerCase() || "")
        );

        setTires(filteredTires);
      } catch (err) {
        console.error("Eroare la încărcarea anvelopelor:", err);
        setError("Eroare la încărcarea anvelopelor. Te rugăm să încerci din nou.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchTires();
    }
  }, [query]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Rezultate pentru: "{query}"
      </h2>

      {loading ? (
        <p className="text-center mt-6">Se încarcă...</p>
      ) : error ? (
        <p className="text-center mt-6 text-red-500">{error}</p>
      ) : tires.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tires.map((tire) => (
            <TireCard key={tire.id} tire={tire} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-6 text-gray-500">
          Nicio anvelopă găsită pentru "{query}".
        </p>
      )}
    </div>
  );
};

export default SearchResultsPage;
