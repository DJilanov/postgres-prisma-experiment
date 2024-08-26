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

const NotificationsDropdown = ({ notifications }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const [notif, setNotifications] = useState(notifications);
  useEffect(() => {
    setNotifications(notifications);
  }, [notifications.length])
  const unread = useMemo(() => {
    return notif.filter((n) => !n.seen).length;
  }, [notif.length]);
  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
    if (ref.current) {
      ref.current.click();
    }
  }
  const readNotification = (id: string) => {
    startTransition(() => {
      // Prisma doesnt support enums
      markNotificationAsRead({ id })
        .then((response: ResponseSuccess<INotification | any>) => {
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
        <DropdownMenu.Content className="DropdownMenuContent p-4 min-w-96 rounded-lg bg-gray-200 dark:bg-gray-800 text-black h-96 overflow-y-scroll" sideOffset={5}>
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
