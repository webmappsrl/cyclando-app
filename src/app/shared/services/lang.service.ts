import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateParser,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG,
  USE_STORE,
} from '@ngx-translate/core';
import { cyEN } from 'src/app/shared/localization/i18n/en';
import { cyIT } from 'src/app/shared/localization/i18n/it';

@Injectable({
  providedIn: 'root',
})
export class LangService extends TranslateService implements TranslateService {
  constructor(
    public override store: TranslateStore,
    public override currentLoader: TranslateLoader,
    public override compiler: TranslateCompiler,
    public override parser: TranslateParser,
    public override missingTranslationHandler: MissingTranslationHandler,
    @Inject(USE_DEFAULT_LANG) useDefaultLang: boolean = true,
    @Inject(USE_STORE) isolate: boolean = false,
    private _store: Store<any>,
  ) {
    super(
      store,
      currentLoader,
      compiler,
      parser,
      missingTranslationHandler,
      useDefaultLang,
      isolate,
      true,
      'it',
    );
    this.setTranslation('it', cyIT);
    this.setTranslation('en', cyEN);
  }

  initLang(defLang: string): void {
    if (defLang) {
      this.setDefaultLang(defLang);
    }

    const savedLang = localStorage.getItem('cy-lang');
    if (savedLang) {
      this.use(savedLang);
    } else {
      localStorage.setItem('cy-lang', defLang);
      this.use(defLang);
    }
  }

  override instant(
    key: string | Array<string> | { [lang: string]: string },
    interpolateParams?: Object,
  ): string | any {
    if (typeof key === 'object' && key.length === 0) return '';
    if (typeof key === 'object' && !Array.isArray(key)) {
      if (key[this.currentLang] != null) {
        return key[this.currentLang];
      }
      if (key[this.defaultLang]) {
        return key[this.defaultLang];
      }
    }
    if (typeof key === 'string') {
      return super.instant(key);
    }
    if (Array.isArray(key) && key[0]) {
      return key[0];
    }
    // if defaultLang and currentLang no match inside object take the first
    if (typeof key === 'object' && !Array.isArray(key)) {
      for (const val in key) {
        if (key[val]) {
          return key[val];
        }
      }
    }

    try {
      return super.instant(key as string | Array<string>, interpolateParams);
    } catch (e) {
      console.error(e);
    }
  }
}
