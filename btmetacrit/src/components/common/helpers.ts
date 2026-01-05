import {
  Screenshot,
  Section,
  SliderGameObject,
  SliderObject,
} from '../../types';

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
      game: game,
    });
    counter++;
  }
  return list;
}
export function takeANormal(name: string): string {
  const result = name[0].toUpperCase() + name.slice(1);
  return result;
}
export function recalcImg(
  addLink: string,
  screens: Screenshot[]
): Screenshot[] {
  const array: Screenshot[] = [];
  array.push({
    id: 0,
    path_thumbnail: '',
    path_full: addLink,
  });
  let counterId = 1; // one el had
  for (const item of screens) {
    item.id = counterId;
    array.push(item);
    counterId++;
  }
  return array;
}
