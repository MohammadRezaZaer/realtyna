"use client";

import {QueryClient, QueryClientProvider,} from '@tanstack/react-query';
import {EmployeesTable} from "@/app/components/employeesTable";


const queryClient = new QueryClient();

const ExampleWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
      <EmployeesTable />
    </QueryClientProvider>
);

export default ExampleWithProviders;

