import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { adminRoutes } from '~/routes';
import AdminLayout from '~/layouts/AdminLayout';
// import AdminLayoutStyles from './components/AdminLayoutStyles';

function AdminRouter() {
    return (
        // <AdminLayoutStyles>
        <Routes>
            {adminRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <AdminLayout>
                            <route.component />
                        </AdminLayout>
                    }
                />
            ))}
        </Routes>
        // </AdminLayoutStyles>
    );
}

export default AdminRouter;
