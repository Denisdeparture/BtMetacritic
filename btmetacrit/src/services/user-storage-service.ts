import { User } from "../types";

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
            imgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzj2Zl_Fw5WZ3CPR86fG2wQ9TNpENSL7JtSQ&s"
        }
    }
}