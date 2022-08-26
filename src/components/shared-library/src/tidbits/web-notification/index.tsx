import React, { FC } from 'react'
import Notification from 'react-web-notification'

interface WebNotificationProps {
  title: string
  description: string
}

export const WebNotification: FC<WebNotificationProps> = ({
  description,
  title,
}: WebNotificationProps) => {
  return <Notification title={title} options={{ body: description }} />
}
