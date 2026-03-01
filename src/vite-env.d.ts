/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // 他の環境変数がある場合はここに追加
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

// CSS, SCSS などのインポートを許可する設定
declare module "*.css"
declare module "*.scss"
declare module "*.sass"
declare module "*.svg"
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.gif"
