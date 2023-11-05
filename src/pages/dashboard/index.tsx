
import Layout from '@/components/sidebar/sidebar';
import DashboardModal from '@/modals/dashboard/dashboard/dashboardModal';
import React from 'react';

import { GetServerSideProps } from 'next';
import { authMiddleware } from '@/Global/authMiddleware/authMiddleware';
import privateRoute from '@/Global/authMiddleware/privateRoute';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const result = authMiddleware(req as any) as any;

  if ((result?.status) === 302) {
    return {
      redirect: {
        destination: result.headers.location,
        permanent: false,
      },
    };
  }
  return {
    props: {
    },
  };
};



























const Dashboard = () => {
  return (
      <Layout>
      <DashboardModal></DashboardModal>
      </Layout>
  );
};

export default privateRoute(Dashboard);
