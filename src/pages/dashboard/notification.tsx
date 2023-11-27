import privateRoute from '@/Global/authMiddleware/privateRoute'
import Layout from '@/components/sidebar/sidebar'
import NotificationModal from '@/modals/dashboard/notification/notificationModal'
import React from 'react'

const Notification = () => {
  return (
    <Layout>
      <NotificationModal></NotificationModal>
    </Layout>
  )
}

export default privateRoute(Notification)
