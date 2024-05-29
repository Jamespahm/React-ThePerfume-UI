import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { userRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { Fragment } from 'react';

function UserRouter() {
    return (
        <Routes>
            {userRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;

                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default UserRouter;
