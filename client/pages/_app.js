import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
                
  return (<div>
    <Header currentUser={currentUser} />
    <Component {...pageProps} />
  </div>);
};

AppComponent.getInitialProps = async (appcontext) => {
    const {data} = await buildClient(appcontext.ctx).get("/api/users/currentuser");
    
    let pageProps = {};
    
    if (appcontext.Component.getInitialProps) {
        pageProps = await appcontext.Component.getInitialProps(appcontext.ctx);
    }
    
    return {
      pageProps,
      ...data
    };
}

export default AppComponent;