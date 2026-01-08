import {
  RATINGS_COLORS,
  Screenshot,
  Section,
  SliderGameObject,
  SliderGroup,
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
export function recalcToMap<T extends SliderObject>(
  objects: T[],
  maxLength: number
) : SliderGroup<T>[] {
  const map: SliderGroup<T>[] = [];

  const objs = objects;

  if (!objs) {
    return map;
  }

  const length = objs.length + 1;

  let count = 0;

  const lengthOfPart = Math.floor(length / maxLength);

  let num = maxLength;

  for (let i = maxLength % 2 === 0 ? 0 : 1; i < lengthOfPart; i++) {
    const sliders = objs!.slice(count, num >= length ? length - 1 : num);

    num = sliders.length * 2;

    count = sliders.length;

    map.push({ id: i, sliderObjects: sliders });
  }
  return map;
}
export function calculateColor(rating: number): string {
    let color = 'ffffff';
    if (rating < 39) {
      color = RATINGS_COLORS.BAD;
    } else if (rating! > 39 && rating! < 80) {
      color = RATINGS_COLORS.MIDDLE;
    } else if (rating! > 80) {
      color = RATINGS_COLORS.GOOD;
    }
    return color;
  }
