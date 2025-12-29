import { Injectable } from "@angular/core";
import { User } from "../types";
@Injectable({providedIn: 'root'})
export class UserStorageService {
    getUser(id: number): User {
        return {
            id: id,
            likeGames: [],
            info: {
                firstname: 'Test',
                lastname: "All",
                mail: "test@gmail.com",
                location: "Ru",
                age: 16
            },
            //../../../assets/img/logoSiteMetacrit.png 
            imgPath: "../../../assets/img/logoSiteMetacrit.png"
        }
    }
}