import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps }) => {
                
  return (<div>
    <Component {...pageProps} />;
  </div>);
};

AppComponent.getInitialProps = async (appcontext) => {
    const {data} = await buildClient(appcontext.ctx).get("/api/users/currentuser");
    
    let pageProps = {};
    
    if (appcontext.Component.getInitialProps) {
        pageProps = await appcontext.Component.getInitialProps(appcontext.ctx);
    }
    
    return data;
}

return buildClient