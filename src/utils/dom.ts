export function qs(selector: string, scope: Document | HTMLElement = document) {
    return scope.querySelector(selector);
  }  