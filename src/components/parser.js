const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class Parser {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
    this.fileContent = this.readFile();
  }

  readFile() {
    try {
      return fs.readFileSync(this.filePath, 'utf8');
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  parseYAML() {
    try {
      return yaml.load(this.fileContent);
    } catch (error) {
      throw new Error(`Failed to parse YAML: ${error.message}`);
    }
  }

  parseJSON() {
    try {
      return JSON.parse(this.fileContent);
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  }

  static getFileExtension(filePath) {
    return path.extname(filePath).toLowerCase();
  }

  parse() {
    const extension = Parser.getFileExtension(this.filePath);
    switch (extension) {
      case '.yaml':
      case '.yml':
        return this.parseYAML();
      case '.json':
        return this.parseJSON();
      default:
        throw new Error(`Unsupported file format: ${extension}`);
    }
  }
}

module.exports = Parser;