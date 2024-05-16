import userRoute from '~/config/userRoutes';
import adminRoute from '~/config/adminRoutes';
// UserPages
import Home from '~/pages/User/Home';
import Shop from '~/pages/User/Shop';
import ShopDetail from '~/pages/User/Shop-Detail';
import Cart from '~/pages/User/Cart';
import Favourite from '~/pages/User/Favourite';
import Login from '~/pages/User/Login';
import Register from '~/pages/User/Register';
import MyProfile from '~/pages/User/Profile/ProfileUpdate';
import MyOrder from '~/pages/User/Profile';
import About from '~/pages/User/About';
import News from '~/pages/User/News';
import Checkout from '~/pages/User/Checkout';
import Contact from '~/pages/User/Contact';

// AdminPages
import QLSP from '~/pages/Admin/Product/product';
import QLKH from '~/pages/Admin/User/user';
import QLHD from '~/pages/Admin/Order/order';
import detailHD from '~/pages/Admin/Order/detail';
// import Statistic from '~/pages/Admin/Statistic';
import Dashboard from '~/pages/Admin/Dashboard';

// User routes
const userRoutes = [
    { path: userRoute.home, component: Home },
    { path: userRoute.shop, component: Shop },
    { path: userRoute.shopDetail, component: ShopDetail },
    { path: userRoute.cart, component: Cart },
    { path: userRoute.favourite, component: Favourite },
    { path: userRoute.login, component: Login },
    { path: userRoute.register, component: Register },
    { path: userRoute.myprofile, component: MyProfile },
    { path: userRoute.myorder, component: MyOrder },

    { path: userRoute.about, component: About },
    { path: userRoute.news, component: News },
    { path: userRoute.checkout, component: Checkout },
    { path: userRoute.contact, component: Contact },
    //
];

const adminRoutes = [
    { path: adminRoute.dashboard, component: Dashboard },
    { path: adminRoute.qlsp, component: QLSP },
    { path: adminRoute.qlkh, component: QLKH },
    { path: adminRoute.qlhd, component: QLHD },
    { path: adminRoute.detailhd, component: detailHD },
];

export { userRoutes, adminRoutes };
