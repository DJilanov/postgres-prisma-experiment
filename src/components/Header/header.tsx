import { INotification } from "@/interfaces/notification";
import NotificationsDropdown from "../NotificationsDropdown/notifications-dropdown";

interface Props {
  notifications: INotification[];
}

const Header = (props: Props) => {
  const { notifications = [] } = props;

  return (
    <header className="w-full">
      <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">Experiment</span>
          </a>
          <div className="flex items-center lg:order-2">
            <NotificationsDropdown notifications={notifications} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
