import { Component } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AnalyticsService]
})
export class AppComponent {
  title = 'angular-src';

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    // Initialize Google analytics
    this.analytics.init();
  }
}