// pages/_app.js
import { Provider } from 'react-redux';
import store from '../redux/common/store'; // Import your Redux store
import { SelectedSidebarOptionProvider } from '@/context/useSidebarOption/useSidebarOptionContext';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SelectedSidebarOptionProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </SelectedSidebarOptionProvider>
    </Provider>
  );
}
