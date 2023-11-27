import privateRoute from '@/Global/authMiddleware/privateRoute'
import Layout from '@/components/sidebar/sidebar'
import ReportModal from '@/modals/dashboard/reportandanlysis/reportModal'
import React from 'react'

const Report = () => {
  return (
    <Layout>
      <ReportModal></ReportModal>
    </Layout>
  )
}

export default privateRoute(Report)
