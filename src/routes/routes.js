import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/User/Home';
import Shop from '~/pages/User/Shop';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.shop, component: Shop, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
