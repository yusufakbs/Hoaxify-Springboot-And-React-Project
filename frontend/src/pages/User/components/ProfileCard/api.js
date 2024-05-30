import http from "../../../../lib/http.js";

export function updateUser(id, body) {
    return http.put(`/api/v1/users/${id}`, body);
}