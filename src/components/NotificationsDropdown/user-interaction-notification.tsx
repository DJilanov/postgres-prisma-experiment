"use client";

import { INotification } from '@/interfaces/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const TextEnum = {
  platform_update: '',
  comment_tag: 'tagged you in a comment',
  access_granted: 'shared a chat with you',
  join_workspace: 'joined your workspace',
}

const ColorsEnum = {
  platform_update: 'bg-gray-300 dark:bg-gray-500',
  comment_tag: 'bg-green-300 dark:bg-green-500',
  access_granted: 'bg-red-300 dark:bg-red-500',
  join_workspace: 'bg-blue-300 dark:bg-blue-500',
}

interface Props {
  notification: INotification;
}

const UserInteractionNotification = ({ notification }: Props) => {
  return (
    <div className='flex cursor-pointer ml-2'>
      <div className='flex flex-none w-8 h-8 items-center'>
        <div className={`flex ${ColorsEnum[notification.type]} w-8 h-8 items-center justify-center rounded-full pb-1`}>{notification.name?.charAt(0)}</div>
      </div>
      <div className='flex flex-1 w-8 h-8 items-center ml-3 pb-0.5'>
        {notification.name} {TextEnum[notification.type]}
      </div>
      {
        notification.seen ? null : <FontAwesomeIcon className='mt-1' icon={faBell} width={14} />
      }
    </div>
  );
}

export default UserInteractionNotification;
