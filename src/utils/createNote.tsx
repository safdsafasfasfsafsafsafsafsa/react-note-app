import { v4 as uuidv4 } from "uuid";
import type { Note } from "../interfaces/types";

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
    createDate: new Date(),
    updateDate: new Date(),
    isTrash: false,
    ...noteData,
    // 전달된 데이터로 덮어쓰기
  };
}
