import React, { useEffect, useState } from 'react';
import TireCard from './TireCard';
import { fetchTires } from '../services/tireService';

const TireList: React.FC = () => {
    const [tires, setTires] = useState<any[]>([]);

    useEffect(() => {
        const loadTires = async () => {
            const data = await fetchTires();
            setTires(data);
        };
        loadTires();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4">
            {tires.map((tire, index) => (
                <TireCard key={index} tire={tire} />
            ))}
        </div>
    );
};

export default TireList;
