"use client";

import React, { useRef, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { INotification } from '@/interfaces/notification';
import NotificationsDialog from '../NotificationsDialog/notifications-dialog';

import './styles.css';
import DialogItem from '../DialogItem/dialog-item';

interface Props {
  notifications: INotification[];
}

const NotificationsDropdown = (props: Props) => {
  const ref = useRef<HTMLElement>(null);
  const [notifications, setNotifications] = useState(props.notifications);
  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [...prev, notification]);
    if(ref.current) {
      ref.current.click();
    }
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <FontAwesomeIcon icon={faBell} width={14} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent p-4 min-w-96 rounded-lg bg-gray-200 dark:bg-gray-800 text-black" sideOffset={5}>
          {
            notifications.length > 1 ? (
              notifications.map(n => (
                <DropdownMenu.Item key={n.id} className="text-black dark:text-white">
                  {n.id}
                </DropdownMenu.Item>
              ))
            ) : (
              <DropdownMenu.Item className="flex justify-center text-black dark:text-white" disabled>
                There are no notifications in the list
              </DropdownMenu.Item>
            )
          }
          <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
          <DialogItem triggerChildren="New Notification" ref={ref}>
            <NotificationsDialog addNotification={addNotification} />
          </DialogItem>
          <DropdownMenu.Arrow className="DropdownMenuArrow fill-gray-200 dark:fill-gray-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default NotificationsDropdown;
