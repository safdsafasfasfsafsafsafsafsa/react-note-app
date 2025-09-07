import { v4 as uuidv4 } from "uuid";
import type { INote } from "../interfaces/types";

export default function createNote(noteData: Partial<INote>) {
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
    updateDate: new Date().toISOString(),
    isTrash: false,
    ...noteData,
    // 전달된 데이터로 덮어쓰기
  };
}
