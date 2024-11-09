'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BiaxialBarChart = ({ data, dataKey, firstBarFill, secBarFill, dataKeyForFBar, dataKeyForSBar }) => {
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
                <XAxis dataKey={dataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey={dataKeyForFBar}
                    fill={firstBarFill}
                    radius={5}
                />
                <Bar
                    dataKey={dataKeyForSBar}
                    fill={secBarFill}
                    radius={5}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BiaxialBarChart;