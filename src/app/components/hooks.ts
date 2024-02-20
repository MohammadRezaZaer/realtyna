//CREATE hook (post new user to api)
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fakeData, User} from "./fakeData";

export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: User) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo: User) => {
            queryClient.setQueryData(
                ['users'],
                (prevUsers: any) =>
                    [
                        ...prevUsers,
                        {
                            ...newUserInfo,
                            id: (Math.random() + 1).toString(36).substring(7),
                        },
                    ] as User[],
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//READ hook (get users from api)
export function useGetUsers() {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            //send api request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve(fakeData);
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put user in api)
export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: User) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo: User) => {
            queryClient.setQueryData(['users'], (prevUsers: any) =>
                prevUsers?.map((prevUser: User) =>
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
                prevUsers?.filter((user: User) => user.id !== userId),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}
