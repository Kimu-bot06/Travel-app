import { useState, useEffect } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data' // 👈 追加
import type { Schema } from '../amplify/data/resource' // 👈 追加
import outputs from '../amplify_outputs.json'
import './App.css'

Amplify.configure(outputs)
const client = generateClient<Schema>() // 👈 データベースを操作する「魔法の杖」を作成

export default function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [records, setRecords] = useState<Array<Schema['TravelRecord']['type']>>([]) // 👈 読み込んだデータを貯める場所

  // 🌍 1. データベースからデータを読み込む関数
  useEffect(() => {
    const sub = client.models.TravelRecord.observeQuery().subscribe({
      next: ({ items }) => setRecords([...items]),
    })
    return () => sub.unsubscribe()
  }, [])

  // 💾 2. データを保存する関数
  const handleSave = async () => {
    if (!title || !content) {
      alert('タイトルと感想を入力してね！')
      return
    }

    // AWSにデータを送信！
    await client.models.TravelRecord.create({
      title: title,
      content: content,
    })

    // 入力欄をリセット
    setTitle('')
    setContent('')
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="app-main">
          <h1>✈️ My Travel Moments</h1>
          <p>ようこそ、<strong>{user?.signInDetails?.loginId}</strong> さん！</p>

          <div className="post-section">
            <h2>新しい思い出を記録する</h2>
            <div className="form-group">
              <input
                type="text" placeholder="タイトル" value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="感想" value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button onClick={handleSave} className="save-button">＋ 記録を保存する</button>
            </div>
          </div>

          <div className="list-section">
            <h2>過去の旅の記録</h2>
            {records.length === 0 ? (
              <p>まだ記録がありません。最初の思い出を書きましょう！</p>
            ) : (
              <div className="record-grid">
                {records.map((record) => (
                  <div key={record.id} className="record-card">
                    <h3>{record.title}</h3>
                    <p>{record.content}</p>
                    <small>保存済み ✅</small>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="footer">
            <button className="signout-button" onClick={signOut}>ログアウト</button>
          </div>
        </main>
      )}
    </Authenticator>
  )
}