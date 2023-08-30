import '../styles/globals.css'
import 'bulma/css/bulma.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { isImportTypeAssertionContainer } from 'typescript';
import { Provider } from 'react-redux';
import { store } from '../src/store'
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css'; // Remove if nothing is visible
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { setupIonicReact } from '@ionic/react';

setupIonicReact();
import NonSSRWrapper from './src/component/NoSSRWrapper';
//import { SessionProvider } from "next-auth/react"
export default function MyApp({ Component, pageProps }) {
  //export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    /* return (
       <SessionProvider session={session}>
         <Provider store={store}>
           <Component {...pageProps} />
         </Provider>
       </SessionProvider>
 
     );*/
    return (

      <Provider store={store}>
        <NonSSRWrapper>
          <Component {...pageProps} />
        </NonSSRWrapper>
      </Provider>


    );
  }
} 
