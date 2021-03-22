/**
 * Make TypeScript recognize json5 files as generic value containers
 */
declare module '*.json5' {
  const value: any;
  export default value;
}
