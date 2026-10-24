// Minimal typings for untyped dependencies, covering only the APIs this project uses.

declare module "utif" {
  interface IFD {
    width: number;
    height: number;
    [key: string]: unknown;
  }
  const UTIF: {
    decode(buf: ArrayBuffer): IFD[];
    decodeImage(buf: ArrayBuffer, ifd: IFD): void;
    toRGBA8(ifd: IFD): Uint8Array;
    encodeImage(rgba: ArrayBuffer, w: number, h: number): ArrayBuffer;
  };
  export default UTIF;
}

declare module "gifenc" {
  type Palette = number[][];
  export function quantize(rgba: Uint8ClampedArray, maxColors: number, opts?: { format?: string; oneBitAlpha?: boolean | number }): Palette;
  export function applyPalette(rgba: Uint8ClampedArray, palette: Palette, format?: string): Uint8Array;
  export function GIFEncoder(): {
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      opts?: { palette?: Palette; transparent?: boolean; transparentIndex?: number; delay?: number },
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  };
}
