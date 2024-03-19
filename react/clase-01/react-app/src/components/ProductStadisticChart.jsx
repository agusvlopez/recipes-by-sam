import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useGetProductStadisticsQuery } from '../features/apiSlice';
import { Loader } from './Loader';

const ProductStadisticChart = () => {
    const { data: productStadistics = [], isLoading, isError } = useGetProductStadisticsQuery();

    if (isLoading) return <div><Loader /></div>;
    if (isError) return <div>Error loading product statistics</div>;

    return (
        <div className="p-2">
            <h2 className="text-center text-2xl font-bold">Products Stadistic Chart By Reviews</h2>
            <Bar
                data={{
                    labels: productStadistics.map(stadistic => stadistic.name),
                    datasets: [
                        {
                            label: 'Total Reviews',
                            data: productStadistics.map(stadistic => stadistic.totalComments),
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.5)',
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 0.5)',
                            ],
                            borderWidth: 1,
                        },
                    ]
                }}
                options={{
                    plugins: {
                        title: {
                            text: "Recipes Books Reviews",
                        },
                    },
                }}
            />
        </div>
    );
}

export default ProductStadisticChart;