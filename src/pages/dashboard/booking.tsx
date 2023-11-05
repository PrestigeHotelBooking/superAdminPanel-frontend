
import React from 'react';
import Layout from '@/components/sidebar/sidebar';
import BookingModal from '@/modals/dashboard/booking/bookingModal';
import privateRoute from '@/Global/authMiddleware/privateRoute';

const Booking = () => {
  return (
    <Layout>
  <BookingModal></BookingModal>
      </Layout>
  );
};

export default privateRoute(Booking);
