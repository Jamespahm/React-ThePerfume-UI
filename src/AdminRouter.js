import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { adminRoutes } from '~/routes';
import AdminLayout from '~/layouts/AdminLayout';

function AdminRouter() {
    return (
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
    );
}

export default AdminRouter;
