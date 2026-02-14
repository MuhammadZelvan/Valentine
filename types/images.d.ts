declare module "*.HEIC" {
    const content: import("next/image").StaticImageData;
    export default content;
}

declare module "*.JPG" {
    const content: import("next/image").StaticImageData;
    export default content;
}
