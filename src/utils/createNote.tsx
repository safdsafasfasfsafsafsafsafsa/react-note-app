import { v4 as uuidv4 } from "uuid";

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  priority: string;
  isPinned: boolean;
  tag: string;
  createDate: string;
  updateDate: string;
  isTrash: boolean;
}

export default function createNote(noteData: Partial<Note>) {
  // export default function createNote() {
  const newId = uuidv4();

  return {
    id: newId,
    title: "Note",
    content: "Write here",
    color: "white",
    priority: "low",
    isPinned: false,
    tag: "",
    createDate: new Date().toISOString(),
    updateDate: "",
    isTrash: false,
    ...noteData,
    // 전달된 데이터로 덮어쓰기
  };
}
