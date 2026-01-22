import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Section, SliderGameObject } from '../../../types';
import { mapToSliderInfoById } from '../helpers';
import { toSignal } from '@angular/core/rxjs-interop';
import { SliderComponent } from '../../main/slider-component/slider-component';
import { SectionStorageService } from '../../../services/sections-service';
import { SteamApiService } from '../../../services/steam-api-service';

@Component({
  selector: 'app-search-section',
  imports: [SliderComponent],
  templateUrl: './search-section.html',
  styleUrl: './search-section.scss',
})
export class SearchSection {
  route = inject(ActivatedRoute);

  destroyer = inject(DestroyRef);

  steamApi = inject(SteamApiService);

  sectionsAsync = this.route.data.pipe(
    map((data) => data['sections'] as Section[]),
  );

  readonly sectionsSignal = toSignal(this.sectionsAsync);

  readonly searchSectionSignal = computed(() => this.sectionsSignal()!);

  sectionsService = inject(SectionStorageService);

  mapToSlider(id: number): SliderGameObject[] {
    const map = mapToSliderInfoById(id, this.searchSectionSignal());

    return map;
  }
}
