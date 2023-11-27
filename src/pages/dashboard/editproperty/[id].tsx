import privateRoute from '@/Global/authMiddleware/privateRoute'
import Layout from '@/components/sidebar/sidebar'
import EditPropertyModal from '@/modals/dashboard/property/editPropertyModal'

const EditProperty = () => {
  return (
    <Layout>
      <EditPropertyModal></EditPropertyModal>
    </Layout>
  )
}

export default privateRoute(EditProperty)
