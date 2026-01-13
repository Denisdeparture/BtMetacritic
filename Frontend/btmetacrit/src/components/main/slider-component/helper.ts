import { WritableSignal } from '@angular/core';
import { TransformSlide } from '../slider-button-component/slider-button-component';

export function centerObjIndex(length: number): number {
  if (!length) {
    return 0;
  }

  let index = 0;

  if (length! % 2 === 0) {
    const num1 = length! / 2;

    const num2 = length! / 2 + 1;

    index = (num1 + num2) / 2;

    index -= 1;
  } else {
    index = (length! + 1) / 2;
    index -= 1;
  }
  return Math.floor(index);
}
export function calculateTransformForSlider(
  trObj?: TransformSlide,
  length?: number,
  isRight?: WritableSignal<boolean>,
  centerIndex?: WritableSignal<number>,
  slideGroups?: Readonly<ISLide[]>
): void {
  const side = trObj?.side;
  let currentIndex = trObj?.offset;
  isRight?.set(side === 'RIGHT' ? true : false);
  if (!length) {
    return;
  }

  centerIndex?.update((x) => {
    x = x + currentIndex!;
    if (x >= length!) {
      x = 0;
    }
    if (x < 0) {
      x = length!;
    }
    return x;
  });
  if (!slideGroups) {
    return;
  }
  for (const sg of slideGroups) {
    sg.slide();
  }
}
export interface ISLide {
  slide(): void;
}
