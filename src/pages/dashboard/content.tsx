import privateRoute from '@/Global/authMiddleware/privateRoute';
import Layout from '@/components/sidebar/sidebar';
import ContentModal from '@/modals/dashboard/content/contentModal';
import React from 'react';

const Content = () => {
  return (
    <Layout>
      <ContentModal></ContentModal>
    </Layout>
  );
};

export default privateRoute(Content);
