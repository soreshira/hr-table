// App.tsx
// アプリケーションのルートコンポーネント
// ページ全体のレイアウト（背景・余白）を担い、テーブルの表示は PeopleTableContainer に委譲する

import { PeopleTableContainer } from './components/table'
// index.css は main.tsx で読み込み済みのためここでは不要

function App() {
  return (
    // 画面全体: 薄いグレー背景でコンテンツを中央に配置する
    <div className="min-h-screen bg-gray-100">

      {/* コンテンツ幅の制限と上下左右の余白 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* テーブルを囲むカード風のコンテナ */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Container コンポーネントに処理を委譲（ロジック・状態管理はすべてここで管理） */}
          <PeopleTableContainer />
        </div>

      </div>
    </div>
  )
}

export default App
