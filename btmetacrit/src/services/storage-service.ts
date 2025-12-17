import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GameInfo, Section } from ".././types";

@Injectable({providedIn: 'root'})
export class GameStorageService {
    private storage = new BehaviorSubject<Section[]>([]);

    constructor(){
        for(let i = 0; i < 2; i+= 1){
            this.addSection({
                id: i,
                caption: {
                    title: "Test",
                    link: './test'
                },
                games: [this.getSilksong("Hollow knight"), this.getSilksong("Silksong"), 
                    this.getSilksong("Test"), this.getSilksong("Game")]
            });
        }
    }
    takeUp(sections: Section[]): void {
        this.storage.next(sections);
    }

    getSections(): Observable<Section[]> {
        return this.storage.asObservable();
    }
    getSilksong(name: string) : GameInfo {
        // call api, but now is test 
        return {
            type: 'app',
            name: name,
            is_free: false,
            short_description: "Discover a vast,"
             + "haunted kingdom in Hollow Knight: Silksong!" 
             + "Explore, fight and survive as you ascend to the peak of a land ruled by silk and song.",
            supported_languages: "Russian. English",
            header_image: 
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/7983574d464e6559ac7e24275727f73a8bcca1f3/header.jpg?t=1764916587",
            capsule_image:
             "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/b73ec03fbdb9e21e3c59eb7e59966949d0c17f29/capsule_231x87.jpg?t=1764916587",
            developers: [
                "Team Cherry"
            ],
            publishers: [
                "Team Cherry"
            ],
            price_overview: [ {
                   final_formatted: "R 185.00"
            }],
            metacritic: {
                score: 90
            },
            platforms: {
                windows: true,
                linux: true,
                mac: true
            },
            categories: [
                {
                    "id": 2,
                    "description": "Single-player"
                },
            ],
            genres: [
                {
                    "id": "1",
                    "description": "Action"
                },
            ],
            screenshots: [
                {
                    "id": 0,
                    "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/26950369fe4b03c2268620eb9815c8a246aa0b06/ss_26950369fe4b03c2268620eb9815c8a246aa0b06.600x338.jpg?t=1764916587",
                    "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/26950369fe4b03c2268620eb9815c8a246aa0b06/ss_26950369fe4b03c2268620eb9815c8a246aa0b06.1920x1080.jpg?t=1764916587"
                },
                {
                    "id": 1,
                    "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/09ccaa6c16f158f9df8298feb5d196098506a028/ss_09ccaa6c16f158f9df8298feb5d196098506a028.600x338.jpg?t=1764916587",
                    "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/09ccaa6c16f158f9df8298feb5d196098506a028/ss_09ccaa6c16f158f9df8298feb5d196098506a028.1920x1080.jpg?t=1764916587"
                },
                {
                    "id": 2,
                    "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/d1a893ec6357b347a55ed929833ba793b57a79d2/ss_d1a893ec6357b347a55ed929833ba793b57a79d2.600x338.jpg?t=1764916587",
                    "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/d1a893ec6357b347a55ed929833ba793b57a79d2/ss_d1a893ec6357b347a55ed929833ba793b57a79d2.1920x1080.jpg?t=1764916587"
                },
            ],
            release_date: {
                date: "4 Sep, 2025",
                coming_soon: false,
            },
            ratings: {
                dejus: {
                    "rating": "l",
                    "descriptors": "Violência fantasiosa"
                },
                steam_germany: {
                    "rating_generated": "1",
                    "rating": "6",
                    "required_age": "6",
                    "banned": "0",
                    "use_age_gate": "0",
                    "descriptors": "Fantasy-Gewalt"
                }
            }
        }
    }
    addSection(sect:Section): void{
        const sections = this.storage.getValue();

        sections.push(sect);

        this.takeUp(sections);
    }

}
