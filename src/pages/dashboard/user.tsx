
import privateRoute from '@/Global/authMiddleware/privateRoute';
import Layout from '@/components/sidebar/sidebar';
import UserModal from '@/modals/dashboard/user/userModal';
import React from 'react';


const User = () => {
  return (
    <Layout>
        <UserModal></UserModal>
      </Layout>
  );
};

export default privateRoute(User);
