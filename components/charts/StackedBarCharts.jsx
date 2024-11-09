'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Gold', Males: 15, Females: 13 },
    { name: 'Silver', Males: 18, Females: 12 },
    { name: 'Browns', Males: 4, Females: 23 },
];

const StackedBarCharts = () => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
                data={data}
                barSize={20}
                margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="Males"
                    fill="#0088FE"
                    stackId="a"
                />
                <Bar
                    dataKey="Females"
                    fill="#00C49F"
                    stackId="a"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StackedBarCharts;