import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TireCard from "../components/TireCard"; // ✅ Importăm componenta pentru afișare
import { Tire } from "../types/Tire"; // ✅ Asigură-te că folosești noul tip

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [tires, setTires] = useState<Tire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTires = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching tires for category: ${categoryName}`);
        const response = await axios.get(`http://localhost:5258/api/tires?category=${categoryName}`);
        
        if (response.data.length === 0) {
          setError("Nu s-au găsit anvelope pentru această categorie.");
        }

        setTires(response.data);
      } catch (err) {
        console.error("Eroare la încărcarea anvelopelor:", err);
        setError("Eroare la încărcarea anvelopelor. Verifică conexiunea la server.");
      } finally {
        setLoading(false);
      }
    };

    fetchTires();
  }, [categoryName]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-center">
        Anvelope pentru categoria: {categoryName}
      </h2>

      {loading ? (
        <p className="text-center mt-6">Se încarcă...</p>
      ) : error ? (
        <p className="text-center mt-6 text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {tires.map((tire) => (
            <TireCard key={tire.id} tire={tire} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
