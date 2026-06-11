import { Plugin } from 'obsidian';
import { BetterMermaidSettings, DEFAULT_SETTINGS, BetterMermaidSettingTab } from './settings';
import { MermaidImageModal } from './modal';

export default class BetterMermaidPlugin extends Plugin {
  settings: BetterMermaidSettings;
  private styleEl: HTMLStyleElement | null = null;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new BetterMermaidSettingTab(this.app, this));

    this.injectCSS();

    this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
      if (!this.settings.enableClickToZoom) return;

      const target = evt.target as HTMLElement;

      const mermaidContainer = target.closest('div.mermaid') as HTMLElement | null;
      if (!mermaidContainer) return;

      const mermaidSvg = mermaidContainer.querySelector('svg') as SVGSVGElement | null;
      if (!mermaidSvg) return;

      new MermaidImageModal(this.app, mermaidSvg, this.settings).open();
    }, true);
  }

  onunload() {
    this.removeCSS();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.injectCSS();
  }

  injectCSS() {
    this.removeCSS();
    if (this.settings.customCss) {
      this.styleEl = document.createElement('style');
      this.styleEl.id = 'better-mermaid-css';
      this.styleEl.textContent = this.settings.customCss;
      document.head.appendChild(this.styleEl);
    }
  }

  private removeCSS() {
    if (this.styleEl) {
      this.styleEl.remove();
      this.styleEl = null;
    }
    const existing = document.getElementById('better-mermaid-css');
    if (existing) {
      existing.remove();
    }
  }
}
