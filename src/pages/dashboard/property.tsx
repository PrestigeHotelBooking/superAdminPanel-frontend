import privateRoute from '@/Global/authMiddleware/privateRoute'
import Layout from '@/components/sidebar/sidebar'
import PropertyModal from '@/modals/dashboard/property/propertyModal'
import React from 'react'

const Property = () => {
  return (
    <Layout>
      <PropertyModal></PropertyModal>
    </Layout>
  )
}

export default privateRoute(Property)
