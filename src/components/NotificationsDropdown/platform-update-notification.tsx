"use client";

import { INotification } from '@/interfaces/notification';
import { faBell, faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  notification: INotification;
}

const PlatformUpdateNotification = ({ notification }: Props) => (
  <div className='flex cursor-pointer ml-2'>
    <div className='flex flex-none w-8 h-8 items-center'>
      <div className='flex bg-gray-300 dark:bg-gray-500 w-8 h-8 items-center justify-center rounded-full pb-1'>
        <FontAwesomeIcon icon={faRobot} width={20} />
      </div>
    </div>
    <div onClick={() => alert('1.2.3')} className='flex flex-1 w-8 h-8 items-center ml-3 pb-0.5'>
      New features - see what’s new
    </div>
    {
      notification.seen ? null : <FontAwesomeIcon className='mt-1' icon={faBell} width={14} />
    }
  </div>
);

export default PlatformUpdateNotification;
