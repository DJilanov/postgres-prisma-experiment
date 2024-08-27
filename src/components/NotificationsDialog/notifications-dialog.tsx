"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import * as Dialog from '@radix-ui/react-dialog';
import { saveNotification } from "@/actions/saveNotification";
import { INotification, INotificationForm } from "@/interfaces/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseSuccess } from "@/types";
import { schema } from "@/schemas/saveNotification";

import './styles.css';

interface Props {
  addNotification: (data: INotification) => void;
}

/**
 * A dialog component for creating and submitting notifications.
 * 
 * This component renders a form that allows users to create a notification by selecting a type and providing the necessary information.
 * The form is validated using `react-hook-form` and Zod schema validation.
 * Upon submission, the notification is saved and the `addNotification` callback is called to update the state.
 * 
 * @param {Props} props - The properties for the NotificationsDialog component.
 * @param {(data: INotification) => void} props.addNotification - Callback function to add the created notification to the state.
 * @returns {JSX.Element} - A React component that renders the notification creation dialog.
 */
const NotificationsDialog = ({ addNotification }: Props) => {
  const [type, setType] = useState(null);
  const { register, handleSubmit } = useForm<INotificationForm>({
    resolver: zodResolver(schema), // Apply the zodResolver
  });
  const onSubmit: SubmitHandler<INotificationForm> = (data) => {
    startTransition(() => {
      // Prisma doesnt support enums
      saveNotification(data as INotificationForm | any)
        .then((response: ResponseSuccess<INotification | any>) => {
          addNotification(response?.data);
          toast.success("Notification was created.")
        })
        .catch(() => toast.error("Something went wrong."));
    });
  }
  return (
    <>
      <Dialog.Title className="text-black dark:text-white text-lg">Create Notification</Dialog.Title>
      <Dialog.Description className="my-4 dark:text-gray-400 text-sm">
        Create a new Notification here
      </Dialog.Description>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="notification_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notification Type</label>
          <select id="notification_type" defaultValue={""} {...register("type", {
            onChange: (e) => {
              setType(e.target.value);
            }
          })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Choose a type</option>
            <option value="platform_update">Platform update</option>
            <option value="comment_tag">Comment tag</option>
            <option value="access_granted">Access granted</option>
            <option value="join_workspace">Join workspace</option>
          </select>
        </div>
        {
          type && (
            <>
              {
                type === 'platform_update' ? (
                  <div className="mb-6">
                    <label htmlFor="release_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release number</label>
                    <input type="release_number" id="release_number" {...register("release_number", { pattern: /^[a-zA-Z0-9_.-]*$/i })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Release number" required />
                  </div>
                ) : (
                  <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="name" id="name" {...register("name", { pattern: /^[A-Za-z]+$/i })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                  </div>
                )
              }
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </>
          )
        }
      </form>
      <Dialog.Close asChild>
        <button className="IconButton rounded-full h-8 w-8 text-black dark:text-white absolute top-1 right-1 hover:bg-gray-400" aria-label="Close">
          <FontAwesomeIcon icon={faClose} width={20} />
        </button>
      </Dialog.Close>
    </>
  );
}

export default NotificationsDialog;