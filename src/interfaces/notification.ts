export enum INotificationTypeEnum {
  platform_update = 'platform_update',
  comment_tag = 'comment_tag',
  access_granted = 'access_granted',
  join_workspace = 'join_workspace'
}

export interface INotificationForm {
  type: INotificationTypeEnum;
  release_number?: string;
  name?: string;
}

export interface INotification extends INotificationForm {
  id: string;
  seen: boolean;
}