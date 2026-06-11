import { Plugin } from 'obsidian';
import { BetterMermaidSettings, DEFAULT_SETTINGS, BetterMermaidSettingTab } from './settings';
import { MermaidImageModal } from './modal';

declare global {
  interface Document {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

declare global {
  interface CSSStyleSheet {
    replaceSync(text: string): void;
  }
}

export default class BetterMermaidPlugin extends Plugin {
  settings: BetterMermaidSettings;
  private cssSheet: CSSStyleSheet | null = null;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new BetterMermaidSettingTab(this.app, this));

    this.injectCSS();

    this.registerDomEvent(
      this.app.workspace.containerEl,
      'click',
      (evt: MouseEvent) => {
        if (!this.settings.enableClickToZoom) return;

        const target = evt.target as HTMLElement;

        const mermaidContainer = target.closest('div.mermaid');
        if (!mermaidContainer) return;

        const mermaidSvg = mermaidContainer.querySelector('svg');
        if (!mermaidSvg) return;

        new MermaidImageModal(
          this.app,
          mermaidSvg,
          this.settings,
        ).open();
      },
      true,
    );
  }

  onunload() {
    this.removeCSS();
  }

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData(),
    ) as BetterMermaidSettings;
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.injectCSS();
  }

  injectCSS() {
    this.removeCSS();

    const sizing = `
.better-mermaid-modal-size {
  width: ${this.settings.modalWidthPercent}vw;
  max-width: ${this.settings.modalWidthPercent}vw;
  max-height: ${this.settings.modalHeightPercent}vh;
}`;
    const allCss = sizing + '\n' + (this.settings.customCss || '');

    if (!allCss.trim()) return;

    try {
      this.cssSheet = new CSSStyleSheet();
      this.cssSheet.replaceSync(allCss);
      const doc = this.app.workspace.containerEl.ownerDocument;
      doc.adoptedStyleSheets = [
        ...doc.adoptedStyleSheets,
        this.cssSheet,
      ];
    } catch {
      // CSSStyleSheet not supported in older environments
    }
  }

  private removeCSS() {
    if (this.cssSheet) {
      const doc = this.app.workspace.containerEl.ownerDocument;
      doc.adoptedStyleSheets = Array.from(
        doc.adoptedStyleSheets,
      ).filter((s) => s !== this.cssSheet);
      this.cssSheet = null;
    }
  }
}
