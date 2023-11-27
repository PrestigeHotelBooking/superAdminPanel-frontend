import privateRoute from '@/Global/authMiddleware/privateRoute'
import Layout from '@/components/sidebar/sidebar'
import ConfigurationSetting from '@/modals/dashboard/configuration/configurationSetting'
import React from 'react'

const Configuration = () => {
  return (
    <Layout>
      <ConfigurationSetting></ConfigurationSetting>
    </Layout>
  )
}

export default privateRoute(Configuration)
