import privateRoute from '@/Global/authMiddleware/privateRoute'
import Layout from '@/components/sidebar/sidebar'
import DashboardModal from '@/modals/dashboard/dashboard/dashboardModal'
import PaymentModal from '@/modals/dashboard/payment/paymentModal'
import React from 'react'

const Payment = () => {
  return (
    <Layout>
      <PaymentModal></PaymentModal>
    </Layout>
  )
}

export default privateRoute(Payment)
