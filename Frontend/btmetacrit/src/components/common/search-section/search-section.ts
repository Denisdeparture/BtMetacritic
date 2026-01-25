import {
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
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
export class SearchSection implements OnInit {
  route = inject(ActivatedRoute);

  destroyer = inject(DestroyRef);

  changeDetector = inject(ChangeDetectorRef);

  sectionsService = inject(SectionStorageService);

  steamApi = inject(SteamApiService);

  sectionsAsync = this.route.data.pipe(
    map((data) => data['sections'] as Section[]),
  );

  readonly sectionsSignal = toSignal(this.sectionsAsync);

  readonly searchSectionSignal = computed(() => this.sectionsSignal()!);

  ngOnInit(): void {
    console.log(this.searchSectionSignal());
    console.log(this.route.params);
    this.changeDetector.detectChanges();
    this.changeDetector.markForCheck();
  }
  mapToSlider(id: number): SliderGameObject[] {
    const map = mapToSliderInfoById(id, this.searchSectionSignal());

    return map;
  }
}
