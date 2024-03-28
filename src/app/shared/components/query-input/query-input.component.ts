import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-query-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TranslateModule,
    OverlayPanelModule,
    ScrollPanelModule,
  ],
  templateUrl: './query-input.component.html',
  styleUrl: './query-input.component.scss',
})
export class QueryInputComponent {
  @ViewChild('op')
  overlayPanel!: OverlayPanel;

  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input()
  allowedKeys: Record<string, string> = {};

  @Input()
  allowedKeysDescription: Record<string, string> = {};

  @Output() queryResult = new EventEmitter<string>();

  isValidQuery: boolean = true;

  queryText: string = '';
  lastKey: string = '';

  tokens: string[] = []
  lastSuggestion = 'key'

  isValidQueryCheck() {
    if (this.queryText.trim().length === 0) {
      return true;
    } else return this.isValidQuery;
  }

  isOnKeyInput(): boolean {
    if (this.queryText.trim().length === 0) {
      return true;
    }
    return this.lastSuggestion === 'key';
  }

  isOnOpInput(): boolean {
    if (this.queryText.trim().length === 0) {
      return false;
    }
    return this.lastSuggestion === 'op';
  }

  isOnIsOpInput(): boolean {
    if (this.queryText.trim().length === 0) {
      return false;
    }
    return this.lastSuggestion === 'is op';
  }

  isOnInOpInput(): boolean {
    if (this.queryText.trim().length === 0) {
      return false;
    }
    return this.lastSuggestion === 'in op';
  }

  isOnLogicalOpInput(): boolean {
    if (this.queryText.trim().length === 0) {
      return false;
    }
    return this.lastSuggestion === 'logical op';
  }

  isOnValueInput(): boolean {
    if (this.queryText.trim().length === 0) {
      return false;
    }
    return this.lastSuggestion === 'value';
  }

  private parseQuery(): string[] {
    const tokens: string[] = [];
    const pattern =
      /([^&|]+)|([&|])|([=!><~]+)|("[^"]+")|([^,]+)|(\S+\s+in\s+\([^)]+\))/g;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(this.queryText)) !== null) {
      const token = match[0].trim(); // Trim whitespaces
      if (token !== '') {
        tokens.push(token);
      }
    }

