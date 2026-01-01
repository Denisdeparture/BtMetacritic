import { Section, SliderGameObject, SliderObject } from '../../types';

export function mapToSliderInfoById(
  idSection: number,
  sections: Section[]
): SliderGameObject[] {
  const games = sections![idSection].games;
  const list: SliderGameObject[] = [];
  let counter = 0;
  if (!games) {
    return [];
  }
  for (const game of games) {
    list.push({
      id: counter,
      rating: game.metacritic.score,
      title: game.name,
      imageLink: game.header_image,
    });
    counter++;
  }
  return list;
}
export function takeANormal(name: string): string {
  const result = name[0].toUpperCase() + name.slice(1);
  return result;
}
