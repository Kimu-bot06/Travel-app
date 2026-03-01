import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// ▼ ここでデータベースの「箱（テーブル）」の形を定義します ▼
const schema = a.schema({
  TravelRecord: a
    .model({
      title: a.string(),   // タイトル（文字）
      content: a.string(), // 感想（文字）
    })
    .authorization((allow) => [allow.owner()]), // 👈 ログインした本人のみが読み書きできるセキュリティ設定
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // ログイン必須にする設定
  },
});