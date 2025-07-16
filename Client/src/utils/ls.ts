//  Function to save the values in local storage
class Localstorage {
  private key: string;
  constructor(key: string) {
    this.key = key;
  }
  set(value: string): void {
    localStorage.setItem(this.key, value);
  }
  get(): string | null {
    const value = localStorage.getItem(this.key);
    return value;
  }
  reset(): void {
    localStorage.removeItem(this.key);
  }
}

// token save object
const ls = new Localstorage("authtoken");
export default ls;
