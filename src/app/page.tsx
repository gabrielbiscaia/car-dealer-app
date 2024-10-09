import VehicleFilter from "../components/VehicleFilter";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24 bg-gray-900">
      <Header />
      <VehicleFilter />
    </main>
  );
}
