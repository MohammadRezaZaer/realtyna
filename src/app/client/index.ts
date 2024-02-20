import {API_ENDPOINTS} from "@/app/client/endpoints";
import {Employee} from "@/app/client/fakeData";
import {HttpClient} from "@/app/client/http-client";

class Client {

    employees = {
        getAll: () => HttpClient.get<Employee[]>(API_ENDPOINTS.EMPLOYEES),
    }
}
export default new Client();