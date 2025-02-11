import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownComponent implements OnInit, OnDestroy {
  readonly targetDate = signal(new Date(2025, 1, 12, 0, 0, 0));
  readonly now = signal(new Date());
  readonly timeDifference = computed(
    () => this.targetDate().getTime() - this.now().getTime()
  );

  readonly days = computed(() =>
    Math.floor(this.timeDifference() / (1000 * 60 * 60 * 24))
  );
  readonly daysLabel = computed(() => (this.days() === 1 ? 'Tag' : 'Tage'));
  readonly hours = computed(() =>
    Math.floor(
      (this.timeDifference() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
  );
  readonly hoursDisplay = computed(() => `${this.hours()}`.padStart(2, '0'));
  readonly hoursLabel = computed(() =>
    this.hours() === 1 ? 'Stunde' : 'Stunden'
  );
  readonly minutes = computed(() =>
    Math.floor((this.timeDifference() % (1000 * 60 * 60)) / (1000 * 60))
  );
  readonly minutesDisplay = computed(() =>
    `${this.minutes()}`.padStart(2, '0')
  );
  readonly minutesLabel = computed(() =>
    this.minutes() === 1 ? 'Minute' : 'Minuten'
  );
  readonly seconds = computed(() =>
    Math.floor((this.timeDifference() % (1000 * 60)) / 1000)
  );
  readonly secondsDisplay = computed(() =>
    `${this.seconds()}`.padStart(2, '0')
  );
  readonly secondsLabel = computed(() =>
    this.seconds() === 1 ? 'Sekunde' : 'Sekunden'
  );

  readonly isRunning = computed(() => this.timeDifference() > 0);

  readonly done = output();

  private readonly doneEffect = effect(() => {
    if (!this.isRunning()) {
      this.done.emit();
    }
  });

  private intervalId: number | undefined = undefined;

  public ngOnInit() {
    this.setCountdownInterval();
  }

  public ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private setCountdownInterval() {
    this.intervalId = setInterval(() => {
      this.now.set(new Date());
    }, 1000) as unknown as number;
  }
}