    return tokens;
  }

  private suggestNextInput(tokens: string[]): string {
    // Suggest key since we have empty value
    if (tokens.length === 0) {
      this.isValidQuery = true;
      return 'key';
    }

    const token = tokens[tokens.length - 1].trim();
    const parts = token.split(/\s+/);
    if (parts.length === 0) {
      this.isValidQuery = true;
      return 'key';
    }
    const key = parts[0];

    if (
      !Object.keys(this.allowedKeys).some((keyToCheck) => keyToCheck == key)
    ) {
      this.isValidQuery = false;
      return 'key';
    }

    this.lastKey = key;
    if (parts.length === 1) {
      this.isValidQuery = false;
      return 'op';
    }
    const operator = parts[1];

    if (
      !Object.keys(this.opList(key)).some((opToCheck) => opToCheck == operator)
    ) {
      this.isValidQuery = false;
      return 'op';
    }

    if (parts.length == 2 && parts[1].toLowerCase() === 'in') {
      this.isValidQuery = false;
      return 'in op';
    } else if (parts.length > 2 && parts[1].toLowerCase() === 'in') {
      // We have longer in need to do additional checks
      const openParent = parts[2];
      if (!openParent.startsWith('(')) {
        this.isValidQuery = false;
        return 'in op';
      }
      if (!token.endsWith(')')) {
        this.isValidQuery = false;
        return 'in op';
      }
      this.isValidQuery = true;
      return 'logical op';
    } else if (parts.length == 2 && parts[1].toLowerCase() === 'is') {
      this.isValidQuery = false;
      return 'is op';
    } else if (parts.length > 2 && parts[1].toLowerCase() === 'is') {
      const value = parts[2];
      if (value.toLowerCase() === 'null' || value.toLowerCase() === 'empty') {
        this.isValidQuery = true;
        return 'logical op';
      } else {
        this.isValidQuery = false;
        return 'is op';
      }
    }

    if (parts.length === 3) {
      this.isValidQuery = true;
      return 'logical op';
    }

    // Suggest value by default
    this.isValidQuery = false;
    return 'value';
  }

  stringOp: Record<string, string> = {
    '=': 'query-input.equals_op',
    '!=': 'query-input.not_equals_op',
    '~': 'query-input.contains_op',
    '!~': 'query-input.contains_not_op',
    in: 'query-input.in_op',
    is: 'query-input.is_op',
  };
  numberOp: Record<string, string> = {
    '=': 'query-input.equals_op',
    '!=': 'query-input.not_equals_op',
    '>': 'query-input.greater_op',
    '>=': 'query-input.greater_or_equals_op',
    '<': 'query-input.less_op',
    '<=': 'query-input.less_or_equals_op',
    is: 'query-input.is_op',
  };
  dateOp: Record<string, string> = {
    '=': 'query-input.equals_op',
    '!=': 'query-input.not_equals_op',
    '>': 'query-input.greater_op',
    '>=': 'query-input.greater_or_equals_op',
    '<': 'query-input.less_op',
    '<=': 'query-input.less_or_equals_op',
    is: 'query-input.is_op',
  };
  booleanOp: Record<string, string> = {
    '=': 'query-input.equals_op',
    '!=': 'query-input.not_equals_op',
    is: 'query-input.is_op',
  };
  logicalOp: Record<string, string> = {
    '&': 'query-input.and_op',
    '|': 'query-input.or_op',
  };
  isOp: Record<string, string> = {
    null: 'query-input.null',
    empty: 'query-input.empty',
  };

  openPanel($event: unknown) {
    this.overlayPanel.show($event);
  }

  allowedKeysList(): string[] {
    return Object.keys(this.allowedKeys);
  }

  allowedOpList(): string[] {
    switch (this.allowedKeys[this.lastKey]) {
      case 'string':
        return Object.keys(this.stringOp);
      case 'number':
        return Object.keys(this.numberOp);
      case 'date':
        return Object.keys(this.dateOp);
      case 'boolean':
        return Object.keys(this.booleanOp);
      default:
        return [];
    }
  }

  currentOp(): Record<string, string> {
    return this.opList(this.lastKey);
  }

  private opList(key: string): Record<string, string> {
    switch (this.allowedKeys[key]) {
      case 'string':
        return this.stringOp;
      case 'number':
        return this.numberOp;
      case 'date':
        return this.dateOp;
      case 'boolean':
        return this.booleanOp;
      default:
        return {};
    }
  }

  logicalOpList(): string[] {
    return Object.keys(this.logicalOp);
  }

  isOpList(): string[] {
    return Object.keys(this.isOp);
  }

  appendKeyToQuery(key: string) {
    this.queryText = this.queryText.trim();
    const tokens = this.parseQuery();
    let lastToken = '';
    if (tokens.length > 0) {
      lastToken = tokens[tokens.length - 1];
    }
    if (this.queryText.length !== 0) {
      if (lastToken !== '' && lastToken !== '&' && lastToken !== '|') {
        let result = '';
        for (let i = 0; i < tokens.length - 1; i++) {
          result += `${tokens[i]} `;
        }
        result += `${key} `;
        this.queryText = result;
      } else {
        this.queryText += ` ${key} `;
      }
    } else {
      this.queryText = `${key} `;
    }
    this.lastKey = key;
    this.onQueryTextChange();
  }

  appendOpToQuery(op: string) {
    this.queryText = this.queryText.trim();
    if (this.queryText.length !== 0) {
      this.queryText += ` ${op} `;
    } else {
      this.queryText = `${op} `;
    }
    this.onQueryTextChange();
  }

  appendParenthesisToQuery() {
    this.queryText = this.queryText.trim();
    if (this.queryText.length !== 0) {
      this.queryText += ` (value1, value2) `;
    } else {
      this.queryText = `(value1, value2) `;
    }
    this.onQueryTextChange()
  }

  onQueryTextChange() {
    this.tokens = this.parseQuery();
    this.lastSuggestion = this.suggestNextInput(this.tokens);
    if (this.queryText.length == 0) {
      this.queryResult.emit(this.queryText);
    } else if(this.isValidQueryCheck()) {
      this.queryResult.emit(this.queryText);
    }
  }
}
