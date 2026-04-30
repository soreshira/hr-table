// 在籍ステータスの種類を文字列リテラル型で定義
// 'active'=在籍中 / 'retired'=退職 / 'leave'=休職
export type Status = 'active' | 'retired' | 'leave'

// 従業員一人分のデータ構造
export type Person = {
  id: string          // 社員ID（例: "EMP001"）
  name: string        // 氏名（例: "山田 太郎"）
  nameKana: string    // ふりがな（例: "やまだ たろう"）
  email: string       // メールアドレス
  department: string  // 部署名
  position: string    // 役職名
  joinedAt: string    // 入社日（ISO 8601形式: "YYYY-MM-DD"）
  status: Status      // 在籍ステータス
}
