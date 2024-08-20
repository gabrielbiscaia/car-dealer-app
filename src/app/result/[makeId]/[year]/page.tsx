import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import VehicleList from '@/app/components/VehicleList';
import Loading from '@/app/components/Loading';

type Params = {
  params: {
    makeId: string;
    year: string;
  };
};

type VehicleData = {
    makeName: string;
    models: Array<{
      Make_ID: number;
      Make_Name: string;
      Model_ID: number;
      Model_Name: string;
      Year: string;
    }>;
  };

async function getVehicleModels(makeId: string, year: string): Promise<VehicleData> {
    const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
    if (!res.ok) throw new Error('Failed to fetch vehicle models');
    const data = await res.json();
    const models = data.Results.map((model: any) => ({
      ...model,
      Year: year,
    }));
    const makeName = models[0]?.Make_Name || 'Unknown Make';
    return { makeName, models };
  }
  
  export default async function ResultPage({ params }: Params) {
    try {
      const { makeName, models } = await getVehicleModels(params.makeId, params.year);
      
      return (
        <main className='p-4'>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{makeName} Models for Year {params.year}</h1>
            <Link href="/" className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Back to Search
            </Link>
          </div>
          <Suspense fallback={<Loading />}>
            <VehicleList models={models} />
          </Suspense>
        </main>
      );
    } catch (error) {
      console.error('Error fetching vehicle models:', error);
      notFound();
    }
  }