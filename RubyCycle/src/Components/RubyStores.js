class RubyStores {
  static saveSettings(settings) {
    localStorage.setItem("rubyCycleSettings", JSON.stringify(settings));
  }

  static getSettings() {
    const settings = localStorage.getItem("rubyCycleSettings");
    return settings ? JSON.parse(settings) : null;
  }
}

export default RubyStores;
