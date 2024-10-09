type VehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  Year: string;
};

type VehicleListProps = {
  models: VehicleModel[] | undefined;
};

export default function VehicleList({ models }: VehicleListProps) {
  if (!models) {
    return (
      <p className="text-center text-gray-600">Loading vehicle models...</p>
    );
  }

  if (models.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No vehicle models found for the selected criteria.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {models.map((model) => (
        <li
          key={model.Model_ID}
          className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold">
            <span className="border-b border-red-700">{model.Model_Name}</span>
          </h2>
          <p className="text-gray-600">Make: {model.Make_Name}</p>
          <p className="text-gray-600">Year: {model.Year}</p>
          <p className="text-gray-600">Model ID: {model.Model_ID}</p>
          <p className="text-gray-600">Make ID: {model.Make_ID}</p>
        </li>
      ))}
    </ul>
  );
}
