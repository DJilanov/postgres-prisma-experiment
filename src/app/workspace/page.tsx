import Header from "@/components/Header/header";
import { GetNotifications } from "@/db/getNotifications";

const getData = async () => {
	const notifications: any[] = await GetNotifications();

	return {
    notifications,
  };
}

export default async function Home() {
	const data = await getData();
  return (
    <main className="flex min-h-screen flex-col">
      <Header notifications={data.notifications} />
      <section className="bg-white dark:bg-gray-900 h-lvh flex items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">WORKSPACE</h1>
          </div>
        </div>
      </section>
    </main>
  );
}
