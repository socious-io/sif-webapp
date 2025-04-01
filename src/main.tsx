import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import App from './App';
import './styles/main.scss';
import { translate } from './core/helpers/utils';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <title>{translate('socious-fund')}</title>
    </Helmet>
    {/* <ErrorBoundary fallback={<FallBack />} onError={logError}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ErrorBoundary> */}
  </>,
);
defineCustomElements(window);
