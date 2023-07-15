import '../styles/globals.css'
import 'bulma/css/bulma.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { isImportTypeAssertionContainer } from 'typescript';
import { Provider } from 'react-redux';
import { store } from '../src/store'
export default function MyApp({ Component, pageProps }) {
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
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

    );
  }
}
