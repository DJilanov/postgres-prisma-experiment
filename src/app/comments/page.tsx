import Header from "@/components/Header/header";
import { INotification } from "@/interfaces/notification";
import { caller } from "@/server/trpc";

const getData = async () => {
  const notifications = await caller.getNotifications() as INotification[];

	return {
    notifications,
  };
}

export default async function Comments() {
	const data = await getData();
  return (
    <main className="flex min-h-screen flex-col">
      <Header notifications={data.notifications} />
      <section className="bg-white dark:bg-gray-900 h-lvh flex items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">COMMENTS</h1>
          </div>
        </div>
      </section>
    </main>
  );
}

export const dynamic = "force-dynamic";
