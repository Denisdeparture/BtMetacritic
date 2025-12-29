import { Section, SliderObject } from "../../types";


export function mapToSliderInfoById(idSection: number, sections: Section[] ): SliderObject[]{
    const games = sections![idSection].games;
    const list: SliderObject[] =  [];
    let counter = 0; 
    for(const game of games){
      list.push({
      id: counter,
      rating: game.metacritic.score,
      title: game.name,
      imageLink: game.header_image
      })
      counter++;
    }
    return list;
}
export function takeANormal(name: string): string{
    const result = name[0].toUpperCase() + name.slice(1); 
    return result;
}
