"use client";

import React, { startTransition, useRef, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'sonner';

import { INotification } from '@/interfaces/notification';
import NotificationsDialog from '../NotificationsDialog/notifications-dialog';

import DialogItem from '../DialogItem/dialog-item';
import PlatformUpdateNotification from './platform-update-notification';
import UserInteractionNotification from './user-interaction-notification';
import { markNotificationAsRead } from '@/actions/markNotificaitonAsRead';

import './styles.css';
import { ResponseSuccess } from '@/types';

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
  const updateNotification = (notification: INotification) => {
    setNotifications((prev) => prev.map((p) => p.id === notification.id ? notification : p).filter(n => !n.seen));
  }
  const readNotification = (id: string) => {
    startTransition(() => {
      // Prisma doesnt support enums
      markNotificationAsRead({ id })
        .then((response: ResponseSuccess<INotification | any>) => {
          console.log('response?.data: ', response?.data);
          updateNotification(response?.data);
          toast.success("Notification has been seen.")
        })
        .catch(() => toast.error("Something went wrong."));
    });
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <FontAwesomeIcon icon={faBell} width={14} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent p-4 min-w-96 rounded-lg bg-gray-200 dark:bg-gray-800 text-black" sideOffset={5}>
          {
            notifications.length > 0 ? (
              notifications.map(n => [
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
