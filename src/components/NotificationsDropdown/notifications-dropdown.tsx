"use client";

import React, { startTransition, useEffect, useMemo, useRef, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'sonner';

import { INotification } from '@/interfaces/notification';
import { markNotificationAsRead } from '@/actions/markNotificaitonAsRead';
import { ResponseSuccess } from '@/types';

import NotificationsDialog from '../NotificationsDialog/notifications-dialog';
import DialogItem from '../DialogItem/dialog-item';
import PlatformUpdateNotification from './platform-update-notification';
import UserInteractionNotification from './user-interaction-notification';

import './styles.css';

interface Props {
  notifications: INotification[];
}

/**
 * A dropdown component that displays notifications and allows users to interact with them.
 * 
 * This component renders a bell icon with a count of unread notifications. When clicked, it opens a dropdown
 * menu that displays a list of notifications. The notifications can be marked as read, and new notifications can be added
 * through a dialog triggered from within the dropdown.
 * 
 * @param {Props} props - The properties for the NotificationsDropdown component.
 * @param {INotification[]} props.notifications - An array of notifications to be displayed in the dropdown.
 * @returns {JSX.Element} - A React component that renders the notifications dropdown.
 */
const NotificationsDropdown = ({ notifications }: Props) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    setNotifications(notifications);
  }, [notifications])
  const [notif, setNotifications] = useState(notifications);
  const unread = useMemo(() => {
    return notif.filter((n) => !n.seen).length;
  }, [notif]);
  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
    if (ref.current) {
      ref.current.click();
    }
  }
  const updateNotification = (notification: INotification) => {
    setNotifications((prev) => prev.map((p) => p.id === notification.id ? notification : p));
  }
  const readNotification = (id: string) => {
    startTransition(() => {
      // Prisma doesnt support enums
      markNotificationAsRead({ id })
        .then((response: ResponseSuccess<INotification | any>) => {
          if(response?.data) {
            updateNotification(response?.data);
          }
          toast.success("Notification has been seen.")
        })
        .catch(() => toast.error("Something went wrong."));
    });
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className='flex flex-row'>
          <FontAwesomeIcon className='mt-1' icon={faBell} width={14} />
          <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">{unread}</span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent p-4 min-w-5/6-full-w sm:min-w-96 max-w-full rounded-lg bg-gray-200 dark:bg-gray-800 text-black h-96 overflow-y-scroll" sideOffset={5}>
          <DialogItem triggerChildren="New Notification" ref={ref}>
            <NotificationsDialog addNotification={addNotification} />
          </DialogItem>
          {
            notif.length > 0 ? (
              notif.map(n => [
                <DropdownMenu.Item onClick={() => readNotification(n.id)} key={n.id} className="text-black dark:text-white">
                  {
                    n.type === 'platform_update' ? <PlatformUpdateNotification notification={n} /> : null
                  }
                  {
                    (
                      n.type === 'comment_tag' ||
                      n.type === 'access_granted' ||
                      n.type === 'join_workspace'
                    ) ? <UserInteractionNotification notification={n} /> : null
                  }
                </DropdownMenu.Item>,
                <hr key={`${n.id}_hr`} className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
              ]
              )
            ) : [
              <DropdownMenu.Item key="no-notif" className="flex justify-center text-black dark:text-white" disabled>
                There are no notifications in the list
              </DropdownMenu.Item>,
              <hr key="no-notif-hr" className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
            ]
          }
          <DropdownMenu.Arrow className="DropdownMenuArrow fill-gray-200 dark:fill-gray-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default NotificationsDropdown;
