import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
const BASE_URL: string = "http://localhost:3030";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post(url: string, data: object) {
    return this.http.post(`${BASE_URL}/${url}`, data);
  }
}
