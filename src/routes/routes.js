import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/User/Home';
import Shop from '~/pages/User/Shop';
import ShopDetail from '~/pages/User/Shop-Detail';
import Cart from '~/pages/User/Cart';
import Login from '~/pages/User/Login';
import Register from '~/pages/User/Register';
import About from '~/pages/User/About';
import News from '~/pages/User/News';
import Checkout from '~/pages/User/Checkout';
import Contact from '~/pages/User/Contact';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.shopDetail, component: ShopDetail },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.about, component: About },
    { path: config.routes.news, component: News },
    { path: config.routes.checkout, component: Checkout },
    { path: config.routes.contact, component: Contact },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
