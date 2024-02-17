import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from './core/services/layout.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    translate: TranslateService,
    private layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    translate.setDefaultLang('en');
    translate.addLangs(['en']);
    translate.use('en');
  }
  ngOnInit(): void {
    this.layoutService.restoreConfig();
    this.restoreScale();
  }

  ngAfterViewInit() {
    this.restoreTheme();
  }

  private restoreScale() {
    this.document.documentElement.style.fontSize =
      this.layoutService.config.scale + 'px';
  }

  private restoreTheme() {
    const themeLink = <HTMLLinkElement>(
      this.document.getElementById('theme-css')
    );
    const newHref = themeLink
      .getAttribute('href')!
      .replace('lara-light-blue', this.layoutService.config.theme);
    this.replaceThemeLink(newHref);
  }

  private replaceThemeLink(href: string) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>(
      this.document.getElementById('theme-css')
    );
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);
    themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
  }
}
