import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CountdownComponent } from './countdown/countdown.component';
import { GiftCardComponent } from './gift-card/gift-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountdownComponent, GiftCardComponent],
})
export class AppComponent {
  title = "It's Flo's Birthday!";

  protected readonly isRunning = signal(true);
}
