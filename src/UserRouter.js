import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { userRoutes } from '~/routes';
import DefaultLayout from '~/layouts';

function UserRouter() {
    return (
        <Routes>
            {userRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <DefaultLayout>
                            <route.component />
                        </DefaultLayout>
                    }
                />
            ))}
        </Routes>
    );
}

export default UserRouter;
