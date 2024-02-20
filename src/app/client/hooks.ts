//CREATE hook (post new user to api)
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { Employee} from "./fakeData";
import client from "@/app/client/index";

export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: Employee) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo: Employee) => {
            queryClient.setQueryData(
                ['users'],
                (prevUsers: any) =>
                    [
                        ...prevUsers,
                        {
                            ...newUserInfo,
                            id: (Math.random() + 1).toString(36).substring(7),
                        },
                    ] as Employee[],
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//READ hook (get users from api)
export function useGetUsers() {
    return useQuery<Employee[]>({
        queryKey: ['users'],
        queryFn: async () => {
            //send api request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return client.employees.getAll();

        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put user in api)
export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: Employee) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo: Employee) => {
            queryClient.setQueryData(['users'], (prevUsers: any) =>
                prevUsers?.map((prevUser: Employee) =>
                    prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
                ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//DELETE hook (delete user in api)
export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId: string) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (userId: string) => {
            queryClient.setQueryData(['users'], (prevUsers: any) =>
                prevUsers?.filter((user: Employee) => user.id !== userId),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}
